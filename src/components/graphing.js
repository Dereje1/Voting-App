"use strict"
import React from 'react'
import * as d3 from "d3";
import Pie from './piechart';
// unfinished/src/components/scatter-plot.jsx
//import React        from 'react';


class Graph extends React.Component{

  tempresults(data){
    let votemapper= data.map((results,idx)=>{
      return (<li key={idx}>{results[0]} = {results[1]}</li>)
    })
    return (<ul>{votemapper}</ul>)
  }
  render(){

    return(<Pie data={this.props.data}/>)
  }
}


export default Graph
