import React from 'react';
import './preloader.scss';
import CookiePreloader from '../../../assets/Cookie-smile.png';

const Preloader = () => {
    return <img className='preloader' src={CookiePreloader} alt='Cookie preloader'/>;
};

export default Preloader;