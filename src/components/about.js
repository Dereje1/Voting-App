"use strict"//dumb Component about page
import React from 'react'
import { Button,Modal,Table} from 'react-bootstrap'//not modal shows warnings in console should be fixed with next update

class About extends React.Component{
  constructor(props) {
    super(props)
    //initialize modal state and assign params on open
    this.state={
      show:true
    }
  }
  open(){
    //when modal is opened note edit info coming from the props of this class as an array
    //of the ingredients and recipe name for active recipe
    this.setState({
      show:true
    })
  }
  close(){
    //when modal is closed reset back to original state
    this.setState({
      show: false
    },this.props.router.push('/'));
  }
  render(){
    return(
      <Modal
        show={this.state.show}
        onHide={this.close.bind(this)}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Voting App</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Coded by <a href="https://www.freecodecamp.com/dereje1" target="_blank">DGetahun</a> with JavaScript.</h5>
          <br></br>
          <Table responsive>
              <thead>
                <tr>
                  <th>Front End</th>
                  <th>Back End</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>React / Redux</td>
                  <td> Express / Node.js</td>
                </tr>
                <tr>
                  <td>D3.js</td>
                  <td>Mongoose / Mongodb</td>
                </tr>
                <tr>
                  <td>React-Bootstrap</td>
                  <td>Passport.js</td>
                </tr>
              </tbody>
            </Table>
          <h5> Data Sources:</h5>
          <ul>
            <li>Poll Sample/Initializer - <a href="https://hackernoon.com/5-best-javascript-frameworks-in-2017-7a63b3870282" target="_blank">5 Best JavaScript Frameworks in 2017</a></li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <h6 className="pull-left">Source Code @ <a href="https://github.com/Dereje1/Voting-App" target="_blank">Github</a></h6>
          <Button onClick={this.close.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>

    )
  }
}

export default About
