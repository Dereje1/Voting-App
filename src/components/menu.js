"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {Nav, NavItem, Navbar, Button} from 'react-bootstrap';

class Menu extends React.Component{

  conditionalNav(){
    if(this.props.user.user.authenticated){//the way response comes of user is in string I can change this to JSON response in the future
      return(
        <Nav pullRight>
          <NavItem eventKey={1} href="/newpoll">New Poll</NavItem>
          <NavItem eventKey={2} href="/mypolls">My Polls</NavItem>
          <NavItem eventKey={3} href="/">Home</NavItem>
          <NavItem eventKey={4} href="/logout">Logout @ {this.props.user.user.username}</NavItem>
        </Nav>
      )
    }
    else{
      return (
        <Nav pullRight>
          <NavItem eventKey={1} href="/newpoll">New Poll</NavItem>
          <NavItem eventKey={2} href="/">Home</NavItem>
          <NavItem eventKey={3} href="/auth/twitter">Sign In With Twitter</NavItem>
        </Nav>
      )
    }
  }

  render(){

    return(
    <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Voting App</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/about">About</NavItem>
          </Nav>
          {this.conditionalNav()}
        </Navbar.Collapse>
    </Navbar>
    )
  }
}
function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps)(Menu)
