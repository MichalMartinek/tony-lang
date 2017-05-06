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
import Token from './token'

export default class Parser {
  /**
   *
   * @param lex Lexer
   */
  constructor(lex) {
    this.lexer = lex;
    this.token = this.lexer.getToken();
  }
  matchType(type) {
    return this.token.type === type;
  }
  eatType(type) {
    if (this.matchType(type))
      this.eatToken();
    else
      throw new Error('Wrong token - ' + this.token.type.toString() + ' on ' + this.lexer.line + ':' + this.lexer.col);
  }
  eatToken() {
    this.token = this.lexer.getToken()
  }
  // Subtraction and sum
  expression() {
    let node = this.term();
    
    while(true) {
      if (this.matchType(Types.PLUS) || this.matchType(Types.MINUS)) {
        const op = this.token;
        this.eatToken();
        node = new BinaryOperator(op, node, this.term());
      }
      else
        return node;
    }
  }
  // Multiplication and division
  term() {
    let node = this.factor();
    while(true) {
      if (this.matchType(Types.MULTIPLICATION) || this.matchType(Types.DIVISION)) {
        const op = this.token;
        this.eatToken();
        node = new BinaryOperator(op, node, this.factor());
      }
      else
        return node;
    }
  }
  /* Number, (Expression), BinaryOperator Factor, FunctionCall, Variable
   */
  factor() {
    if (this.matchType(Types.PLUS) || this.matchType(Types.MINUS)) {
      const op = this.token;
      this.eatToken();
      return new UnaryOperator(op, this.factor());
    }
    else if (this.matchType(Types.LPAR)) {
      this.eatToken();
      const result = this.expression();
      this.eatType(Types.RPAR);
      return result;
    }
    else if (this.matchType(Types.NUMBER)) {
      const result = new NumberNode(this.token.value);
      this.eatToken();
      return result;
    }
    else if (this.matchType(Types.NAME)) {
      const name = this.token;
      this.eatToken();
      if (this.matchType(Types.LPAR)) {
        return this.functionCall(name);
      }
      else
        return new Variable(name);
      
    }
  }
  statement() {
    const first = this.token;
    if (this.matchType(Types.NAME)) {
      this.eatToken();
      const second = this.token;
      // Assigment
      if (this.matchType(Types.ASSIGMENT)) {
        this.eatToken();
        const value = this.expression();
        this.eatType(Types.DOT);
        return new BinaryOperator(second, first, value);
      }
      // Function call
      return this.functionCall(first);
    }
    // Control Structure
    return this.controlStructure();
  }
  functionCall(name) {
    this.eatType(Types.LPAR);
    const args = [];
    while (true) {
      if (!this.matchType(Types.RPAR)) args.push(this.expression());
      if (this.matchType(Types.RPAR)) {
        this.eatToken();
        const result = new FunctionCall(name, args);
        this.eatType(Types.DOT);
        return result;
      }
      else
        this.eatType(Types.COMMA);
    }
  }
  controlStructure() {
    const op = this.token;
    if (this.matchType(Types.IF)) {
      this.eatToken();
      const cond = this.condition();
      
      const statements = [];
      while (true) {
        if (this.matchType(Types.END)) {
          this.eatToken();
          this.eatType(Types.DOT);
          return new ControlStrucutre(op, cond, statements, null);
        } else if (this.matchType(Types.ELSE)) {
          this.eatToken();
          return new ControlStrucutre(op, true, cond, statements, this.compoundStatement());
        }
        else {
          statements.push(this.statement());
        }
      }
    } else if (this.matchType(Types.WHILE)) {
      this.eatToken();
      const cond = this.condition();
      return new ControlStrucutre(op, cond, this.compoundStatement(), null);
    } else if (this.matchType(Types.DO)) {
      this.eatToken();
      const cond = this.expression();
      this.eatType(Types.TIMES);
      return new ControlStrucutre(op, cond, this.compoundStatement(), null);
    }
  }
  
  /**
   * disjuction
   */
  condition() {
    let node = this.conjuction();
    
    while(true) {
      if (this.matchType(Types.OR)) {
        const op = this.token;
        this.eatToken();
        node = new BinaryOperator(op, node, this.conjuction());
      }
      else
        return node;
    }
  }
  // Conjuction
  conjuction() {
    let node = this.bolean();
    while(true) {
      if (this.matchType(Types.AND)) {
        const op = this.token;
        this.eatToken();
        node = new BinaryOperator(op, node, this.bolean());
      }
      else
        return node;
    }
  }
  /* Number, (Expression), BinaryOperator Factor, FunctionCall, Variable
   */
  bolean() {
    if (this.matchType(Types.NOT)) {
      const op = this.token;
      this.eatToken();
      return new UnaryOperator(op, this.factor());
    }
    else if (this.matchType(Types.LPAR)) {
      this.eatToken();
      const result = this.condition();
      this.eatType(Types.RPAR);
      return result;
    }
    else if (this.matchType(Types.TRUE) || this.matchType(Types.FALSE)) {
      const result = new BooleanNode(this.token);
      this.eatToken();
      return result;
    }
    else {
      const expr = this.expression()
      if (this.matchType(Types.ASSIGMENT)){
        this.eatToken();
        this.eatType(Types.ASSIGMENT);
        return new BinaryOperator(new Token(Types.COMP, '=='), expr, this.expression());
      }
      else return expr;
    }
  }
  compoundStatement() {
    const statements = [];
    while (!this.matchType(Types.END)) {
      statements.push(this.statement());
    }
    this.eatToken();
    this.eatType(Types.DOT);
    return statements;
  }
  parse() {
    const statements = [];
    while (!this.lexer.eof()) {
      statements.push(this.statement());
    }
    return statements;
  }
}