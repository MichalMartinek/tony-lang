/**
 * Created by mi on 14.2.17.
 */
import test from 'tape'
import Input from '../interpreter/input'

test( 'Input - peek method', function ( test ) {

    const inp = new Input("a")
    test.equal( inp.peek(), 'a', 'return first char' )

    test.end()
})
test( 'Input - next method', function ( test ) {

    const inp = new Input("ac\nd")
    test.equal( inp.next(), "a", 'should return character' )
    test.equal( inp.next(), "c", 'should return character' )
    test.equal( inp.col, 2,'should be second column' )
    test.equal( inp.line, 1,'should be first line' )
    inp.next()
    test.equal( inp.col, 0,'should be zero column' )
    test.equal( inp.line, 2,'should second line' )
    test.end()
})
test( 'Input - eof method', function ( test ) {

    const inp = new Input("")
    test.equal( inp.eof(), true, 'should be end of input' )
    const inp2 = new Input("a")
    test.equal( inp2.eof(), false,'should not be end of input' )
    inp2.next()
    test.equal( inp2.eof(), true, 'should be end of input' )

    test.end()
})