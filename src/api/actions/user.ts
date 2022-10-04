import axios, { AxiosError } from 'axios';
import { setUser } from '../../redux/reducers/userReducer';
import { showNHideNotification } from '../../utils/helpers';

export const verification = () => {
    return async (dispatch: any) => {
        try {
            await axios.get('http://localhost:5000/auth/auth/', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            .then((response) => {
                dispatch(setUser(response.data.user));
                localStorage.setItem('token', response.data.token);
            })
        } catch (error) {
            console.error(error);
            localStorage.removeItem('token');
        }
    }
}

export const registration = async(
    authForm: any,
    setNotificationStatus: (status: string) => void, 
    setNotificationText: (message: string) => void, 
    setNotificationIsOpen: (isOpen: boolean) => void,
    setAuthTabType: (tabType: string) => void,
    setAfterAuth: (afterAuth: boolean) => void,
    setRegisterUser: (user: any) => void,
    setDefaultAuthForm: (defaultForm: any) => void,
    setAuthForm: (form: any) => void
) => {
    try {
        await axios.post('http://localhost:5000/auth/registration/', {
            ...authForm,
        }).then((response) => {
            showNHideNotification(
                'success', 
                response.data.message,
                setNotificationStatus, 
                setNotificationText, 
                setNotificationIsOpen,
            );
            setAuthTabType('auth');
            setAfterAuth(true);
            setRegisterUser(response.data.user);
            setDefaultAuthForm(setAuthForm);
        })
    } catch (error) {
        const err = error as AxiosError;
        console.error(error);
        err.response && showNHideNotification(
            'error', 
            err.response.data.message,
            setNotificationStatus, 
            setNotificationText, 
            setNotificationIsOpen,
        );
    }
}

export const authorization = (
    authForm: any,
    setNotificationStatus: (status: string) => void, 
    setNotificationText: (message: string) => void, 
    setNotificationIsOpen: (isOpen: boolean) => void,
    setAfterAuth: (afterAuth: boolean) => void,
    setDefaultAuthForm: (defaultForm: any) => void,
    setAuthModalOpen: (isOpen: boolean) => void,
    setAuthForm: (form: any) => void
) => {
    return async (dispatch: any) => {
        try {
            await axios.post('http://localhost:5000/auth/login/', {
                ...authForm,
            }).then((response) => {
                showNHideNotification(
                    'success', 
                    response.data.message,
                    setNotificationStatus, 
                    setNotificationText, 
                    setNotificationIsOpen,
                );
                dispatch(setUser(response.data.user));
                localStorage.setItem('token', response.data.token);
            })
        } catch (error) {
            const err = error as AxiosError;
            console.error(error);
            err.response && showNHideNotification(
                'error', 
                err.response.data.message,
                setNotificationStatus, 
                setNotificationText, 
                setNotificationIsOpen,
            );
        }
        setAfterAuth(false);
        setAuthModalOpen(false);
        setDefaultAuthForm(setAuthForm);
    }
}