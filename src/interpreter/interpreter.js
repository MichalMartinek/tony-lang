/**
 * Created by mi on 6.3.17.
 */

import BinaryOperator from './ast/binary-operator';
import UnaryOperator from './ast/unary-operator';
import FunctionCall from './ast/function-call';
import ControlStrucutre from './ast/control-strucutre';
import NumberNode from './ast/number-node';
import BooleanNode from './ast/boolean-node';
import Variable from './ast/variable';
import Types from './token-type'
import Parser from './parser'
import Enviroment from './enviroment'

import util from 'util'

export default class Interpreter {
  /**
   *
   * @param parser Parser
   */
  constructor(parser) {
    this.parser = parser;
    this.env = new Enviroment(null);
    this.data = [];
    const length = 5;
    const arr = []
    for(let i = 0; i < length; i++) {
      arr.push(0);
    }
    for(let i = 0; i < length; i++) {
      this.data.push(arr);
    }
    this.data[0][0] = 1;
    this.direction = [1,0];
  }
  move() {
    this.data[this.direction[0]][this.direction[1]] = 1;
  }
  getValue(node, env) {
    if (node.constructor.name == 'BinaryOperator') {
      if (node.operator.type == Types.PLUS) {
        return this.getValue(node.left, env) + this.getValue(node.right, env);
      }
      else if (node.operator.type == Types.MINUS) {
        return this.getValue(node.left, env) - this.getValue(node.right, env);
      }
      else if (node.operator.type == Types.MULTIPLICATION) {
        return this.getValue(node.left, env) * this.getValue(node.right, env);
      }
      else if (node.operator.type == Types.DIVISION) {
        return Math.floor(this.getValue(node.left, env) / this.getValue(node.right, env));
      }
      else if (node.operator.type == Types.AND) {
        return this.getValue(node.left, env) && this.getValue(node.right, env);
      }
      else if (node.operator.type == Types.OR) {
        return this.getValue(node.left, env) || this.getValue(node.right, env);
      }
      else if (node.operator.type == Types.COMP) {
        return this.getValue(node.left, env) == this.getValue(node.right, env);
      }
      else {
        throw new Error("Unknow operation");
      }
    }
    else if (node.constructor.name == 'UnaryOperator') {
      if (node.operator.type == Types.PLUS) {
        return this.getValue(node.node, env);
      }
      else if (node.operator.type == Types.MINUS) {
        return - this.getValue(node.node, env);
      }
      else if (node.operator.type == Types.NOT) {
        return ! this.getValue(node.node, env);
      }
      else {
        throw new Error("Unknow operation");
      }
    }
    else if (node.constructor.name == 'NumberNode') {
      return parseInt(node.value);
    }
    else if (node.constructor.name == 'BooleanNode') {
      if (node.type.type == Types.TRUE)
        return true;
      return false;
    }
    else if (node.constructor.name == 'Variable') {
      const value = env.get(node.name.value);
      if (Object.keys(value).length == 0) {
        throw new Error("Unknow variable " + node.name.value);
      }
      else return value.content;
    }
    else if (node.constructor.name == 'FunctionCall') {
      const value = this.functionCall(node, env);
      if (Object.keys(value).length == 0) {
        throw new Error("Function doesnt return value " + node.funcName.value);
      }
      else return value.content;
    }
    else {
      throw new Error("Unknow operation");
    }
  }
  evaluate(statement, env) {
    if (statement.constructor.name == 'BinaryOperator') {
      if (statement.operator.type == Types.ASSIGMENT) {
        if (statement.left.type != Types.NAME) {
          throw new Error("Wrong type");
        }
        env.set(statement.left.value, 'num', this.getValue(statement.right, env))
      }
    }
    else if (statement.constructor.name == 'ControlStructure') {
      //console.log(util.inspect(statement, false, null));
      const scope = new Enviroment(env);
      if (statement.type.type == Types.IF) {
          const cond = this.getValue(statement.condition, scope)
          if (cond) {
            for (let i = 0; i < statement.block.length; ++i) {
              this.evaluate(statement.block[i], scope);
            }
          }
          else if (statement.secondBlock != null) {
            for (let i = 0; i < statement.secondBlock.length; ++i) {
              this.evaluate(statement.secondBlock[i], scope);
            }
          }
      }
      else if (statement.type.type == Types.WHILE) {
        while (true) {
          const cond = this.getValue(statement.condition, scope);
          console.log("Runn" + cond)
          if (!cond) {
            break;
          }
          for (let i = 0; i < statement.block.length; ++i) {
            this.evaluate(statement.block[i], scope);
          }
        }
      }
      else if (statement.type.type == Types.DO) {
        const cond = this.getValue(statement.condition, scope)
        for (let j = 0; j < cond; ++j) {
          for (let i = 0; i < statement.block.length; ++i) {
            this.evaluate(statement.block[i], scope);
          }
        }
      }
      else {
        throw new Error("Wrong statement");
      }
    }
    else if (statement.constructor.name == 'FunctionDef') {
      env.set(statement.funcName.value, 'func', statement);
    }
    else if (statement.constructor.name == 'FunctionReturn') {
      env.set('_return', 'return', this.getValue(statement.value, env));
      return true;
    }
    else if (statement.constructor.name == 'FunctionCall') {
      this.functionCall(statement, env);
    }
    return false;
  }
  functionCall(statement, env) {
    if (statement.funcName.value == 'move') {
      this.move();
      return {};
    }
    const func = env.get(statement.funcName.value);
    if (Object.keys(func).length == 0 || func.type != 'func') {
      throw new Error("Unknow function " + node.name.value);
    }
    const scope = new Enviroment(env);
    for (let i = 0; i < statement.args.length; ++i) {
      scope.fset(func.content.args[i].value, 'num', this.getValue(statement.args[i]));
    }
    for (let i = 0; i < func.content.block.length; ++i) {
      if (this.evaluate(func.content.block[i], scope)) {
        return scope.get('_return');
      }
    }
    return {};
  }
  run() {
    const statements = this.parser.parse();
    for (let i = 0; i < statements.length; ++i) {
      this.evaluate(statements[i], this.env);
    }
    return statements;
  }
}