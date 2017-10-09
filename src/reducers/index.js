"use strict"
import {combineReducers} from 'redux';

// HERE IMPORT REDUCERS TO BE COMBINED
import {activePollReducer} from './activepollreducer';
import {pollReducer} from './pollreducer';

//HERE COMBINE THE REDUCERS
export default combineReducers({
  pollsCombo: pollReducer,
  activeCombo: activePollReducer
})
