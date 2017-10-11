"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {getUser} from '../actions/authentication';

class Test extends React.Component{
  componentDidMount(){
    this.props.getUser()
  }
  render(){
    return(<h1>Testing</h1>)
  }
}

function mapStateToProps(state){
  return state
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
          getUser:getUser
          }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Test)
