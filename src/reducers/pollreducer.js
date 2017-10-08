"use strict"
export function pollReducer(state={polls:[]},action){
  switch (action.type) {
    case "ADD_POLL":
      //must redeclare everything as brand new!!
      let allPolls =  [...state.polls]
      return {polls: [...allPolls,action.payload]};
      break;
  }
  return state
}
