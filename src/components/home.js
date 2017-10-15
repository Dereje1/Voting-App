"use strict"//displays a curated list of all the polls / user created polls
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router'; //need for redirecting user
import {Grid,Col,Row,ListGroup,ListGroupItem} from 'react-bootstrap'

import {getPolls} from '../actions/pollactions';

class Home extends React.Component{
  constructor(props){
    super(props)

    this.buildPolls = this.buildPolls.bind(this)
    this.goToPoll = this.goToPoll.bind(this)
  }
  componentDidMount(){
    console.log("CDM Mounted for home")
    if(this.props.foruser){//retrieves only polls created by the user
      this.props.getPolls(this.props.foruser)
    }
    else{//retrieves all polls
      this.props.getPolls()
    }
  }
  goToPoll(poll){//goest to a specific poll clicked by user
    browserHistory.push({ pathname: '/display', query: { singlepoll: poll._id } })
  }

  buildPolls(){
    //create a ListGroup of all the polls for react to render
    var pollsList = this.props.pollsCombo.polls.map((pollsObj)=>{//map does not preserve 'this' unless you use arrow function alternatively pass as second arg to map
      let totalVotes = pollsObj.options.reduce(function(acc,curr){
        return acc+curr[1]
      },0)//total votes , note initialzation of 0, important!
      return(
        <ListGroupItem key={pollsObj._id} header={pollsObj.title} onClick={()=>this.goToPoll(pollsObj)}>Created: @{pollsObj.created} , Total Votes: {totalVotes} </ListGroupItem>
      )
    })
    return pollsList
  }
  render(){
    return (
      <Grid >
        <Row style={{"marginTop":"25px"}}>
          <Col xs={8} xsOffset={2}>
            <ListGroup>{this.buildPolls()}</ListGroup>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state){
  return state
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
          getPolls:getPolls
          }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)
