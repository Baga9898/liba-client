import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app/App';
import './index.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const defaultState = {
  countAllResources: 0,
  countBooks: 0,
  countWebsites: 0,
  countPosts: 0,
}

const reducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_COUNT_ALLRESOURCES':
      return ({...state, countAllResources: action.payload});

    case 'GET_COUNT_BOOKS':
      return ({...state, countBooks: action.payload});

    case 'GET_COUNT_WEBSITES':
      return ({...state, countWebsites: action.payload});

    case 'GET_COUNT_POSTS':
      return ({...state, countPosts: action.payload});
  
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);