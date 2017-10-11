"use strict"
import React from 'react'
import {Nav, NavItem, Navbar, Button} from 'react-bootstrap';

class Menu extends React.Component{
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
            <Button className="btn btn-primary" style={{"marginTop":"5px"}} href="/auth/twitter">Sign In With Twitter</Button>
            <Button className="btn btn-primary" style={{"marginTop":"5px"}} href="/logout">Logout</Button>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
  }
}

export default Menu
