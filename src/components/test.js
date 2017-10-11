"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {getUser} from '../actions/authentication';
import { Button,Grid,Col,Row,Jumbotron} from 'react-bootstrap'
import axios from 'axios'

class Test extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ip:""
    }
  }
  componentDidMount() {
    axios.get("https://freegeoip.net/json/")
      .then(function(response){
        this.setState({
          ip: response.data.ip
        });
      }.bind(this))
      .catch(function(err){
        this.setState({
          ip: err
        });
      }.bind(this))
  }

  render(){
    return(
      <Grid>
        <Row style={{"marginTop":"25px"}}>
          <Col xs={8} xsOffset={2} className="text-center">
            <h1>{this.state.ip}</h1>
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
          getUser:getUser
          }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Test)
