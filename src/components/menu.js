"use strict"
import React from 'react'
import {connect} from 'react-redux'
import {Nav, NavItem, Navbar, Button} from 'react-bootstrap';

class Menu extends React.Component{

  conditionalNav(){
    if(typeof(this.props.user.user)=='string'){//the way response comes of user is in string I can change this to JSON response in the future
      let username = JSON.parse(this.props.user.user).user.twitter.username
      return(<NavItem href="/logout">Logout @ {username}</NavItem>)
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
            <NavItem eventKey={1} href="/">About</NavItem>
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
