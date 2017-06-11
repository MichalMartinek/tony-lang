import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import board from './board'

export default combineReducers({
  routing: routerReducer,
  counter,
  board
})