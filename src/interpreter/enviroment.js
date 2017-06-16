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
      this.fset(name, type, content);
    }
  }
  fset (name,type,content) {
    this.vars.push({name: name, type: type, content: content});
  }
  modify(name, type, content) {
    const result = this.vars.find(function (obj) {
      return obj.name === name;
    });
    if (result !== undefined) {
      result.type = type;
      result.content = content;
      return true;
    }
    else if (this.parent != null) {
       return this.parent.modify(name, type, content)
    }
    return false;
  }
  get (name) {
    const result = this.vars.find(function (obj) {
      return obj.name === name;
    });
    if (result !== undefined) {
      return result;
    }
    else {
      return this.parent !== null ? this.parent.get(name) : {};
    }
  }
  
}