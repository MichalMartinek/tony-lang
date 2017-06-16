import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Board from '../components/Board'
import Editor from '../components/Editor'
import * as actions from '../actions/board'

class Plan extends Component {
  render() {
    return (
      <div className="wrapper">
        <Modal
          isOpen={this.props.isError}
          contentLabel="Error"
          onRequestClose={this.props.closeError}
        >
          <h1 className="error-heading">Error</h1>
          <code>{this.props.error.name + ' - ' + this.props.error.message}</code><br />
          <button className="run warn" onClick={this.props.closeError}>Close</button>
        </Modal>
        <div className="half">
          <Editor handleChange={this.props.changeCode} value={this.props.value}/>
        </div>
        <div className="half">
          <Board direction={this.props.direction} board={this.props.board} />
          <button className="run" onClick={() => this.props.compile(this.props.value)}>Run 	▶</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board.board,
  direction: state.board.direction,
  value: state.board.code,
  error: state.board.error,
  isError: state.board.isError
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plan)
