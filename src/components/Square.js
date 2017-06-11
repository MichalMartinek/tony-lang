import React from 'react'
import * as t from '../constants/board'

class Square extends React.Component {
  getSymbol(i) {
    switch (i) {
      case t.SQR_PIZZA:
        return '	🍕'
      case t.SQR_CAR:
        return '🚗'
      default:
        return '\u00A0'
    }
  }
  render() {
    const symbol = this.getSymbol(this.props.symbol)
    let classNames = 'board-square'
    if (this.props.symbol === t.SQR_CAR) {
      if (this.props.orientation == t.DIRECTION_LEFT) classNames += ' dir-left'
      if (this.props.orientation == t.DIRECTION_UP) classNames += ' dir-up'
      if (this.props.orientation == t.DIRECTION_DOWN) classNames += ' dir-down'
    }
    return (
      <div className={classNames}>
        {symbol}
      </div>
    );
  }
}

export default Square