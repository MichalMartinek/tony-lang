import * as t from '../constants/counter'

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }
    
    case t.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }
    
    case t.DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }
    
    case t.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }
    
    default:
      return state
  }
}
