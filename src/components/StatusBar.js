import React, {Component} from 'react';
import * as t from '../constants/board'

class StatusBar extends Component {
    render() {
        switch (this.props.completed) {
            case t.RUNNING:
                return (
                    <div className="statusbar statusbar-yellow">RUNNING</div>
                );
            case t.WIN:
                return (
                    <div className="statusbar statusbar-green">SUCCESFULLY COMPLETED</div>
                )
            case t.FAIL:
                return (
                    <div className="statusbar statusbar-red">UNSUCCESFULLY COMPLETED</div>
                )
            case t.ERROR:
                return (
                    <div className="statusbar statusbar-red">ERROR
                        <button onClick={this.props.viewError}>view</button>
                    </div>
                )
            default:
                return (
                    <div className="statusbar">STOPPED</div>
                )
        }

    }
}

export default StatusBar

