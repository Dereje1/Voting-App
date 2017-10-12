"use strict"
import React from 'react'
import {DropdownButton,ButtonToolbar,MenuItem} from 'react-bootstrap'


class PollOptions extends React.Component{
  render(){
    let optionsList = this.props.opts.map((o,idx)=>{
      return(
        <MenuItem key={idx} eventKey={idx}>{o[0]}</MenuItem>
      )
    })
    return(
          <DropdownButton bsSize="large" title={this.props.comboSelection} id="dropdown-size-large" onSelect={this.props.onSelect}>
            {optionsList}
          </DropdownButton>
    )
  }
}

export default PollOptions
