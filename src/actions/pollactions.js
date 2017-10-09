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

  export function getActivePoll(pollid){
    return function(dispatch){
      axios.get('api/polls/'+pollid)
        .then(function(response){
          dispatch(
              {
                type:"GET_POLL",
                payload:response.data
              }
            )
          })
        .catch(function(err){
          dispatch({type:"GET_SINGLE_POLL_REJECTED",payload:err})
        })
      }
    }
    export function setActivePoll(pollid){
      return function(dispatch){
        axios.post('api/active/',pollid)
          .then(function(response){
            dispatch(
                {
                  type:"GET_POLL",
                  payload:response.data
                }
              )
            })
          .catch(function(err){
            dispatch({type:"SET_SINGLE_POLL_REJECTED",payload:err})
          })
        }
      }
