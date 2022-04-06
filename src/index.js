import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app/App';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

const root = createRoot(document.getElementById('root'));

root.render(
	<Provider store={store}>
     	<Router>
       		<App />
     	</Router>
   	</Provider>,
)