"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Grid,Col,Row} from 'react-bootstrap'
import {getActivePoll} from '../actions/pollactions';

class Display extends React.Component{


  render(){
    if(this.props.activeCombo.active[0]){
      let activeID = this.props.activeCombo.active[0].active
      let activePoll = this.props.pollsCombo.polls.filter(function(p){
        return (p._id===activeID)
      })
      return (
        <Grid >
          <Row className="text-center" style={{"marginTop":"25px"}}>
            <Col xs={12}><h1>{activePoll[0].title}</h1></Col>
          </Row>
          <Row>
            <Col xs={8} xsOffset={2}>
            </Col>
          </Row>
        </Grid>
      )
    }
    else{
      return(<h1>Waiting on Data</h1>)
    }

  }
}

function mapStateToProps(state){
  return state
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
          getActivePoll:getActivePoll
          }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Display)
