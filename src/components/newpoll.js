"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {FormControl, FormGroup, Button, ControlLabel,Grid,Col,Row} from 'react-bootstrap'
import {getPolls,addPoll} from '../actions/pollactions'
import Login from './login'

class PollForm extends React.Component{

    constructor(props){
      super(props)

      this.handleNewPoll = this.handleNewPoll.bind(this)
    }
    componentDidMount(){
      this.props.getPolls()
    }
    handleNewPoll(){

      let pTitle = findDOMNode(this.refs.title).value.trim()
      let pOptions = findDOMNode(this.refs.options).value.split('\n')
      pOptions = pOptions.filter(function(o){
        return (o.trim()!=="")
      })
      //return option as a 2-dim array [optionname,val=0]
      let pOptionsMapped = pOptions.map(function(p){
        return [p,0]
      })
      if (!pTitle.length || !pOptions.length){return}
      let pollObject ={}
      pollObject.title = pTitle
      pollObject.options = pOptionsMapped
      pollObject.created = this.props.user.user.username
      pollObject.vote=[]
      this.props.addPoll(pollObject)
      this.props.router.push('/');
    }
    render(){
      if(this.props.user.user.authenticated){
        return(
              <Grid>
                <Row>
                  <Col xs={8} xsOffset={2}>
                    <div className="text-center">
                      <h3> Create New Poll </h3>
                    </div>
                    <FormGroup controlId="formControlsTitle" type="text" >
                      <ControlLabel>Title</ControlLabel>
                      <FormControl ref="title" placeholder="Enter Title for the Poll"/>
                    </FormGroup>
                    <FormGroup controlId="formControlsOptions" type="text" >
                      <ControlLabel>Options</ControlLabel>
                      <textarea className="form-control" rows="5" ref="options" placeholder="List options separated by new lines"></textarea>
                    </FormGroup>
                    <Button block bsStyle="warning" type="submit" onClick={this.handleNewPoll}>Create</Button>
                  </Col>
                </Row>
              </Grid>
            )
        }
        else{
          return(<Login/>)
        }
  }
}

function mapStateToProps(state){
  return state
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
          getPolls:getPolls,
          addPoll:addPoll
          }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(PollForm)
