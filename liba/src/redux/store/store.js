import { createStore, combineReducers } from 'redux';
import { countOfResourcesReducer } from '../reducers/countOfResourcesReducer';

const rootReducer = combineReducers({
    resourcesCount: countOfResourcesReducer,
})

export const store = createStore(rootReducer);