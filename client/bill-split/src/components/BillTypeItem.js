import { Collapse, Icon, Button, Intent } from "@blueprintjs/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  toggleAddBillDialog,
  setCurrentBillType,
  deleteBill,
  deleteBillType,
} from "../redux/actions/billTypes";
import { toDateFormat, shortDateFormat } from "../utilitiy";

class BillTypeItem extends Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleAddBill = () => {
    this.props.toggleAddBillDialog();
    this.props.setCurrentBillType(
      this.props.billTypes[this.props.billTypeIndex]
    );
  };

  render() {
    const billType = this.props.billTypes[this.props.billTypeIndex];
    const bills = billType.bills;

    let billsMarkup = bills.map((bill, index) => (
      <li key={bill.billId}>
        {`${shortDateFormat(bill.period.fromDate)}-${toDateFormat(bill.period.toDate)} | $${bill.amount}`}

        <div className="overlay-edit-child">
          <Button icon="edit" outlined="true" />
          <Button
            icon="cross"
            outlined="true"
            intent={Intent.DANGER}
            onClick={() => {
              this.props.deleteBill(bill);
            }}
          />
        </div>
      </li>
    ));

    return (
      <li key={billType.billTypeId} className="sidebar-item">
        <div onClick={this.handleClick}>
          <Icon icon={this.state.isOpen ? "chevron-down" : "chevron-right"} />
          {billType.title}
        </div>

        <Collapse isOpen={this.state.isOpen}>
          <ul className="nav">{billsMarkup}</ul>
        </Collapse>

        <div className="overlay-edit">
          <Button icon="edit" outlined="true"></Button>
          <Button
            icon="plus"
            outlined="true"
            onClick={this.handleAddBill}
          ></Button>
          <Button
            icon="cross"
            outlined="true"
            onClick={() => {
              this.props.deleteBillType(billType.billTypeId);
            }}
            intent={Intent.DANGER}
          />
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  billTypes: state.billTypes,
});

export default connect(mapStateToProps, {
  toggleAddBillDialog,
  setCurrentBillType,
  deleteBill,
  deleteBillType,
})(BillTypeItem);
