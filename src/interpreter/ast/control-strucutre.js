/**
 * Created by mi on 6.3.17.
 */

export default class ControlStructure {
  constructor(type, condition, block, secondBlock) {
    this.type = type;
    this.condition = condition;
    this.block = block;
    this.secondBlock = secondBlock;
  }
}