/**
 * Created by mi on 6.3.17.
 */

export default class FunctionCall {
  /**
   *
   * @param name Token
   * @param args Array
   */
  constructor(name, args) {
    this.funcName = name;
    this.args = args;
  }
}
