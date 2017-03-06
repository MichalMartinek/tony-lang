/**
 * Created by mi on 6.3.17.
 */

import BinaryOperator from './ast/binary-operator';
import UnaryOperator from './ast/unary-operator';
import Number from './ast/number';
import Types from './token-type'

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
      throw new Error('Wrong token on ' + this.lexer.line + ':' + this.lexer.col);
  }
  eatToken() {
    this.token = this.lexer.getToken()
  }
  // Subtraction and sum
  expression() {
    let node = this.term();
    
    while(true) {
      console.log(this.token);
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
  // Number, (Expression), BinaryOperator Factor
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
      const result = new Number(this.token.value);
      this.eatToken();
      return result;
    }
    
  }
  parse() {
    return this.expression();
  }
}