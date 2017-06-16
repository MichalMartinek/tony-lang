import * as t from '../constants/level'

const initialState = {
  board: [[0]],
  description: '',
  position: {
    x: 0,
    y: 0,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.NEW_LEVEL:
      return action.level
    default:
      return state
  }
}
