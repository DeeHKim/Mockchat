import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import {Router, browserHistory} from 'react-router'
import Routes from './routes'

import reducers from './reducers'

import ReduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={Routes}/>
  </Provider>,
  document.getElementById('app')
)
