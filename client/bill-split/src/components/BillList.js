import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllBillTypes } from "../redux/actions";
import { Intent, Spinner } from "@blueprintjs/core";
import BillType from "./BillType";
import AddBillDialog from "./AddBillDialog";

class BillList extends Component {
  componentDidMount() {
    this.props.getAllBillTypes();
  }

  render() {
    const billTypes = this.props.billTypes;

    let billTypesMarkup =
      billTypes.length === 0 ? (
        <Spinner intent={Intent.PRIMARY} />
      ) : (
        billTypes.map((billType) => (
          <BillType key={billType.billTypeId} billType={billType} />
        ))
      );

    return (
      <div>
        <AddBillDialog></AddBillDialog>
        <ul className="nav">{billTypesMarkup}</ul>;
      </div> 
    );
  }
}

const mapStateToProps = (state) => ({
  billTypes: state.billTypes,
});

export default connect(mapStateToProps, { getAllBillTypes })(BillList);
