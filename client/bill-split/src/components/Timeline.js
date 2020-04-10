import React, { Component } from "react";
import ReactApexChart from "react-apexcharts"
import {connect} from "react-redux";
import moment from "moment";
import config from "../config";
import { fromDateFormat } from "../utilitiy"
import { DateRangeInput } from "@blueprintjs/datetime";

class Timeline extends Component {

  constructor(props) {
    super(props);

    this.state = {
  
      startDate: moment().subtract(2, "months").toDate(),
      endDate: moment().toDate()

    }
    this.handleRangeChange = this.handleRangeChange.bind(this);
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

  render() {

    let data = [];
    for (let billType of this.props.billTypes) {
      data = data.concat(billType.bills.map(bill => ({
        x: billType.title,
        y: [
          bill.period.fromDate.getTime(),
          bill.period.toDate.getTime(),
        ]
      })));
    }

    for (let tenant of this.props.tenants) {
      data = data.concat(tenant.stays.map(stay => ({
        x: tenant.tenantName,
        y: [
          stay.fromDate.getTime(),
          stay.toDate.getTime(),
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
          formatDate={date => moment(date).format(config.date_format)}
          onChange={this.handleRangeChange}
          parseDate={fromDateFormat}
          value={[this.state.startDate, this.state.endDate]}
        />
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