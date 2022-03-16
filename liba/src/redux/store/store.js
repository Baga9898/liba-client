import { createStore, combineReducers } from 'redux';
import { countOfResourcesReducer } from '../reducers/countOfResourcesReducer';
import { allCategoriesMenuIsOpenReducer } from '../reducers/allCategoriesMenuReducer';

const rootReducer = combineReducers({
    resourcesCount: countOfResourcesReducer,
    categoriesMenu: allCategoriesMenuIsOpenReducer,
})

export const store = createStore(rootReducer);