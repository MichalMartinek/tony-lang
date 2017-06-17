import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

import * as t from './constants/level'
import * as levels from './lib/levels'
const target = document.getElementById('root')

store.dispatch({type: t.NEW_LEVEL, level: levels.LEVELS[0]})

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