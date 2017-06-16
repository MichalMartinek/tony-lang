import * as t from '../constants/board'

const initialState = {
  board: [[2, 0, 0, 0,], [0, 0, 0, 0,], [0, 0, 1, 0,], [0, 0, 0, 0,]],
  direction: t.DIRECTION_RIGHT,
  position: {
    x: 0,
    y: 0,
  },
  code: '',
  error: '',
  isError: false
}


export default (state = initialState, action) => {
  switch (action.type) {
    case t.MOVE:
      return {
        ...state,
        position: action.position,
        board: action.board
      }
    
    case t.TURN_RIGHT:
      return {
        ...state,
        direction: action.direction
      }
  
    case t.CHANGE_CODE:
      return {
        ...state,
        code: action.code
      }
    case t.ERROR:
      return {
        ...state,
        isError: true,
        error: action.error
      }
    case t.CLOSE_ERROR:
      return {
        ...state,
        isError: false,
      }
    default:
      return state
  }
}
