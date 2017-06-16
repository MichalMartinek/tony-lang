/**
 * Created by mi on 6.3.17.
 */

export default class FunctionDef {
  /**
   *
   * @param name Token
   * @param args Array
   */
  constructor(name, args, block) {
    this.funcName = name;
    this.args = args;
    this.block = block;
  }
}
