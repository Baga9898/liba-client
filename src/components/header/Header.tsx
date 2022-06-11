import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
    return (
        <header className='header'>
            <div className='container'>
                <div className='header__wrapper'>
                    <div className='header__leftside'>
                        <Link to='/'><div className='logo'>Liba_</div></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;