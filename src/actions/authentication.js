"use strict"
import axios from 'axios';

export function getUser(){
  return function (dispatch){
    axios.get('/profile')
      .then(function(response){
          dispatch(
              {
                type:"GET_USER_STATUS",
                payload:response.data
              }
            )
        })
      .catch(function(err){
        dispatch({type:"GET_USER_STATUS_REJECTED",payload:err})
      })
    }
}
