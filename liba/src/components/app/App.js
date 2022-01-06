import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';
import MainPage from '../pages/mainPage/mainPage';
import AllResources from '../pages/allResources/allResources';

import './App.scss';

function App() {
  const [allResources, setAllResources] = useState({sections: null,});
  const [booksResources, setBooksResources] = useState({sections: null,});
  const [postsResources, setPostsResources] = useState({sections: null,});

  const apiUrl = 'https://61c03bd033f24c00178231de.mockapi.io/resources';

    useEffect(() => {
        axios.get(apiUrl)
        .then((response) => {
            const allSections = response.data;
            setAllResources({
            sections: allSections
            });
        });
    }, [setAllResources]);

    useEffect(() => {
      axios.get(apiUrl, {params: {category: "books"}})
      .then((response) => {
          const allBooks = response.data;
          setBooksResources({
          sections: allBooks
          });
      });
  }, [setBooksResources]);

    useEffect(() => {
      axios.get(apiUrl, {params: {category: "posts"}})
      .then((response) => {
          const allPosts = response.data;
          setPostsResources({
          sections: allPosts
          });
      });
  }, [setPostsResources]);

  return (
    <Router>
      <div className="App">
        <Header/>
        <div className='container'>
          <Routes>
          {/* TODO: Замапить массив из внешнего файла с роутами. */}
            <Route path="/" element={<MainPage/>}/>
            <Route path="/all-resources" element={<AllResources sections={allResources.sections}/>}/>
            <Route path="/books" element={<AllResources sections={booksResources.sections}/>}/>
            <Route path="/posts" element={<AllResources sections={postsResources.sections}/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
