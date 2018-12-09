import authReducer from './authReducer'
import contactReducer from './contactReducer'
import groupReducer from './groupReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    family: contactReducer,
    group: groupReducer
})

export default rootReducer