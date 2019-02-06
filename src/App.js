import React from 'react';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import logo from './logo.svg';
import './App.css';

import reducers from './reducers/'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // applyMiddleware(logger, thunkMiddleware)
)

export default () =>
  <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  </Provider>
