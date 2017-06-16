import * as t from '../constants/board'
import Lexer from '../interpreter/lexer'
import Parser from '../interpreter/parser'
import Interpreter from '../interpreter/interpreter'

export const changeCode = (code) => {
  return dispatch => {
    dispatch({
      type: t.CHANGE_CODE,
      code: code
    })
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

export const compile = (code) => {
  return dispatch => {
    try {
      const lex = new Lexer(code);
      const par = new Parser(lex);
      const intr = new Interpreter(par, decor(dispatch))
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