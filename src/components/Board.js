import React, { Component } from 'react';
import Square from '../components/Square'

class Board extends Component {
  render() {
    const dir = this.props.direction
    const listItems = this.props.board.map(function (row, i){
      return (
        <div className="board-row" key={i}>
          {row.map((sqr, j) =>
            <Square symbol={sqr} orientation={dir} key={j} />
          )}
        </div>
      )
    });
    return (
      <div className="board">
        {listItems}
      </div>
    );
  }
}

export default Board

