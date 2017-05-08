/**
 * Created by mi on 7.5.17.
 */
export default class Enviroment {
  /**
   *
   * @param parent Enviroment
   */
  constructor(parent) {
    this.parent = parent;
    this.vars = [];
  }
  
  set(name, type, content) {
    if (!this.modify(name,type, content)) {
      this.vars.push({name: name, type: type, content: content});
    }
  }
  
  modify(name, type, content) {
    if (this.parent == null || !this.parent.modify(name, type, content)) {
      const result = this.vars.find(function (obj) {
        return obj.name == name;
      });
      if (result !== undefined) {
        result.type = type;
        result.content = content;
        return true;
      }
      return false;
    }
    return true;
  }
  get (name) {
    const res = this.parent !== null ? this.parent.get(name) : {};
    if (Object.keys(res).length == 0) {
      const result = this.vars.find(function (obj) {
        return obj.name == name;
      });
      if (result !== undefined) {
        return result;
      }
      else {
        return {};
      }
    }
    else {
      return res;
    }
  }
  
}