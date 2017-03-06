/**
 * Created by mi on 15.2.17.
 */

export default class Token {
    constructor(type, value) {
        this.type = type
        this.value = value
    }
    toString() {
        return `Token:${this.type} - ${this.value}`
    }
}