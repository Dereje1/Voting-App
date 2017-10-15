"use strict" //a dumb component just renders the home component with user info
import React from 'react';
import Home from './home';
import {connect} from 'react-redux'

class Mypolls extends React.Component {

  render() {
    if(this.props.user.user.length!==0){
      return(<Home foruser={this.props.user.user.username}/>)
    }
    else{
      return(<div></div>)
    }

  }
}

function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps)(Mypolls)
