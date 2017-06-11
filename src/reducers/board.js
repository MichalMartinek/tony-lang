import * as t from '../constants/board'

const initialState = {
  board: [[2, 0, 0, 0,], [0, 0, 0, 0,], [0, 0, 1, 0,], [0, 0, 0, 0,]],
  direction: t.DIRECTION_RIGHT,
  position: {
    x: 0,
    y: 0,
  }
}

function getDirection (dir) {
  switch (dir) {
    case t.DIRECTION_UP:
      return {x: 0, y: -1}
    case t.DIRECTION_RIGHT:
      return {x: 1, y: 0}
    case t.DIRECTION_DOWN:
      return {x: 0, y: 1}
    default:
      return {x: -1, y: 0}
  }
}

function handleLimits(x) {
  if (x >= t.SIZE) return t.SIZE -1
  if (x < 0) return 0
  return x
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.MOVE:
      const newOne =  JSON.parse(JSON.stringify(state));
      const dir = getDirection(state.direction)
      newOne.position.x = handleLimits(newOne.position.x + dir.x)
      newOne.position.y = handleLimits(newOne.position.y + dir.y)
      newOne.board[state.position.y][state.position.x] = t.SQR_FREE
      newOne.board[newOne.position.y][newOne.position.x] = t.SQR_CAR
      return newOne
    
    case t.TURN_RIGHT:
      const newState =  JSON.parse(JSON.stringify(state));
      newState.direction += 1;
      if (newState.direction < 0) newState.direction = 3
      if (newState.direction > 3) newState.direction = 0
      return newState
  
    default:
      return state
  }
}
