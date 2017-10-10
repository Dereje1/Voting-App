"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Grid,Col,Row,Button} from 'react-bootstrap'
import {deletePoll,updatePoll} from '../actions/pollactions';
import PollOptions from './optiondisplay'
import Pie from './d3-graphing/piechart';
import BarChart from './d3-graphing/barchart';

class Display extends React.Component{
  constructor(props){
    super(props)
    this.state={
      selectedOption:"Choose an Option",
      activePoll:""
    }
  }
  componentDidMount(){
    this.setState({
      activePoll: JSON.parse(localStorage.getItem('activePoll'))
    })
  }
  processVote(){
    //console.log("Ready to Process Vote for " , this.state.activePoll)
    let stateCopy = JSON.parse(JSON.stringify(this.state.activePoll))

    let indexOfOption = stateCopy.options.findIndex((option)=>{
      return (this.state.selectedOption===option[0])
    })
    if(indexOfOption===-1){return}
    stateCopy.options[indexOfOption][1]++
    let readyToUpdate={
      _id:this.state.activePoll._id,
      options:stateCopy.options
    }
    this.props.updatePoll(readyToUpdate)
    this.setState({
      activePoll:stateCopy
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
      return (
        <Grid >
          <Row className="text-center" style={{"marginTop":"25px"}}>
            <Col xs={12}><h1>{this.state.activePoll.title}</h1></Col>
          </Row>
          <Row className="text-center">
            <Col xs={12} md={6}>
              <PollOptions
                opts = {this.state.activePoll.options}
                comboSelection={this.state.selectedOption}
                onSelect={this.handleSelection.bind(this)}
                />
              <Button className="btn btn-primary"
               onClick = {this.processVote.bind(this)}
              >Vote For {this.state.selectedOption} </Button>
            </Col>
            <Col xs={12} md={6}>
              <Pie data={this.state.activePoll.options}/>
              <Button block className="btn btn-danger" onClick={()=>this.handelePollDelete()}>Delete Poll</Button>
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
