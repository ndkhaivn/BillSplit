import React, { Component } from "react";
import ReactApexChart from "react-apexcharts"
import {connect} from "react-redux";
import moment from "moment";
import config from "../config";

class Timeline extends Component {

  state = {
    options: {
      chart: {
        type: 'line',
        stacked: false,
        zoom: {
          enabled: true
        },
      },
      stroke: {
        width: 20,
        curve: 'smooth'
      },
      colors: ['#008FFB', '#00E396', '#CED4DC'],
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      fill: {
        type: 'solid',
        opacity: 1
      },
      yaxis: {
        labels: {
          formatter: value => {
            return value;
            switch (value) {
              case 1: return "A"; break;
              case 2: return "B"; break;
              case 3: return "C"; break;
            }
          }
        }
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 8,
        min: new Date("01/01/2014").getTime(),
        max: new Date("01/20/2014").getTime(),
        labels: {
          rotate: -15,
          rotateAlways: true,
          formatter: function(val, timestamp) {
            return moment(new Date(timestamp)).format("DD/MM/YYYY")
          }
        }
      },
      title: {
        text: 'Irregular Data in Time Series',
        align: 'left',
        offsetX: 14
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetX: -10
      }
    },
  };

  render() {

    let series = [{
      name: 'PRODUCT A',
      data: [[new Date("01/01/2014").getTime(), 1], [new Date("1/10/2014").getTime(), 1], [new Date("01/20/2014").getTime(), 1]]
    }, {
      name: 'PRODUCT B',
      data: [[new Date("01/02/2014").getTime(), 2], [new Date("1/10/2014").getTime(), 2], [new Date("01/20/2014").getTime(), 2]]
    }, {
      name: 'PRODUCT C',
      data: [[new Date("01/05/2014").getTime(), 3], [new Date("1/10/2014").getTime(), 3], [new Date("01/15/2014").getTime(), 3]]
    }];

    return (
      <div>
        <ReactApexChart options={this.state.options} series={series} type="line" heigth={350}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  billTypes: state.billTypes
});

export default connect(
  mapStateToProps
)(Timeline);