import * as t from '../constants/board'

export const move = () => {
  return dispatch => {
    dispatch({
      type: t.MOVE
    })
  }
}

export const turn_right = () => {
  return dispatch => {
    dispatch({
      type: t.TURN_RIGHT
    })
  }
}