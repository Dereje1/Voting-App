"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Grid,Col,Row,ListGroup,ListGroupItem} from 'react-bootstrap'
import {getPolls,setActivePoll} from '../actions/pollactions';
import {Router, Route, IndexRoute,browserHistory} from 'react-router';

class Home extends React.Component{
  constructor(props){
    super(props)

    this.buildPolls = this.buildPolls.bind(this)
    this.goToPoll = this.goToPoll.bind(this)
  }
  componentDidMount(){
    this.props.getPolls()
  }
  goToPoll(poll){
    console.log(poll + " Just got clicked")
    this.props.setActivePoll({
      active: poll
    })
    browserHistory.push('/display');
  }

  buildPolls(){
    var pollsList = this.props.pollsCombo.polls.map((pollsObj)=>{//map does not preserve 'this' unless you use arrow function alternatively pass as second arg to map
      let totalVotes = pollsObj.options.reduce(function(acc,curr){
        return acc+curr[1]
      },0)
      return(
        <ListGroupItem key={pollsObj._id} header={pollsObj.title} onClick={()=>this.goToPoll(pollsObj._id)}>Total Votes: {totalVotes} </ListGroupItem>
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
          getPolls:getPolls,
          setActivePoll:setActivePoll
          }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)
