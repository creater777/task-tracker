import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers/'
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './containers/App';
import { logger } from './middlewares/loger'

const store = createStore(
  reducers,
  compose(
    applyMiddleware(logger, thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
