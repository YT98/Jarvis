import { combineReducers } from 'redux';
import activeAppReducer from './activeAppReducer';

const rootReducer = combineReducers({
    activeAppReducer: activeAppReducer
});

export default rootReducer;