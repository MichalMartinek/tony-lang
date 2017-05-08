/**
 * Created by mi on 6.3.17.
 */

import test from 'tape'
import util from 'util'
import Lexer from '../interpreter/lexer'
import Parser from '../interpreter/parser'

test('Parser', function ( test ) {
  
 /* const lex = new Lexer("3+5*(3+5)");
  const par = new Parser(lex);
  console.log(par.parse());
  
  //test.equal( inp.peek(), 'a', 'return first char' );
  */
  test.end()
})

test('Parser 2', function ( test ) {
  
  const lex = new Lexer("write = 5 + 3 == 2.test(1/2+2,3).");
  const par = new Parser(lex);
  const res = par.statement();
  const res2 = par.statement();
  //console.log(res);
  //console.log(util.inspect(res2, false, null));
  
  //test.equal( inp.peek(), 'a', 'return first char' );
  
  test.end()
})

test('Parser 3', function ( test ) {
  
  const lex = new Lexer("if (5 == 3 and false or write) write = 5. end. test(). write = 3.");
  const par = new Parser(lex);
  const res = par.parse();
  //console.log(util.inspect(res, false, null));
  test.end()
})
test('Parser 3', function ( test ) {
  
  const lex = new Lexer("function print(write, test) return 3. end. ");
  const par = new Parser(lex);
  const res = par.parse();
  console.log(util.inspect(res, false, null));
  test.end()
})