import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';
import MainPage from '../pages/mainPage/mainPage';
import AllResources from '../pages/allResources/allResources';

import './App.scss';

function App() {
  const [allResources, setAllResources] = useState(
    {
        sections: null,
    }
    );

    useEffect(() => {
        const apiUrl = 'https://61c03bd033f24c00178231de.mockapi.io/resources';
        axios.get(apiUrl)
        .then((response) => {
            const allSections = response.data;
            setAllResources({
            sections: allSections
            });
        });
    }, [setAllResources]);

  return (
    <Router>
      <div className="App">
        <Header/>
        <div className='container'>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/all-resources" element={<AllResources sections={allResources.sections}/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
