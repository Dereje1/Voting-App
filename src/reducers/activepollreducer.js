"use strict"
export function activePollReducer(state={active:[]},action){
  switch (action.type) {
    case "GET_POLL":
      return {active: [action.payload]};
      break;
  }
  return state
}
