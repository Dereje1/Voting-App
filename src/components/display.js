"use strict" //component displays poll properties and allows voting/user interaction
import React from 'react'
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Grid,Col,Row,Button,Well,FormGroup,ControlLabel,FormControl} from 'react-bootstrap'

//other components that display needs
import {deletePoll,updatePoll,getPolls} from '../actions/pollactions';
import PollOptions from './optiondisplay'
import Pie from './d3-graphing/piechart';

class Display extends React.Component{
  constructor(props){
    super(props)
    this.state={
      selectedOption:"Choose an Option",
      justVoted:false,
      addOptionField:"hidden",
      fullBound:0
    }
  }
  componentDidMount(){
    //first get info of specific poll from store
    this.props.getPolls("?singlepoll="+this.props.location.query.singlepoll)
    this.setMinimumWindowWidth();
  }

  setMinimumWindowWidth(){
    let minBound = Math.min(window.innerWidth, window.innerHeight)
    this.setState({fullBound:minBound})
  }
  checkipVote(){//checks if current user/ip has already voted
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
  processVote(){//process a vote click
    //deep copy poll form store-->Avoid mutations at all cost!!!
    let stateCopy = JSON.parse(JSON.stringify(this.props.pollsCombo.polls[0]))
    if(this.checkipVote()){return;}//if already voted nothing else to do
    if(this.state.selectedOption!=="Add an Option"){//if voting with existing options
        //find option and modify copy
        let indexOfOption = stateCopy.options.findIndex((option)=>{
          return (this.state.selectedOption===option[0])
        })
        if(indexOfOption===-1){return}
        stateCopy.options[indexOfOption][1]++
    }
    else{ //if adding a new option
      let newOption = findDOMNode(this.refs.addedoption).value.trim()
      //add new option with 1 vote
      stateCopy.options.push([newOption,1])
    }

    if(this.props.user.user.userip!=="local"){//for development disregard logging local ip
      stateCopy.voted.push(this.props.user.user.userip)//log ip of voter
    }
    //log user name of voter
    if(this.props.user.user.username){stateCopy.voted.push(this.props.user.user.username)}
    //update store state
    let readyToUpdate={
      _id:stateCopy._id,
      options:stateCopy.options,
      voted:stateCopy.voted
    }
    this.props.updatePoll(readyToUpdate)
    //update component state
    this.setState({
      justVoted:true
    })
  }
  handleSelection(e){//handles combo box selection
    let stateCopy = {...this.props.pollsCombo.polls[0]}//since only changing component state and not tthe store mutation is less worrisome
    if(e<stateCopy.options.length){//for all options except add an option
      this.setState({
        selectedOption: stateCopy.options[e][0],
        addOptionField:"hidden"
      })
    }
    else{//for add an option
      this.setState({
        selectedOption: "Add an Option",
        addOptionField:"visible"
      })
    }
  }
  handelePollDelete(e){//deletes poll
    this.props.deletePoll(this.props.pollsCombo.polls[0]._id)
    this.props.router.push('/');// go back home
  }
  tweetPoll(){//tweets poll
    let link = "https://twitter.com/intent/tweet?url=" + "https://fcc-voting-app-dereje1.herokuapp.com/display?singlepoll=" + this.props.location.query.singlepoll
    window.open(link +"&hashtags=Votingapp,freeCodeCamp")
  }
  render(){
    //chained conditional rendering
    if(this.props.pollsCombo.polls.length){//first see is any poll is actually retrieved from db
      if(this.props.pollsCombo.polls[0]._id===this.props.location.query.singlepoll){//then make sure that the retrieved poll retrieved is the same as the one that was queried
        let activePoll = this.props.pollsCombo.polls[0]
        let totalVotes = activePoll.options.reduce(function(acc,curr){
          return acc+curr[1]
        },0)
        //set button states and what not for visual purposes and based on options
        let voteButtonState= (this.checkipVote()||this.state.justVoted) ? true : false

        let voteButtonDescription = (voteButtonState) ? "User / IP has already Voted" : "Vote For " + this.state.selectedOption
        voteButtonDescription = (voteButtonDescription === "Vote For Choose an Option") ? "" : voteButtonDescription
        voteButtonDescription = (voteButtonDescription === "Vote For Add an Option") ? "Vote For New Option" : voteButtonDescription

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
                 style={{"marginTop":"25px","marginBottom":"25px"}}
                 onClick = {this.tweetPoll.bind(this)}
                ><span style={{"fontSize":"25px"}} className="fa fa-twitter social"/>  Tweet This Poll</Button>
              </Col>
              <Col className="piearea" xs={12} md={6}>
                <Pie width={this.state.fullBound} data={activePoll.options}/>
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
