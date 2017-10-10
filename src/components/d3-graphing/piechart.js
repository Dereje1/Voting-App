"use strict"
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
    const node = this.node

    var width = 475,
        height = 475,
        radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal()
        .range(["#f4f442", "#7af441", "#41f4e2","#f44141","#f441d0","#f4a041","#d341f4","#f46d41"]);

    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 60)
        .innerRadius(radius - 60);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) {; return d.y; });

    var svg = d3.select(node)
                .append("g")
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { console.log(d);return color(d.data.x); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".5em")
          .text(function(d) {
            if(d.data.y!==0){
              return (d.data.x + "-" + d.data.y)
            }
            else{
              return ("")
            }
          })
          .style("font-size", "1.2em")
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
      <svg ref={node => this.node = node} width={500} height={500}>
      {/*<rect width={"100%"} height={"100%"} fill="blue"></rect>*/}
      </svg>
    )
  }

}

export default Pie
