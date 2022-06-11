import React, { useState } from 'react';
import CookieImage from '../../../assets/Cookie.png';
import './cookieClicker.scss';

const CookieClicker = () => {
    const clicks = parseInt(localStorage.getItem('clicks') || '0') ;
    const [click, setClick] = useState(clicks);

    const cookieClick = (newCount: number) => {
        setClick(newCount);
        localStorage.setItem('clicks', String(newCount));
    }

    return (
        <div className='section__wrapper clickerBlockWrapper'>
            <button style={{background: 'transparent'}} onClick={()=> cookieClick(click + 1)}>
                <img className='cookie rotation' src={CookieImage} alt='Cookie =)=)'/>
            </button>
            <p className='clickerCount'>{click}</p>
        </div>
    )
}

export default CookieClicker;