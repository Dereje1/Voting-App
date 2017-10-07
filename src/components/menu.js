"use strict"
import React from 'react'
import {Nav, NavItem, Navbar} from 'react-bootstrap';

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
            <NavItem eventKey={1} href="/">ADMIN</NavItem>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
  }
}

export default Menu
