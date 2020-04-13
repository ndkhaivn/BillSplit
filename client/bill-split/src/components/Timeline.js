import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";
import moment from "moment";
import config from "../config";
import { toDateFormat, fromDateFormat, findTenant, daysDiff } from "../utilitiy";
import { DateRangeInput } from "@blueprintjs/datetime";

class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromDate: moment().subtract(2, "months").toDate(),
      toDate: moment().toDate(),
    };
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  handleRangeChange(selectedRange) {
    if (!selectedRange[0] || !selectedRange[1]) {
      return;
    }
    this.setState((state) => ({
      ...state,
      ...(selectedRange[0] && { fromDate: selectedRange[0] }),
      ...(selectedRange[1] && { toDate: selectedRange[1] }),
    }));
  }

  htmlTenantTooltip = (tenant, stay) => {
    return (
      `<div class="tooltip-card">
        <b>${tenant.tenantName}</b>
        <div> ${toDateFormat(stay.fromDate)} - ${toDateFormat(stay.toDate)} (${daysDiff(stay.fromDate, stay.toDate)} days)</div>
      </div>`
    );
  }

  htmlBillTooltip = (billTitle, bill) => {
    const tenants = this.props.tenants;
    const splitsMarkup = bill.splits.map(split => {
      if (!findTenant(tenants, split.tenantId)) {
        return "";
      } else {
        return `
          <tr> 
            <td><b>${findTenant(tenants, split.tenantId).tenantName}</b></td>
            <td>$${split.sharedAmount}</td> 
            <td>(${split.days} days)</td> 
          </tr>
        `;
      }
    });

    return (
      `<div class="tooltip-card">
        <h3>
          ${billTitle}: ${toDateFormat(bill.period.fromDate)} - ${toDateFormat(bill.period.toDate)}
          <span>(${daysDiff(bill.period.fromDate, bill.period.toDate)} days)</span>
        </h3> 
        
        <div>Amount: $${bill.amount}</div>
        <div>Payment Date: ${toDateFormat(bill.paymentDate)}</div>
        <table border="0">
          ${splitsMarkup.join(' ')}
        </table>
      </div>`
    );
  }

  render() {
    let data = [];
    for (let billType of this.props.billTypes) {
      data = data.concat(
        billType.bills.map((bill) => ({
          x: billType.title,
          y: [bill.period.fromDate.getTime(), bill.period.toDate.getTime()],
          htmlTooltip: this.htmlBillTooltip(billType.title, bill)
        }))
      );
    }

    for (let tenant of this.props.tenants) {
      data = data.concat(
        tenant.stays.map((stay) => {
          if (!stay.toDate) {
            stay.toDate = new Date();
          }
          return {
            x: tenant.tenantName,
            y: [stay.fromDate.getTime(), stay.toDate.getTime()],
            fillColor: config.default_tenant_color,
            htmlTooltip: this.htmlTenantTooltip(tenant, stay)
          };
        })
      );
    }

    let series = [
      {
        data,
      },
    ];

    const options = {
      chart: {
        height: 350,
        type: "rangeBar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        min: this.state.fromDate.getTime(),
        max: this.state.toDate.getTime(),
      },
      fill: {
        type: "solid",
        opacity: 0.5,
      },
      tooltip: {
        custom: ({series, seriesIndex, dataPointIndex, w}) => {
          const data = w.config.series[0].data[dataPointIndex];
          return data.htmlTooltip;
        }
      }
    };

    return (
      <div>
        <DateRangeInput
          formatDate={(date) => moment(date).format(config.date_format)}
          onChange={this.handleRangeChange}
          parseDate={fromDateFormat}
          value={[this.state.fromDate, this.state.toDate]}
        />
        <ReactApexChart
          options={options}
          series={series}
          type="rangeBar"
          heigth={350}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  billTypes: state.billTypes,
  tenants: state.tenants,
});

export default connect(mapStateToProps)(Timeline);
