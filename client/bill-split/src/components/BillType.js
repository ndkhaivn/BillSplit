import { Collapse, Icon, Button, Overlay } from "@blueprintjs/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleAddBillDialog, setCurrentBillType } from "../redux/actions"

class BillType extends Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleAddBill = () => {
    this.props.toggleAddBillDialog();
    this.props.setCurrentBillType(this.props.billType);
  }

  render() {
    const billType = this.props.billType;
    const bills = billType.bills;

    let billsMarkup = bills.map((bill) => (
      <li key={bill.billId}>
        {`${bill.period.fromDate} - ${bill.period.toDate}`}

        <div className="overlay-edit-child">
          <Button icon="edit" outlined="true"></Button>
        </div>
      </li>
    ));

    return (
      <li key={billType.billTypeId} className="sidebar-item">
        <div onClick={this.handleClick}>
          <Icon icon={this.state.isOpen ? "chevron-down" : "chevron-right"}/>
          {billType.title}
        </div>

        <Collapse isOpen={this.state.isOpen}>
          <ul className="nav">{billsMarkup}</ul>
        </Collapse>

        <div className="overlay-edit">
          <Button icon="edit" outlined="true"></Button>
          <Button icon="plus" outlined="true" onClick={this.handleAddBill}></Button>
        </div>
      </li>
    );
  }
}

export default connect(
  null,
  { toggleAddBillDialog, setCurrentBillType }
)(BillType);
