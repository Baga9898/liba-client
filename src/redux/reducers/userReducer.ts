const defaultState = {
    currentUser: {},
    isAuth: false,
}

const SET_USER = 'SET_USER';

export const userReducer = (state = defaultState, action: {type: string, payload: number}) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true, 
            }
        default:
            return state;
    }
}

export const setUser = (user: any) => ({type: SET_USER, payload: user});