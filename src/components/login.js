"use strict"//dumb component login page via twitter
import React from 'react'
import { Button,Grid,Col,Row,Jumbotron} from 'react-bootstrap'

class Login extends React.Component{
  render(){
    return(
      <Grid>
        <Row style={{"marginTop":"25px"}}>
          <Col xs={8} xsOffset={2} className="text-center">
            <Jumbotron>
              <h3>Authentication Required !</h3>
              <a href="/auth/twitter"><Button block bsStyle="primary">Login With Twitter</Button></a>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Login
