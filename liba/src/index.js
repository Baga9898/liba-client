import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app/App';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';


ReactDOM.render(
  	<Provider store={store}>
    	<Router>
      		<App />
    	</Router>
  	</Provider>,
  document.getElementById('root')
);