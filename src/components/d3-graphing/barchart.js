"use strict"
import React from 'react';
import * as d3 from "d3";

class BarChart extends React.Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
    const yData = this.props.data.map((d)=>{return d[1]})
    const node = this.node
    const dataMax = d3.max(yData)
    const yScale = d3.scaleLinear()
       .domain([0, dataMax])
       .range([0, this.props.size[1]])
   d3.select(node)
      .selectAll('rect')
      .data(yData)
      .enter()
      .append('rect')

   d3.select(node)
      .selectAll('rect')
      .data(yData)
      .exit()
      .remove()

   d3.select(node)
      .selectAll('rect')
      .data(yData)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * ((this.props.size[0]/yData.length)+10))
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', this.props.size[0]/yData.length)
   }
render() {
      return <svg ref={node => this.node = node}
      width={500} height={500}>
      {/*<rect width={"100%"} height={"100%"} fill="blue"></rect>*/}
      </svg>
   }
}
export default BarChart
