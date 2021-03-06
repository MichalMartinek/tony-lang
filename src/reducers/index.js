import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import board from './board'
import level from './level'
export default combineReducers({
  routing: routerReducer,
  counter,
  board,
  level,
})