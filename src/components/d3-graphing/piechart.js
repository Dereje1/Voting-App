
import React from 'react'
import ReactFauxDOM from 'react-faux-dom'
import * as d3 from "d3";

class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tipleft:0,
      tipTop:0,
      tipVisible:"hidden",
      tipText:""
    }
  }
  tooltip(){
    let toolStyle={
      "position": "absolute",
      "color": "white",
      "padding": "5px",
      "backgroundColor": "black",
      "fontSize": "13px",
      "borderRadius": "3px",
      "whiteSpace": "pre",
      "left":this.state.tipleft,
      "top":this.state.tipTop,
      "visibility":this.state.tipVisible
    }
    return(
      <div
        key={1}
        style={toolStyle}
      >{this.state.tipText}</div>
    )
  }
  createPieChart(){
    var data = this.formatData(this.props.data);
    //data = data.map((d)=>{return d.y})
    let totalVotes = this.props.data.reduce(function(acc,curr){
      return acc+curr[1]
    },0)


    var width = this.props.width*.6,
        height = width,
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

    //Create the element
    const div = new ReactFauxDOM.Element('div')
    div.appendChild(this.tooltip())
    var svg = d3.select(div).append("svg")
                .attr("width", width)
                .attr("height", width)
                .append("g")
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.x); })
          .on('mouseover', (d) => {
            let pos = d3.mouse(d3.select('.arc').node())
            this.setState({
              tipleft:pos[0]+radius,
              tipTop:pos[1]+radius,
              tipText:d.data.x + "\n" + d.data.y + " Votes",
              tipVisible:"visible"
            })
            //console.log(d.data.x + "-\n" + d.data.y + " Mouse Position  " ,  d3.event.pageX, d3.event.pageY)
          })
          .on('mouseout', (d) => {
            //console.log("Bye " + d.data.x )
            this.setState({tipVisible:"hidden"})
          });

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
    return (div.toReact())
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
  render() {
    return(this.createPieChart())
  }


}

export default Pie
