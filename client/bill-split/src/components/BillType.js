import {Collapse} from "@blueprintjs/core";
import React, {Component} from "react";

class BillType extends Component {

  state = {
    isOpen: false
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const billType = this.props.billType;
    const bills = billType.bills;

    let billsMarkup = bills.map(bill => <div key={bill.billId}> {`${bill.period.fromDate} - ${bill.period.toDate}`} </div>);

    return (
      <div>
        
      <li key={billType.billTypeId} className="sidebar-item" >
        <div onClick={this.handleClick}> {billType.title} </div>
      </li>

      <Collapse isOpen={this.state.isOpen}>
        {billsMarkup}
      </Collapse>

      </div>
    );
  }
}

export default BillType;