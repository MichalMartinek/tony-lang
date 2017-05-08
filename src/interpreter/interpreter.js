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
        for (let i = 0; i < cond; ++i) {
          for (let i = 0; i < statement.block.length; ++i) {
            this.evaluate(statement.block[i], scope);
          }
        }
      }
      else {
        throw new Error("Wrong statement");
      }
    }
  }
  run() {
    const statements = this.parser.parse();
    for (let i = 0; i < statements.length; ++i) {
      this.evaluate(statements[i], this.env);
    }
    return statements;
  }
}