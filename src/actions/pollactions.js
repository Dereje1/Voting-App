"use strict"
import axios from 'axios';

export function addPoll(pollObject){
  return function(dispatch){
    axios.post('api/polls',pollObject)
      .then(function(response){
        dispatch(
            {
              type:"ADD_POLL",
              payload:response.data
            }
          )
        })
      .catch(function(err){
        dispatch({type:"ADD_POLL_REJECTED",payload:err})
      })
    }
  }

export function getPolls(){
  return function(dispatch){
    axios.get('api/polls')
      .then(function(response){
        dispatch(
            {
              type:"GET_ALL_POLLS",
              payload:response.data
            }
          )
        })
      .catch(function(err){
        dispatch({type:"GET_POLLS_REJECTED",payload:err})
      })
    }
  }

export function deletePoll(pollid){
  return function(dispatch){
    axios.delete('api/polls/'+pollid)
      .then(function(response){
        dispatch(
            {
              type:"DELETE_POLL",
              payload:pollid
            }
          )
        })
      .catch(function(err){
        dispatch({type:"DELETE_POLL_REJECTED",payload:err})
      })
    }
  }

// UPDATE Poll
export function updatePoll(pollToUpdate){
  return function(dispatch){
  axios.put("api/polls/"+pollToUpdate._id,pollToUpdate)
    .then(function(response){
      dispatch({type:"UPDATE_POLL",payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"UPDATE_POLL_REJECTED",payload: err})
    })
  }
}
