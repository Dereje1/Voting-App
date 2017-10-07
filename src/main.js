"use strict"
import React from 'react';
import Menu from './components/menu'
import Footer from './components/footer'
class Main extends React.Component{
    render(){
      return (
        <div>
          <Menu/>
            {this.props.children}
          <Footer />
        </div>
      )
    }
}

export default Main
