import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllBillTypes } from "../redux/actions/billTypes";
import { Intent, Spinner } from "@blueprintjs/core";
import BillTypeItem from "./BillTypeItem";
import AddBillDialog from "./AddBillDialog";

class BillTypeList extends Component {
  componentDidMount() {
    this.props.getAllBillTypes();
  }

  render() {
    const billTypes = this.props.billTypes;

    let billTypesMarkup =
      billTypes.length === 0 ? (
        <Spinner intent={Intent.PRIMARY} />
      ) : (
        billTypes.map((billType, index) => (
          <BillTypeItem key={billType.billTypeId} billTypeIndex={index} />
        ))
      );

    return (
      <div>
        <AddBillDialog></AddBillDialog>
        <ul className="nav">{billTypesMarkup}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  billTypes: state.billTypes,
});

export default connect(mapStateToProps, { getAllBillTypes })(BillTypeList);
