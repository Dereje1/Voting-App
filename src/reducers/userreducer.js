"use strict"//reducer simply returns user status
export function userStatusReducer(state={user:[]},action){
  switch (action.type) {
    case "GET_USER_STATUS":
      return {user: action.payload};
      break;
  }
  return state
}
