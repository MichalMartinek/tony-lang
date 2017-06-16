/**
 * Created by mi on 21.2.17.
 */

export default class BinaryOperator {
  /**
   *
   * @param op - represents binary operator
   * @param left - represents left node
   * @param right - represents right node
   */
  constructor(op, left, right) {
    this.operator = op;
    this.left = left;
    this.right = right;
  }
}