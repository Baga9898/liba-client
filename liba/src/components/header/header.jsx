import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
    return (
        <header className='header'>
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__leftside">
                        {/* <FontAwesomeIcon icon={faTh} className="header__leftside_menu-icon"/> */}
                        <Link to="/"><div className="logo">Liba_</div></Link>
                    </div>
                    <div className="header__rideside">

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header