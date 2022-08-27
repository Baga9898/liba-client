const defaultState = {
    currentUser: {},
    isAuth: false,
}

export const userReducer = (state = defaultState, action: {type: string, payload: number}) => {
    switch (action.type) {
        case '':
            
            break;
    
        default:
            return state;
    }
}