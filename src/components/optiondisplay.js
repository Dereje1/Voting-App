"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {DropdownButton,ButtonToolbar,MenuItem} from 'react-bootstrap'


class PollOptions extends React.Component{
  render(){

    let optionsList = this.props.opts.map((o,idx)=>{
      return(
        <MenuItem key={idx} eventKey={idx}>{o[0]}</MenuItem>
      )
    })
    if(this.props.user.user.authenticated){
      optionsList.push(<MenuItem key={optionsList.length} eventKey={optionsList.length}>Add an Option</MenuItem>)
    }
    return(
          <DropdownButton bsSize="large" title={this.props.comboSelection} id="dropdown-size-large" onSelect={this.props.onSelect}>
            {optionsList}
          </DropdownButton>
    )
  }
}

function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps)(PollOptions)
