const defaultState = {
    categoriesMenuIsOpen: false,
    setCategoriesMenuIsOpen: null,
}

export const allCategoriesMenuIsOpenReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES_MENU_STATUS':
            return ({...state, categoriesMenuIsOpen: action.payload});

        case 'CHANGE_CATEGORIES_MENU_STATUS':
            return ({...state, setCategoriesMenuIsOpen: action.payload});
    
        default:
            return state;
    }
}