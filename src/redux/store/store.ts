import { createStore, combineReducers, applyMiddleware } from 'redux';
import { countOfResourcesReducer } from '../reducers/countOfResourcesReducer';
import { allCategoriesMenuIsOpenReducer } from '../reducers/allCategoriesMenuReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './../reducers/userReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    resourcesCount: countOfResourcesReducer,
    categoriesMenu: allCategoriesMenuIsOpenReducer,
    user: userReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));