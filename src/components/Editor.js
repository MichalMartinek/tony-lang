import React from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'

import '../interpreter/editor'


class Editor extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(event) {
    this.props.handleChange(event)
  }
  render() {
    //<textarea value={this.props.value} onChange={this.handleChange} />
    const options = {
      lineNumbers: true,
      mode: 'simplemode',
    };
    return (
        <CodeMirror className="editor-code" value={this.props.value} onChange={this.handleChange} options={options} />
    );
  }
}

export default Editor