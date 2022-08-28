import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

import LibaModal from './../utils/libaModal/LibaModal';
import LibaInput from './../utils/libaInput/libaInput';
import LibaNotification from '../utils/libaNotification/LibaNotification';
import axios, { AxiosError } from 'axios';

import './header.scss';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/reducers/userReducer';
import { logout } from './../../redux/reducers/userReducer';

const Header = () => {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authTabType, setAuthTabType] = useState('reg');
    const [afterAuth, setAfterAuth] = useState(false);
    const [authForm, setAuthForm] = useState({
        username: '',
        password: '',
    });

    const [registerUser, setRegisterUser] = useState('');
    const isAuth = useSelector((state: RootStateOrAny) => state.user.isAuth);
    const user = useSelector((state: RootStateOrAny) => state.user.currentUser)
    const dispatch = useDispatch();

    const [notificationStatus, setNotificationStatus] = useState<string>('success');
    const [notificationIsOpen, setNotificationIsOpen] = useState(false);
    const [notificationText, setNotificationText] = useState('');


    const headerContent = (
        <div className='authHeader'>
            <button onClick={() => setAuthTabType('reg')} className={authTabType === 'reg' ? 'activeButton' : ''}>Registration</button>
            <p>/</p>
            <button onClick={() => setAuthTabType('auth')} className={authTabType === 'auth' ? 'activeButton' : ''}>Authorization</button>
            <FontAwesomeIcon icon={faTimes} className='authModal__header_closeButton' onClick={() => setAuthModalOpen(false)} />
        </div>
    );

    const showNHideNotification = (status: string, message: string) => {
        setNotificationStatus(status);
        setNotificationText(message);
        setNotificationIsOpen(true);
        setTimeout(() => {
            setNotificationIsOpen(false);
        }, 3000);
    }

    const setDefaultAuthForm = () => {
        setAuthForm({
            username: '',
            password: '',
        });
    }

    const registration = async() => {
        try {
            await axios.post('http://localhost:5000/auth/registration/', {
                ...authForm,
            }).then((response) => {
                showNHideNotification('success', response.data.message);
                setAuthTabType('auth');
                setAfterAuth(true);
                setRegisterUser(response.data.user);
                setDefaultAuthForm();
            })
        } catch (error) {
            const err = error as AxiosError;
            console.error(error);
            err.response && showNHideNotification('error', err.response.data.message);
        }
    }

    const authorization = () => {
        return async (dispatch: any) => {
            try {
                await axios.post('http://localhost:5000/auth/login/', {
                    ...authForm,
                }).then((response) => {
                    showNHideNotification('success', response.data.message);
                    dispatch(setUser(response.data.user));
                    localStorage.setItem('token', response.data.token);
                })
            } catch (error) {
                const err = error as AxiosError;
                console.error(error);
                err.response && showNHideNotification('error', err.response.data.message);
            }
            setAfterAuth(false);
            setAuthModalOpen(false);
            setDefaultAuthForm();
        }
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
                            {isAuth ? 
                            <>
                                <span>{user.username}</span>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} className='logoutIcon' onClick={() => dispatch(logout())}/>
                            </>
                            : 
                            <FontAwesomeIcon icon={faUser} className='userIcon' onClick={() => setAuthModalOpen(true)}/>
                            }
                        </div>
                    </div>
                </div>
            </header>
            {authModalOpen &&
                <LibaModal 
                headerType='custom' 
                customHeaderContent={headerContent} 
                closeHandler={() => setAuthModalOpen(false)} 
                actionHandler={authTabType === 'reg'? registration : () => dispatch(authorization())} 
                actionName={authTabType === 'reg' ? 'Signup' : 'Login'} 
                isWide>
                    {afterAuth &&
                        <h3>Welcome <span>{registerUser}</span> please login</h3>
                    }
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
            {notificationIsOpen && 
                <LibaNotification  closeHandler={() => setNotificationIsOpen(false)} status={notificationStatus}>
                    <p className='libaNotification__body_text'>{notificationText}</p>
                </LibaNotification>
            }
        </>
        
    )
}

export default Header;