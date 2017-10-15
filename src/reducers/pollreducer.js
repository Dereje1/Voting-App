"use strict"//CRUD for poll in the main store state
export function pollReducer(state={polls:[]},action){
  switch (action.type) {
    case "ADD_POLL":
      //must redeclare everything as brand new!!
      return {...state, polls: [...state.polls,action.payload]};
      break;
    case "GET_ALL_POLLS":
      //must redeclare everything as brand new!!
      return {...state, polls: [...action.payload]};
      break;
    case "DELETE_POLL":
      //must redeclare everything as brand new!!
      let pollCopy =  [...state.polls]
      let indexOfDeletion = pollCopy.findIndex(function(poll){
        return (poll._id===action.payload)
      })
      let pollRemoved = [...pollCopy.slice(0,indexOfDeletion),...pollCopy.slice(indexOfDeletion+1)]

      return (indexOfDeletion===-1) ? {polls: pollCopy} : {polls: pollRemoved};
      break;
    case "UPDATE_POLL":
      //must redeclare everything as brand new!!
      let pollToBeUpdated =  [...state.polls]
      let indexOfUpdate = pollToBeUpdated.findIndex(function(poll){
        return (poll._id===action.payload._id)
      })

      let pollsUpdated = [...pollToBeUpdated.slice(0,indexOfUpdate),action.payload,...pollToBeUpdated.slice(indexOfUpdate+1)]

      return {polls: pollsUpdated};
      break;
  }
  return state
}
