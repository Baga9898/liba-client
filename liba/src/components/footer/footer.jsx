import React from 'react';
import './footer.scss'

const Footer = () => {
    return (
        <footer className='footer'>
            <span className='footer__text'>&#169; <a href='https://github.com/Baga9898' className='footer__text_name'>Baga9898 </a> {new Date().getFullYear()}</span>
        </footer>
    )
}

export default Footer;