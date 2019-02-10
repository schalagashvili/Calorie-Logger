import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import App from './app'
import * as rootReducers from './reducers'
import './styles/global'

const rootReducer = combineReducers({
  ...rootReducers
})

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)

const store = createStoreWithMiddleware(rootReducer, applyMiddleware(thunk, apiMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
