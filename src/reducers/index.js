"use strict"
import {combineReducers} from 'redux';

// HERE IMPORT REDUCERS TO BE COMBINED
import {userStatusReducer} from './userreducer';
import {pollReducer} from './pollreducer';

//HERE COMBINE THE REDUCERS
export default combineReducers({
  pollsCombo: pollReducer,
  user: userStatusReducer
})
