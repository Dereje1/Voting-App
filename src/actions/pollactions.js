"use strict"

export function addPoll(pollObject){
  return(
    {
      type:"ADD_POLL",
      payload:pollObject
    }
  )
}
