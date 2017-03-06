/**
 * Created by mi on 14.2.17.
 */

export default class Input {
    /**
     * @param text String
     */
    constructor(text) {
        this.text = text
        this.pos = 0
        this.line = 1
        this.col = 0
        this.len = text.length
    }

    peek() {
        return this.text.charAt(this.pos)
    }

    next() {
        if (this.eof())
            this.throw("End of file")
        const ch = this.peek()
        this.pos++
        if (ch == "\n") {
            this.line++
            this.col = 0
        }
        else
            this.col++
        return ch
    }

    eof() {
        return this.len <= this.pos
    }

    throw(msg){
        throw new Error(msg + ' on ' + this.line + ':' + this.col)
    }
}
