/**
 * Created by mi on 14.2.17.
 */
import Input from './input'
import Token from './token'
import TYPES from './token-type'
export default class Lexer extends Input{
    constructor(text){
        super(text)
    }
    getToken(){
        while(this.isWhitespace()){
            this.next()
        }
        const r = this.matchSymbol()
        if (r !== false) return r;
        if (this.isDigit()) return this.getNumber();
        if (this.isAlpha()) return this.getString();
        this.throw("Unsupported symbol")

    }
    matchSymbol(){
        if (this.peek() == '+') return new Token(TYPES.PLUS, this.next())
        if (this.peek() == '-') return new Token(TYPES.MINUS, this.next())
        if (this.peek() == '*') return new Token(TYPES.MULTIPLICATION, this.next())
        if (this.peek() == '/') return new Token(TYPES.DIVISION, this.next())
        if (this.peek() == ',') return new Token(TYPES.COMMA, this.next())
        if (this.peek() == '(') return new Token(TYPES.LPAR, this.next())
        if (this.peek() == ')') return new Token(TYPES.RPAR, this.next())
        if (this.peek() == ';') return new Token(TYPES.SEMICOLON, this.next())
        return false;
    }
    isWhitespace() {
        var white = new RegExp(/^\s$/);
        return white.test(this.peek());
    }

    isDigit() {
        const charCode = this.peek().charCodeAt()
        return charCode > 47 && charCode < 58
    }
    getNumber() {
        let s = this.next()
        while (this.isDigit())
            s += this.next()
        return new Token(TYPES.NUMBER,s)
    }
    isAlpha() {
        const charCode = this.peek().charCodeAt()
        return (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)
    }
    getString() {
        let s = this.next()
        while(this.isAlpha()) {
            s += this.next()
        }
        if (s == 'if') return new Token(TYPES.IF, s)
        if (s == 'else') return new Token(TYPES.ELSE, s)
        if (s == 'end') return new Token(TYPES.END, s)
        if (s == 'do') return new Token(TYPES.DO, s)
        if (s == 'while') return new Token(TYPES.WHILE, s)
        if (s == 'times') return new Token(TYPES.TIMES, s)
        if (s == 'function') return new Token(TYPES.FUNCTION, s)
        return new Token(TYPES.NAME, s)

    }

}

