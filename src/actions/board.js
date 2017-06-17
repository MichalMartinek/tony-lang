import * as t from '../constants/board'
import Lexer from '../interpreter/lexer'
import Parser from '../interpreter/parser'
import Interpreter from '../interpreter/interpreter'
import * as tLevel from '../constants/level'
import * as levels from '../lib/levels'

export const changeCode = (code) => {
  return dispatch => {
    dispatch({
      type: t.CHANGE_CODE,
      code: code
    })
  }
}
export const initBoard = (board,position) => {
  return dispatch => {
    dispatch({
      type: t.MOVE,
      board: board,
      position: position
    })
  }
}
export const nextLevel = (level) => {
  return dispatch => {
    if(level.index + 1 >= levels.LEVELS.length) {
      dispatch({
        type: t.GAME_WIN,
      })
    }
    else {
      const l = levels.LEVELS[level.index + 1]
      dispatch({type: tLevel.NEW_LEVEL, level: l})
      dispatch({
        type: t.MOVE,
        board: l.board,
        position: l.position
      })
    }
  }
}

function decor(dispatch) {
  const front = []
  let interval
  let running = false
  const fun = () => {
    if (front.length !== 0) {
      dispatch(front.shift())
    }
    else {
      clearInterval(interval)
      running = false
    }
  }
  return function (arg) {
    front.push(arg)
    if (! running) {
      running = true
      fun()
      interval = setInterval(fun, 1000);
    }
  }
}

export const compile = (code, level) => {
  return dispatch => {
    try {
      const lex = new Lexer(code);
      const par = new Parser(lex);
      const intr = new Interpreter(par, decor(dispatch), level)
      intr.run();
    }
    catch(error) {
      dispatch({
        type: t.ERROR,
        error: error
      })
    }
  }
}
export const closeError = () => {
  return dispatch => {
    dispatch({
      type: t.CLOSE_ERROR
    })
  }
}