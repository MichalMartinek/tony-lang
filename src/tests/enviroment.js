/**
 * Created by mi on 6.3.17.
 */

import test from 'tape'
import util from 'util'
import Enviroment from '../interpreter/enviroment'



test('Enviroment', function ( test ) {
  const env = new Enviroment(null);
  env.set('num', 'num', 5)
  const env2 = new Enviroment(env);
  env2.set('num', 'num', 3);
  env2.set('num2', 'num', 3);
  /*console.log(env2.get('num2'));
  console.log(env.get('num'));
  console.log(util.inspect(env, false, null));*/
  test.end()
})