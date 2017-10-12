"use strict"
import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {getUser} from './actions/authentication';
import Home from './components/home';
import Menu from './components/menu'
class Main extends React.Component{
  componentDidMount(){
    console.log("CDM Mounted for Main")
    this.props.getUser()
  }
    render(){
      return (
        <div>
          <Menu/>
            {this.props.children}
        </div>
      )
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
export default connect(mapStateToProps,mapDispatchToProps)(Main)
