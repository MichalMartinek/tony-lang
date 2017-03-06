/**
 * Created by mi on 15.2.17.
 */

import test from 'tape'
import Token from '../interpreter/token'
import Types from '../interpreter/token-type'

test( 'Token', function ( test ) {
    const value = 'abc'
    const t = new Token(Types.PLUS, value)
    test.equal( t.type, Types.PLUS )
    test.equal( t.value, value )

    test.end()
})