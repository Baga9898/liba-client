import axios from 'axios';
import { setUser } from '../../redux/reducers/userReducer';

export const verification = () => {
    return async (dispatch) => {
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