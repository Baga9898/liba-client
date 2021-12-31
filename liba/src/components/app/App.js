import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../header/header';
import Footer from '../footer/footer';
import MainPage from '../pages/mainPage/mainPage';

import './App.scss';

function App() {

  const [appState, setAppState] = useState(
    {
      sections: null,
    }
  );

  useEffect(() => {
      const apiUrl = 'https://61c03bd033f24c00178231de.mockapi.io/resources';
      axios.get(apiUrl)
      .then((response) => {
          const allSections = response.data;
          setAppState({
            sections: allSections
          });
      });
  }, [setAppState]);

  return (
    <div className="App">
      <Header/>
      <div className='container'>
        <MainPage sections={appState.sections}/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
