import React, { Component } from "react";
import ReactApexChart from "react-apexcharts"
import {connect} from "react-redux";
import moment from "moment";
import config from "../config";

class Timeline extends Component {

  state = {
    options: {
      chart: {
        stacked: false,
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            fontSize: '14px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '14px'
          }
        }
      }
    },
  };

  render() {

    let data = [];
    for (let billType of this.props.billTypes) {
      data = data.concat(billType.bills.map(bill => ({
        x: billType.title,
        y: [
          moment(bill.period.fromDate, config.date_format).toDate().getTime(),
          moment(bill.period.toDate, config.date_format).toDate().getTime(),
        ]
      })));
    }

    let series = [{
      data
    }];

    console.log(series);

    return (
      <div>
        <ReactApexChart options={this.state.options} series={series} type="rangeBar" heigth={350}/>
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