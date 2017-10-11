"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {Nav, NavItem, Navbar, Button} from 'react-bootstrap';

class Menu extends React.Component{

  conditionalNav(){
    if(this.props.user.user){//the way response comes of user is in string I can change this to JSON response in the future
      return(<NavItem href="/logout">Logout @ {this.props.user.user.username}</NavItem>)
    }
    else{
      return (<NavItem href="/auth/twitter">Sign In With Twitter</NavItem>)
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
            <NavItem eventKey={1} href="/test">About</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/newpoll">New Poll</NavItem>
            <NavItem eventKey={1} href="/">Home</NavItem>
            {this.conditionalNav()}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
  }
}
function mapStateToProps(state){
  return state
}
export default connect(mapStateToProps)(Menu)
