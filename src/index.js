import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

import * as t from './constants/level'
const target = document.getElementById('root')

store.dispatch({type: t.NEW_LEVEL, level: {board:[[2,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0],[0,0,0,0,0],[0,0,0,1,0]], description: 'Wowo such level', position: {
  x: 0,
  y: 0,
}}})

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
registerServiceWorker()