import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Redux set-up
import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
)

// Get root div
let root = document.getElementById("root");

// Render app into root
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);