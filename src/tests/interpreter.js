/**
 * Created by mi on 6.3.17.
 */

import test from 'tape'
import util from 'util'
import Lexer from '../interpreter/lexer'
import Parser from '../interpreter/parser'
import Interpreter from '../interpreter/interpreter'



test('Interpreter', function ( test ) {
  const program2 = `
    data = 0.
    cont = true.
    while (cont)
      data = data + 1.
      if (data == 10)
        cont = false.
      end.
    end.
  `;
  const program = `
  data = 0.
    function print(name)
      data = name.
      return 5 + 3.
    end.
    data = print(3).
    cont = true.
    do 5 + 3 times
      data = data + 1.
    end.
  `;
  const lex = new Lexer(program);
  //const lex = new Lexer("write = -3 + 5/2-2.");
  const par = new Parser(lex);
  const intr = new Interpreter(par);
  const res = intr.run();
  console.log(util.inspect(intr, false, null));
  //console.log(util.inspect(res, false, null));
  test.end()
})
/*
test('Interpreter2', function ( test ) {
  const program = `write = 3. if (write == 5)
  write = 5.
  end.
  `;
  const lex = new Lexer(program);
  //const lex = new Lexer("write = -3 + 5/2-2.");
  const par = new Parser(lex);
  const intr = new Interpreter(par);
  const res = intr.run();
  console.log(util.inspect(intr, false, null));
  //console.log(util.inspect(res, false, null));
  test.end()
})*/