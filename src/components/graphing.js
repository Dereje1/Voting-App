"use strict"
import React from 'react'

class Graph extends React.Component{

  tempresults(data){
    let votemapper= data.map((results,idx)=>{
      return (<li key={idx}>{results[0]} = {results[1]}</li>)
    })
    return (<ul>{votemapper}</ul>)
  }
  render(){

    return(<div>{this.tempresults(this.props.data)}</div>)
  }
}

export default Graph
