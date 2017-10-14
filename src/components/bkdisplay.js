"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Grid,Col,Row,Button,Well} from 'react-bootstrap'
import axios from 'axios'
import {deletePoll,updatePoll} from '../actions/pollactions';
import PollOptions from './optiondisplay'
import Pie from './d3-graphing/piechart';
import BarChart from './d3-graphing/barchart';

class Display extends React.Component{
  constructor(props){
    super(props)
    this.state={
      selectedOption:"Choose an Option",
      activePoll:"",
      hasVoted:false
    }
  }
  componentDidMount(){
    let pollObject = JSON.parse(localStorage.getItem('activePoll'));
    let votedAlready;

    if(pollObject.voted.includes(this.props.user.user.userip)){
      votedAlready = true;
    }
    else if(pollObject.voted.includes(this.props.user.user.username)){
      votedAlready = true;
    }
    else{
      votedAlready = false;
    }

    this.setState({
      activePoll: pollObject,
      hasVoted: votedAlready
    })
  }
  processVote(){
    //console.log("Ready to Process Vote for " , this.state.activePoll)
    if(this.state.hasVoted){return;}
    let stateCopy = JSON.parse(JSON.stringify(this.state.activePoll))

    let indexOfOption = stateCopy.options.findIndex((option)=>{
      return (this.state.selectedOption===option[0])
    })
    if(indexOfOption===-1){return}
    stateCopy.options[indexOfOption][1]++
    if(this.props.user.user.userip!=="local"){
      stateCopy.voted.push(this.props.user.user.userip)
    }
    if(this.props.user.user.username){stateCopy.voted.push(this.props.user.user.username)}
    let readyToUpdate={
      _id:this.state.activePoll._id,
      options:stateCopy.options,
      voted:stateCopy.voted
    }
    this.props.updatePoll(readyToUpdate)
    this.setState({
      activePoll:stateCopy,
      hasVoted:true
    })
  }
  handleSelection(e){
    let stateCopy = {...this.state.activePoll}
    this.setState({
      selectedOption: stateCopy.options[e][0]
    })
  }
  handelePollDelete(e){
    this.props.deletePoll(this.state.activePoll._id)
    this.props.router.push('/');
  }

  render(){
    if(this.state.activePoll!=""){
      let totalVotes = this.state.activePoll.options.reduce(function(acc,curr){
        return acc+curr[1]
      },0)
      let voteButtonState= (this.state.hasVoted) ? true : false
      let deleteButtonState = (this.props.user.user.username === this.state.activePoll.created) ? false : true
      let voteButtonDescription = (voteButtonState) ? "User / IP already Voted" : "Vote For " + this.state.selectedOption
      voteButtonDescription = (voteButtonDescription === "Vote For Choose an Option") ? "Choose an Option" : voteButtonDescription
      let deleteButtonDescription = (deleteButtonState) ? "Must be an owner to Delete Poll" : "Delete Poll"
      return (
        <Grid >
          <Row className="text-center" style={{"marginTop":"25px"}}>
            <Col xs={12}>
              <Well>
                <h1 style={{'fontFamily':'Oswald'}}>{this.state.activePoll.title}</h1>
                <h5 style={{'fontFamily':'Oswald'}}>{totalVotes} Votes Cast</h5>
              </Well>
            </Col>
          </Row>
          <Row className="text-center">
            <Col xs={12} md={6}>
              <PollOptions
                opts = {this.state.activePoll.options}
                comboSelection={this.state.selectedOption}
                onSelect={this.handleSelection.bind(this)}
                />
              <Button block className="btn btn-primary" disabled={voteButtonState}
               style={{"marginTop":"25px"}}
               onClick = {this.processVote.bind(this)}
              >{voteButtonDescription} </Button>
            </Col>
            <Col className="piearea" xs={12} md={6}>
              <Pie data={this.state.activePoll.options}/>
              <Button block className="btn btn-danger" disabled={deleteButtonState} onClick={()=>this.handelePollDelete()}>{deleteButtonDescription}</Button>
            </Col>
          </Row>
        </Grid>
      )
    }
    else{
      return(<h1>Problems with Local Storage!!</h1>)
    }

  }
}

function mapStateToProps(state){
  return state
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
          deletePoll:deletePoll,
          updatePoll:updatePoll
          }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Display)
