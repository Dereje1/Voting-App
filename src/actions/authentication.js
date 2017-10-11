"use strict"
import axios from 'axios';

export function getUser(){
  return function (dispatch){
    axios.get('/profile')
      .then(function(response){
        if (response.request.response === "Not Authenticated"){
          dispatch(
              {
                type:"GET_USER_STATUS",
                payload:false
              }
            )
        }
        else{
          dispatch(
              {
                type:"GET_USER_STATUS",
                payload:{
                          full: response.request.response,
                          username: JSON.parse(response.request.response).user.twitter.username
                }
              }
            )
        }
        })
      .catch(function(err){
        dispatch({type:"GET_USER_STATUS_REJECTED",payload:err})
      })
    }
}
