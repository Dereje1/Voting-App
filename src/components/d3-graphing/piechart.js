"use strict"//creates the pie chart with d3 , this compinent has lots of room for improvement
import React from 'react';
import * as d3 from "d3";


class Pie extends React.Component{
  constructor(props){
    super(props)
    this.createPieChart = this.createPieChart.bind(this)
  }
  componentDidMount() {
     this.createPieChart()
  }
  componentDidUpdate() {
     this.createPieChart()
  }

  createPieChart(){
    var data = this.formatData(this.props.data);
    //data = data.map((d)=>{return d.y})
    let totalVotes = this.props.data.reduce(function(acc,curr){
      return acc+curr[1]
    },0)
    const node = this.node //directly manipulating the dom here --> not very reactive...
    const element = document.querySelector(".piearea").getBoundingClientRect();

    let minBound = Math.min(element.width, element.height)
    var width = minBound*.85,
        height = minBound*.85,
        radius = width / 2;

    // normal d3 commands below.... except could not manage tool tips to work as I used to use another div in the dom(outside of svg)
    var color = d3.scaleOrdinal()
        .range(["#f4f442", "#7af441", "#41f4e2","#f44141","#f441d0","#f4a041","#d341f4","#f46d41"]);

    var arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - width*.2)
        .innerRadius(radius - width*.15);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) {; return d.y; });

    var svg = d3.select(node)
                .append("g")
                  .attr("transform", "translate(" + width / 1.8 + "," + height / 1.9 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.x); })

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".5em")
          .text(function(d) {
            if(d.data.y!==0){
              let percentage = ((d.data.y/totalVotes)*100)
              return (d.data.x + "-\n" + percentage.toFixed(0)+"%")
            }
            else{
              return ("")
            }
          })
          .style("font-size", width*.028)
          .style("font-weight", "bold");
  }
  formatData(data){
    return(
      data.map(function(d){
        return{
          x:d[0],
          y:d[1]
        }
      })
    )
  }
  render(){
    return (
      <svg ref={node => this.node = node} width={"100%"} height={500}>
      {/*<rect width={"100%"} height={"100%"} fill="blue"></rect>*/}
      </svg>
    )
  }

}

export default Pie
