import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Board from '../components/Board'
import Editor from '../components/Editor'
import End from '../components/End'
import StatusBar from '../components/StatusBar'
import * as actions from '../actions/board'
import * as t from '../constants/board'

class Plan extends Component {
  constructor() {
    super()
    this.initBoard = this.initBoard.bind(this)
  }
  componentDidMount() {
    this.initBoard()
  }
  initBoard() {
    this.props.initBoard(JSON.parse(JSON.stringify(this.props.level.board)), JSON.parse(JSON.stringify(this.props.level.position)))
  }
  render() {
    if (this.props.win) {
      return ( <End />);
    }
    else {
      return (
        <div>
          <Modal
            isOpen={this.props.isError}
            contentLabel="Error"
            onRequestClose={this.props.closeError}
          >
            <h1 className="error-heading">Error</h1>
            <code>{this.props.error.name + ' - ' + this.props.error.message}</code><br />
            <button className="run warn" onClick={this.props.closeError}>Close</button>
          </Modal>
          <div className="wrapper">
            <div className="description">
              <h1>Wow</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illo ipsam praesentium tempora vitae. Aliquid dicta dolore earum eos, esse hic inventore, modi quae quaerat, quasi quo rerum sed tenetur?</p>
            </div>
            <div className="editor">
              <Editor handleChange={this.props.changeCode} value={this.props.value}/>
              <div className="controls">
                <button className="run"
                        onClick={() => this.props.compile(this.props.value, JSON.parse(JSON.stringify(this.props.level)))}
                        disabled={this.props.completed === t.RUNNING}>
                  Run ▶
                </button>
                <button className="run warn" onClick={this.initBoard} disabled={this.props.completed === t.RUNNING}>Reset</button>
                <button className="run" hidden={this.props.completed !== t.WIN}
                        onClick={() => this.props.nextLevel(this.props.level)}>Next Level
                </button>
              </div>
            </div>
            <Board direction={this.props.direction} board={this.props.board}/>
          </div>
          
          
  
          <StatusBar completed={this.props.completed} viewError={this.props.closeError}/>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  board: state.board.board,
  direction: state.board.direction,
  value: state.board.code,
  error: state.board.error,
  isError: state.board.isError,
  level: state.level,
  completed: state.board.completed,
  win: state.board.win,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plan)
