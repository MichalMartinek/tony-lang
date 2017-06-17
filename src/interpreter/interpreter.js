/**
 * Created by mi on 6.3.17.
 */


import Types from './token-type'
import Parser from './parser'
import Enviroment from './enviroment'
import * as t from '../constants/board'

export default class Interpreter {
  /**
   *
   * @param parser Parser
   */
  constructor(parser, dispatch, level) {
    this.parser = parser;
    this.env = new Enviroment(null);
    this.dispatch = dispatch
    this.data = level.board
    this.position = level.position
    this.direction = 1;
    this.pizzas = 0;
    for(let i = 0; i < this.data.length; ++i) {
      for(let j = 0; j < this.data[i].length; ++j) {
        if (this.data[i][j] === t.SQR_PIZZA)
          this.pizzas +=1
      }
    }
  }
  handleLimits(x) {
    if (x >= t.SIZE) return t.SIZE -1
    if (x < 0) return 0
    return x
  }
  
  getDirection (dir) {
    switch (dir) {
      case t.DIRECTION_UP:
        return {x: 0, y: -1}
      case t.DIRECTION_RIGHT:
        return {x: 1, y: 0}
      case t.DIRECTION_DOWN:
        return {x: 0, y: 1}
      default:
        return {x: -1, y: 0}
    }
  }
  move() {
    const dir = this.getDirection(this.direction)
    this.data[this.position.y][this.position.x] = t.SQR_FREE
    this.position.x = this.handleLimits(this.position.x + dir.x)
    this.position.y = this.handleLimits(this.position.y + dir.y)
    if (this.data[this.position.y][this.position.x] === t.SQR_PIZZA)
    if (this.data[this.position.y][this.position.x] = t.SQR_CAR) {
      this.pizzas -= 1
    }
    this.dispatch({type: t.MOVE, board: JSON.parse(JSON.stringify(this.data)), position: JSON.parse(JSON.stringify(this.position))})
  }
  turnRight() {
    this.direction += 1;
    if (this.direction < 0) this.direction = 3
    if (this.direction > 3) this.direction = 0
    this.dispatch({type: t.TURN_RIGHT, direction: this.direction})
  }
  getValue(node, env) {
    if (node.constructor.name === 'BinaryOperator') {
      if (node.operator.type === Types.PLUS) {
        return this.getValue(node.left, env) + this.getValue(node.right, env);
      }
      else if (node.operator.type === Types.MINUS) {
        return this.getValue(node.left, env) - this.getValue(node.right, env);
      }
      else if (node.operator.type === Types.MULTIPLICATION) {
        return this.getValue(node.left, env) * this.getValue(node.right, env);
      }
      else if (node.operator.type === Types.DIVISION) {
        return Math.floor(this.getValue(node.left, env) / this.getValue(node.right, env));
      }
      else if (node.operator.type === Types.AND) {
        return this.getValue(node.left, env) && this.getValue(node.right, env);
      }
      else if (node.operator.type === Types.OR) {
        return this.getValue(node.left, env) || this.getValue(node.right, env);
      }
      else if (node.operator.type === Types.COMP) {
        return this.getValue(node.left, env) === this.getValue(node.right, env);
      }
      else {
        throw new Error("Unknow operation");
      }
    }
    else if (node.constructor.name === 'UnaryOperator') {
      if (node.operator.type === Types.PLUS) {
        return this.getValue(node.node, env);
      }
      else if (node.operator.type === Types.MINUS) {
        return - this.getValue(node.node, env);
      }
      else if (node.operator.type === Types.NOT) {
        return ! this.getValue(node.node, env);
      }
      else {
        throw new Error("Unknow operation");
      }
    }
    else if (node.constructor.name === 'NumberNode') {
      return parseInt(node.value);
    }
    else if (node.constructor.name === 'BooleanNode') {
      if (node.type.type === Types.TRUE)
        return true;
      return false;
    }
    else if (node.constructor.name === 'Variable') {
      const value = env.get(node.name.value);
      if (Object.keys(value).length === 0) {
        throw new Error("Unknow variable " + node.name.value);
      }
      else return value.content;
    }
    else if (node.constructor.name === 'FunctionCall') {
      const value = this.functionCall(node, env);
      if (Object.keys(value).length === 0) {
        throw new Error("Function doesnt return value " + node.funcName.value);
      }
      else return value.content;
    }
    else {
      throw new Error("Unknow operation");
    }
  }
  evaluate(statement, env) {
    if (statement.constructor.name === 'BinaryOperator') {
      if (statement.operator.type === Types.ASSIGMENT) {
        if (statement.left.type !== Types.NAME) {
          throw new Error("Wrong type");
        }
        env.set(statement.left.value, 'num', this.getValue(statement.right, env))
      }
    }
    else if (statement.constructor.name === 'ControlStructure') {
      //console.log(util.inspect(statement, false, null));
      const scope = new Enviroment(env);
      if (statement.type.type === Types.IF) {
          const cond = this.getValue(statement.condition, scope)
          if (cond) {
            for (let i = 0; i < statement.block.length; ++i) {
              this.evaluate(statement.block[i], scope);
            }
          }
          else if (statement.secondBlock !== null) {
            for (let i = 0; i < statement.secondBlock.length; ++i) {
              this.evaluate(statement.secondBlock[i], scope);
            }
          }
      }
      else if (statement.type.type === Types.WHILE) {
        while (true) {
          const cond = this.getValue(statement.condition, scope);
          if (!cond) {
            break;
          }
          for (let i = 0; i < statement.block.length; ++i) {
            this.evaluate(statement.block[i], scope);
          }
        }
      }
      else if (statement.type.type === Types.DO) {
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
    else if (statement.constructor.name === 'FunctionDef') {
      env.set(statement.funcName.value, 'func', statement);
    }
    else if (statement.constructor.name === 'FunctionReturn') {
      env.set('_return', 'return', this.getValue(statement.value, env));
      return true;
    }
    else if (statement.constructor.name === 'FunctionCall') {
      this.functionCall(statement, env);
    }
    return false;
  }
  functionCall(statement, env) {
    if (statement.funcName.value === 'move') {
      this.move();
      return {};
    }
    if (statement.funcName.value === 'turn') {
      this.turnRight();
      return {};
    }
    const func = env.get(statement.funcName.value);
    if (Object.keys(func).length === 0 || func.type !== 'func') {
      throw new Error("Unknow function ");
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
    this.dispatch({type: t.RUNNING})
    this.dispatch({type: t.MOVE, board: JSON.parse(JSON.stringify(this.data)), position: JSON.parse(JSON.stringify(this.position))})
    const statements = this.parser.parse();
    for (let i = 0; i < statements.length; ++i) {
      this.evaluate(statements[i], this.env);
    }
    if (this.pizzas === 0)
      this.dispatch({type: t.WIN})
    else
      this.dispatch({type: t.FAIL})
    return statements;
  }
}