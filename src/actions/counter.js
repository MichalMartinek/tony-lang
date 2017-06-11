import * as t from '../constants/counter'

export const increment = () => {
  return dispatch => {
    dispatch({
      type: t.INCREMENT_REQUESTED
    })
    
    dispatch({
      type: t.INCREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: t.INCREMENT_REQUESTED
    })
    
    return setTimeout(() => {
      dispatch({
        type: t.INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: t.DECREMENT_REQUESTED
    })
    
    dispatch({
      type: t.DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: t.DECREMENT_REQUESTED
    })
    
    return setTimeout(() => {
      dispatch({
        type: t.DECREMENT
      })
    }, 3000)
  }
}