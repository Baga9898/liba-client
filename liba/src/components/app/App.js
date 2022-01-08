import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';
import MainPage from '../pages/mainPage/mainPage';
import AllResources from '../pages/allResources/allResources';
import Websites from '../pages/websites/websites';
import Books from '../pages/books/books';
import Posts from '../pages/posts/posts';

import './App.scss';

function App() {
  return (
      <div className="App">
        <Header/>
        <div className='container'>
          <Routes>
          {/* TODO: Замапить массив из внешнего файла с роутами. */}
            <Route path="/" element={<MainPage/>}/>
            <Route path="/all-resources" element={<AllResources/>}/>
            <Route path="/websites" element={<Websites/>}/>
            <Route path="/books" element={<Books/>}/>
            <Route path="/posts" element={<Posts/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
  );
}

export default App;