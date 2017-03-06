/**
 * Created by mi on 15.2.17.
 */

import test from 'tape'
import Types from '../interpreter/token-type'

test( 'Token type', function (test) {
    test.equal(Types.PLUS,Types.PLUS)
    test.notEqual(Types.PLUS,Types.MINUS)
    test.end()
})

