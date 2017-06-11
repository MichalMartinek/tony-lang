import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Square from '../components/Square'
import * as actions from '../actions/board'

class Board extends Component {
  render() {
    const dir = this.props.direction
    const listItems = this.props.board.map(function (row){
      return (
        <div className="board-row">
          {row.map((sqr) =>
            <Square symbol={sqr} orientation={dir} />
          )}
        </div>
      )
    });
    return (
      <div>
        {listItems}
        <button onClick={this.props.move}>Move</button>
        <button onClick={this.props.turn_right}>Turn</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board.board,
  direction: state.board.direction,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)


