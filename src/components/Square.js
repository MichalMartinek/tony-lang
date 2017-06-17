import React from 'react'
import * as t from '../constants/board'
import Car from '../assets/car2.jpg'
import Pizza from '../assets/pizza.png'
class Square extends React.Component {
  getSymbol(i) {
    switch (i) {
      case t.SQR_PIZZA:
        return <img src={Pizza} />
      case t.SQR_CAR:
        return <img src={Car}/>
      default:
        return null
    }
  }
  render() {
    let classNames = 'board-square'
    if (this.props.symbol === t.SQR_CAR) {
      classNames += ' board-square-car'
      if (this.props.orientation === t.DIRECTION_LEFT) classNames += ' dir-left'
      if (this.props.orientation === t.DIRECTION_UP) classNames += ' dir-up'
      if (this.props.orientation === t.DIRECTION_DOWN) classNames += ' dir-down'
    }
    else if (this.props.symbol === t.SQR_PIZZA) {
      classNames += ' board-square-pizza'
    }
    return (
      <div className={classNames}>

      </div>
    );
  }
}

export default Square