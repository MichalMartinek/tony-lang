import React, { Component } from 'react';
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'

import '../interpreter/editor'

class Cookbook extends Component {
  render() {
    const options = {
      lineNumbers: true,
      readOnly:"nocursor",
      mode: 'simplemode',
    };
    return (
      <div className="container codebook">
        <h1>Cookbook</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi cum cupiditate dignissimos dolores error eveniet in ipsum iste nihil non pariatur placeat praesentium, quaerat rerum similique sit tempore voluptatum.</p>
  
        <h2>While loop</h2>
        <CodeMirror value={`while cond\n   ...\nend. `}  options={options} />
        
        <h2>Do n times loop</h2>
        <CodeMirror value={`do n times\n   ...\nend. `}  options={options} />
        
        <h2>If statement</h2>
        <CodeMirror value={`if cond \n   ...\nelse\n   ...\nend. `}  options={options} />
  
        <h2>Variables</h2>
        <p>You can store integer numbers or boolean values.</p>
        <CodeMirror value={
`data = 0.
cont = true.
while cont
  data = data + 1.
  if data == 10
     cont = false.
  end.
end.`}  options={options} />
  
        <h2>Function decleration</h2>
        <CodeMirror value={
`function print(name)
   return name + 3.
end.`}  options={options} />


      </div>
    );
  }
}

export default Cookbook