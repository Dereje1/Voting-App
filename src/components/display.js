"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Grid,Col,Row,Button,Well} from 'react-bootstrap'
import axios from 'axios'
import {deletePoll,updatePoll,getPolls} from '../actions/pollactions';
import PollOptions from './optiondisplay'
import Pie from './d3-graphing/piechart';

class Display extends React.Component{
  constructor(props){
    super(props)
    this.state={
      selectedOption:"Choose an Option",
      justVoted:false
    }
  }
  componentDidMount(){
    this.props.getPolls("?singlepoll="+this.props.location.query.singlepoll)
    console.log("CDM",this.props.pollsCombo)
  }
  checkipVote(){
    let votedAlready;

    if(this.props.pollsCombo.polls[0].voted.includes(this.props.user.user.userip)){
      votedAlready = true;
    }
    else if(this.props.pollsCombo.polls[0].voted.includes(this.props.user.user.username)){
      votedAlready = true;
    }
    else if (this.state.justVoted) {
      votedAlready = true;
    }
    else{
      votedAlready = false;
    }

    return votedAlready
  }
  processVote(){

    let activePoll = this.props.pollsCombo.polls[0]

    if(this.checkipVote()){return;}
    console.log(activePoll)

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
      _id:activePoll._id,
      options:stateCopy.options,
      voted:stateCopy.voted
    }
    this.props.updatePoll(readyToUpdate)
    this.setState({
      justVoted:true
    })
  }
  handleSelection(e){
    let stateCopy = {...this.props.pollsCombo.polls[0]}
    this.setState({
      selectedOption: stateCopy.options[e][0]
    })
  }
  handelePollDelete(e){
    this.props.deletePoll(this.props.pollsCombo.polls[0]._id)
    this.props.router.push('/');
  }

  render(){
    console.log(this.props)
    if(this.props.pollsCombo.polls.length){
      if(this.props.pollsCombo.polls[0]._id===this.props.location.query.singlepoll){
        console.log(this.props.pollsCombo.polls[0]._id===this.props.location.query.singlepoll)
        let activePoll = this.props.pollsCombo.polls[0]
        let totalVotes = activePoll.options.reduce(function(acc,curr){
          return acc+curr[1]
        },0)
        let voteButtonState= (this.checkipVote()) ? true : false
        let deleteButtonState = (this.props.user.user.username === activePoll.created) ? false : true
        let voteButtonDescription = (voteButtonState) ? "User / IP already Voted" : "Vote For " + this.state.selectedOption
        voteButtonDescription = (voteButtonDescription === "Vote For Choose an Option") ? "Choose an Option" : voteButtonDescription
        let deleteButtonDescription = (deleteButtonState) ? "Must be an owner to Delete Poll" : "Delete Poll"
        return (
          <Grid >
            <Row className="text-center" style={{"marginTop":"25px"}}>
              <Col xs={12}>
                <Well>
                  <h1 style={{'fontFamily':'Oswald'}}>{activePoll.title}</h1>
                  <h5 style={{'fontFamily':'Oswald'}}>{totalVotes} Votes Cast</h5>
                </Well>
              </Col>
            </Row>
            <Row className="text-center">
              <Col xs={12} md={6}>
                <PollOptions
                  opts = {activePoll.options}
                  comboSelection={this.state.selectedOption}
                  onSelect={this.handleSelection.bind(this)}
                  />
                <Button block className="btn btn-primary" disabled={voteButtonState}
                 style={{"marginTop":"25px"}}
                 onClick = {this.processVote.bind(this)}
                >{voteButtonDescription} </Button>
              </Col>
              <Col className="piearea" xs={12} md={6}>
                <Pie data={activePoll.options}/>
                <Button block className="btn btn-danger" disabled={deleteButtonState} onClick={()=>this.handelePollDelete()}>{deleteButtonDescription}</Button>
              </Col>
            </Row>
          </Grid>
        )
      }
    }
    else{
      return(<div className="text-center">Processing Poll!!</div>)
    }

  }
}

function mapStateToProps(state){
  return state
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
          getPolls:getPolls,
          deletePoll:deletePoll,
          updatePoll:updatePoll
          }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Display)
