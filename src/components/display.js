"use strict"
import React from 'react'
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Grid,Col,Row,Button,Well,FormGroup,ControlLabel,FormControl} from 'react-bootstrap'
import axios from 'axios'
import {deletePoll,updatePoll,getPolls} from '../actions/pollactions';
import PollOptions from './optiondisplay'
import Pie from './d3-graphing/piechart';

class Display extends React.Component{
  constructor(props){
    super(props)
    this.state={
      selectedOption:"Choose an Option",
      justVoted:false,
      addOptionField:"hidden"
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
    let stateCopy = JSON.parse(JSON.stringify(this.props.pollsCombo.polls[0]))
    if(this.checkipVote()){return;}
    if(this.state.selectedOption!=="Add an Option"){

        let indexOfOption = stateCopy.options.findIndex((option)=>{
          return (this.state.selectedOption===option[0])
        })
        if(indexOfOption===-1){return}
        stateCopy.options[indexOfOption][1]++
    }
    else{
      let newOption = findDOMNode(this.refs.addedoption).value.trim()
      stateCopy.options.push([newOption,1])
    }

    if(this.props.user.user.userip!=="local"){
      stateCopy.voted.push(this.props.user.user.userip)
    }
    if(this.props.user.user.username){stateCopy.voted.push(this.props.user.user.username)}
    let readyToUpdate={
      _id:stateCopy._id,
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
    if(e<stateCopy.options.length){
      this.setState({
        selectedOption: stateCopy.options[e][0],
        addOptionField:"hidden"
      })
    }
    else{
      this.setState({
        selectedOption: "Add an Option",
        addOptionField:"visible"
      })
    }
  }
  handelePollDelete(e){
    this.props.deletePoll(this.props.pollsCombo.polls[0]._id)
    this.props.router.push('/');
  }
  tweetPoll(){
    let link = "http://twitter.com/home?status=" + "https://fcc-voting-app-dereje1.herokuapp.com/display?singlepoll=" + this.props.location.query.singlepoll
    window.open(link +"#Votingapp #freeCodeCamp")
  }
  render(){
    if(this.props.pollsCombo.polls.length){
      if(this.props.pollsCombo.polls[0]._id===this.props.location.query.singlepoll){
        let activePoll = this.props.pollsCombo.polls[0]
        let totalVotes = activePoll.options.reduce(function(acc,curr){
          return acc+curr[1]
        },0)
        let voteButtonState= (this.checkipVote()||this.state.justVoted) ? true : false

        let voteButtonDescription = (voteButtonState) ? "User / IP has already Voted" : "Vote For " + this.state.selectedOption
        voteButtonDescription = (voteButtonDescription === "Vote For Choose an Option") ? "" : voteButtonDescription

        let voteButtonVisibility= (voteButtonDescription === "") ? "hidden" : "visible"
        let deleteButtonVisibility = (this.props.user.user.username !== activePoll.created) ? "hidden" : "visible"
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
                <FormGroup controlId="formControlsText" style={{"marginTop":"25px","visibility":this.state.addOptionField}}>
                  <FormControl ref="addedoption" placeholder="Vote with my own option"/>
                </FormGroup>
                <Button block className="btn btn-warning" disabled={voteButtonState}
                 style={{"marginTop":"25px","fontSize":"25px","visibility":voteButtonVisibility}}
                 onClick = {this.processVote.bind(this)}
                >{voteButtonDescription} </Button>
                <Button block className="btn btn-primary"
                 style={{"marginTop":"25px"}}
                 onClick = {this.tweetPoll.bind(this)}
                ><span style={{"fontSize":"25px"}} className="fa fa-twitter social"/>  Tweet This Poll</Button>
              </Col>
              <Col className="piearea" xs={12} md={6}>
                <Pie data={activePoll.options}/>
                <Button block className="btn btn-danger" style={{"fontSize":"25px","visibility":deleteButtonVisibility}} onClick={()=>this.handelePollDelete()}>Delete Poll</Button>
              </Col>
            </Row>
          </Grid>
        )
      }
      else{
        return(<div className="text-center">Processing Poll!!</div>)
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
