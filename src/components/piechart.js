import React from 'react';
import * as d3 from "d3";
import * as ReactD3 from 'react-d3-components'


class Pie extends React.Component{
  constructor(props){
    super(props)
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
    console.log(this.formatData(this.props.data))
    var PieChart = ReactD3.PieChart;
    var tooltip = function(x, y) {
    return "x: " + x + " y: " + y;
      };
    var testdata = {
        label: 'somethingA',
        values: this.formatData(this.props.data)
    };
    var sort = null; // d3.ascending, d3.descending, func(a,b) { return a - b; }, etc...
    return (<PieChart
                data={testdata}
                width={400}
                height={400}
                margin={{top: 50, bottom: 10, left: 50, right: 50}}
                tooltipHtml={tooltip}
                sort={sort}
                />
    )
  }

}

export default Pie
