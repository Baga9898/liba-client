import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';
import routes from './routes';

import './App.scss';

function App() {
  return (
      <div className="App">
        <Header/>
        <div className='container'>
          <Routes>
            {routes.map((route, index) => <Route key={Date.now + index} path={route.path} element={route.element}/>)}
          </Routes>
        </div>
        <Footer/>
      </div>
  );
}

export default App;