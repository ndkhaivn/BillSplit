import React, { Component } from "react";
import ReactApexChart from "react-apexcharts"
import {connect} from "react-redux";
import moment from "moment";
import config from "../config";
import { DateRangeInput } from "@blueprintjs/datetime";

class Timeline extends Component {

  constructor(props) {
    super(props);

    this.state = {
  
      startDate: moment().subtract(2, "months").toDate(),
      endDate: moment().toDate()

    }
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
  }

  handleRangeChange(selectedRange) {
    if (!selectedRange[0] || !selectedRange[1]) {
      return;
    }
    this.setState((state) => ({
      ...state,
      ...selectedRange[0] && { startDate: selectedRange[0] },
      ...selectedRange[1] && { endDate: selectedRange[1] }
      }
    ));
  }

  handleResetButton() {
    let startDate = moment().subtract(2, "months").toDate();
    let endDate = moment().toDate();

    this.setState((state) => ({
      startDate,
      endDate
    }));
  }

  render() {

    let data = [];
    for (let billType of this.props.billTypes) {
      data = data.concat(billType.bills.map(bill => ({
        x: billType.title,
        y: [
          moment.utc(bill.period.fromDate, config.date_format).toDate().getTime(),
          moment.utc(bill.period.toDate, config.date_format).toDate().getTime(),
        ]
      })));
    }

    for (let tenant of this.props.tenants) {
      data = data.concat(tenant.stays.map(stay => ({
        x: tenant.tenantName,
        y: [
          moment.utc(stay.fromDate, config.date_format).toDate().getTime(),
          moment.utc(stay.toDate, config.date_format).toDate().getTime(),
        ],
        fillColor: config.default_tenant_color,
      })));
    }

    let series = [{ 
      data 
    }];

    const options = {
      chart: {
        height: 350,
        type: 'rangeBar',
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        min: this.state.startDate.getTime(),
        max: this.state.endDate.getTime(),
      },
    };
    
    return (

      <div>

        <DateRangeInput
          formatDate={date => moment(date).format("DD/MM/YYYY")}
          onChange={this.handleRangeChange}
          parseDate={str => new Date(str)}
          value={[this.state.startDate, this.state.endDate]}
        />

        <button onClick={this.handleResetButton}>Reset</button>

        <ReactApexChart options={options} series={series} type="rangeBar" heigth={350}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  billTypes: state.billTypes,
  tenants: state.tenants
});

export default connect(
  mapStateToProps
)(Timeline);