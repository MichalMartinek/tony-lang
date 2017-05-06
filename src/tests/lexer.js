/**
 * Created by mi on 15.2.17.
 */

import test from 'tape'
import Lexer from '../interpreter/lexer'
import Types from '../interpreter/token-type'

test( 'Lexer - test super class', function ( test ) {

    const inp = new Lexer("a")
    test.equal( inp.peek(), 'a', 'return first char' )

    test.end()
})

test( 'Lexer - getToken', function ( test ) {

    const lex = new Lexer("if ahoj = else while , +\nend . * /( ) do -5 times %")
    test.equal(lex.getToken().type, Types.IF)
    const t = lex.getToken()
    test.equal(t.type, Types.NAME)
    test.equal(t.value, 'ahoj')
    test.equal(lex.getToken().type, Types.ASSIGMENT)
    test.equal(lex.getToken().type, Types.ELSE)
    test.equal(lex.getToken().type, Types.WHILE)
    test.equal(lex.getToken().type, Types.COMMA)
    test.equal(lex.getToken().type, Types.PLUS)
    test.equal(lex.getToken().type, Types.END)
    test.equal(lex.getToken().type, Types.DOT)
    test.equal(lex.getToken().type, Types.MULTIPLICATION)
    test.equal(lex.getToken().type, Types.DIVISION)
    test.equal(lex.getToken().type, Types.LPAR)
    test.equal(lex.getToken().type, Types.RPAR)
    test.equal(lex.getToken().type, Types.DO)
    test.equal(lex.getToken().type, Types.MINUS)
    test.equal(lex.getToken().type, Types.NUMBER)
    test.equal(lex.getToken().type, Types.TIMES)
    test.throws(() => lex.getToken(),Error)
    test.end()
})

