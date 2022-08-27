import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

import LibaModal from './../utils/libaModal/LibaModal';
import LibaInput from './../utils/libaInput/libaInput';
import axios from 'axios';

import './header.scss';

const Header = () => {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authTabType, setAuthTabType] = useState('reg');
    const [authForm, setAuthForm] = useState({
        username: '',
        password: '',
    });

    const headerContent = (
        <div className='authHeader'>
            <button onClick={() => setAuthTabType('reg')} className={authTabType === 'reg' ? 'activeButton' : ''}>Registration</button>
            <p>/</p>
            <button onClick={() => setAuthTabType('auth')} className={authTabType === 'auth' ? 'activeButton' : ''}>Authorization</button>
        </div>
    );

    const registration = () => {
        axios.post('http://localhost:5000/auth/registration/', {
            // username: authForm.username,
            // password: authForm.password,
            ...authForm,
        })
    }

    return (
        <>
            <header className='header'>
                <div className='container'>
                    <div className='header__wrapper'>
                        <div className='header__leftside'>
                            <Link to='/'><div className='logo'>Liba_</div></Link>
                        </div>
                        <div className='header__rightside'>
                            <FontAwesomeIcon icon={faUser} className='userIcon' onClick={() => setAuthModalOpen(true)}/>
                        </div>
                    </div>
                </div>
            </header>
            {authModalOpen &&
                <LibaModal 
                headerType='custom' 
                customHeaderContent={headerContent} 
                closeHandler={() => setAuthModalOpen(false)} 
                actionHandler={authTabType === 'reg'? registration : () => {}} 
                actionName={authTabType === 'reg' ? 'Signup' : 'Login'} 
                isWide>
                    {authTabType === 'reg' ?
                        <div className='authBodyWrapper'>
                            <LibaInput inputName='Username' value={authForm.username} changeFunction={(e) => setAuthForm({...authForm, username: e.target.value})}/>
                            <LibaInput inputName='Password' value={authForm.password} changeFunction={(e) => setAuthForm({...authForm, password: e.target.value})}/>
                        </div>
                        :
                        <div className='authBodyWrapper'>
                            <LibaInput inputName='Username' value={authForm.username} changeFunction={(e) => setAuthForm({...authForm, username: e.target.value})}/>
                            <LibaInput inputName='Password' value={authForm.password} changeFunction={(e) => setAuthForm({...authForm, password: e.target.value})}/>
                        </div>
                    }
                </LibaModal>
            }
        </>
        
    )
}

export default Header;