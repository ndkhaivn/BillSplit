import React, { Component } from "react";
import {
  Dialog,
  Button,
  FormGroup,
  InputGroup,
  Classes,
  NumericInput,
  Intent,
  ControlGroup,
  Divider
} from "@blueprintjs/core";
import { DateRangeInput, DateInput } from "@blueprintjs/datetime";
import { connect } from "react-redux";
import { toggleAddBillDialog, addBill } from "../redux/actions";
import moment from "moment";
import config from "../config";
import SplitBillForm from "./SplitBillForm";

class AddBillDialog extends Component {
  state = {
    period: {
      fromDate: null,
      toDate: null,
    },
    amount: 0.0,
    paymentDate: null,
    splits: [{
      tenantId: null,
      sharedAmount: 0.0,
      days: 0
    }]
  };

  handleRangeChange = (selectedRange) => {
    this.setState((state) => ({
      ...state,
      period: {
        ...state.period,
        ...(selectedRange[0] && { fromDate: selectedRange[0] }),
        ...(selectedRange[1] && { toDate: selectedRange[1] }),
      }
    }));
  };

  handleToggleDialog = () => {
    this.props.toggleAddBillDialog();
  };

  handleAmountChange = (valueAsNumber) => {
    this.setState({
      amount: valueAsNumber,
    });
  };

  handleDateChange = (selectedDate) => {
    this.setState({
      paymentDate: selectedDate,
    });
  };

  handleAddSplit = () => {
    this.setState((state) => ({
      ...state,
      splits: [
        ...state.splits,
        {
          tenantId: null,
          sharedAmount: 0.0,
          days: 0
        }
      ]
    }));
  }  

  standardizeBill = (bill) => ({
    ...bill,
    paymentDate: moment(bill.paymentDate).format(config.date_format),
    period: {
      fromDate: moment(bill.period.fromDate).format(config.date_format),
      toDate: moment(bill.period.toDate).format(config.date_format),
    }
  })

  handleSubmitBill = () => {
    this.props.addBill(this.standardizeBill({
      ...this.state,
      billTypeId: this.props.addBillDialog.billTypeId,
    }));
  };

  render() {

    const splitsMarkup = this.state.splits.map((split, index) => 
      <SplitBillForm 
        handleAmountChange={(sharedAmount) => {
          this.setState((state) => {
            const newState = {
              ...state,
              splits: [
                ...state.splits,
              ]
            }
            newState.splits[index].sharedAmount = sharedAmount;
            return newState;
          });
        }}

        handleDurationChange={(days) => {
          this.setState((state) => {
            const newState = {
              ...state,
              splits: [
                ...state.splits,
              ]
            }
            newState.splits[index].days = days;
            return newState;
          });
        }}

        handleTenantChange={(tenantId) => {
          this.setState((state) => {
            const newState = {
              ...state,
              splits: [
                ...state.splits,
              ]
            }
            newState.splits[index].tenantId = tenantId;
            return newState;
          });
        }}

        handleDeleteSplit={() => {
          this.setState((state) => {
            const newState = {
              ...state,
              splits: [
                ...state.splits,
              ]
            }
            newState.splits.splice(index, 1);
            return newState;
          })
        }}

        {...this.state.splits[index]}

      />
    );

    return (
      <Dialog
        icon="series-add"
        onClose={this.handleToggleDialog}
        title={this.props.addBillDialog.title}
        isOpen={this.props.addBillDialog.isOpen}
        canOutsideClickClose="true"
        canEscapeKeyClose="true"
      >
        <div className={Classes.DIALOG_BODY}>
          {/* Billing Period Input */}
          <FormGroup label="Billing period" labelFor="period-input" fill={true}>
            <DateRangeInput
              id="period-input"
              startInputProps={{className: "flex-one", placeholder: config.date_format}}
              endInputProps={{className: "flex-one", placeholder: config.date_format}}
              popoverProps={{targetClassName: "full-width"}}
              formatDate={(date) => moment(date).format("DD/MM/YYYY")}
              onChange={this.handleRangeChange}
              parseDate={(str) => moment(str, config.date_format).toDate()}
              value={[this.state.period.fromDate, this.state.period.toDate]}
            />
          </FormGroup>

          <ControlGroup fill={true}>
              {/* Amount Input */}
              <FormGroup label="Amount" labelFor="amount-input">
                <NumericInput
                  id="amount-input"
                  fill={true}
                  value={this.state.amount}
                  onValueChange={this.handleAmountChange}
                  leftIcon="dollar"
                  buttonPosition="none"
                />
              </FormGroup>

              {/* Payment Date Input */}
              <FormGroup label="Payment Date" labelFor="payment-date-input">
                <DateInput
                  placeholder={config.date_format}
                  id="payment-date-input"
                  fill={true}
                  formatDate={(date) => moment(date).format("DD/MM/YYYY")}
                  value={this.state.paymentDate}
                  onChange={this.handleDateChange}
                  parseDate={(str) => moment(str, config.date_format).toDate()}
                />
              </FormGroup>
          </ControlGroup>

          <Divider />

          {splitsMarkup}
          

          <Button
            icon="plus"
            onClick={this.handleAddSplit}
          > Add Split </Button>

          <Divider />
          
          
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={this.handleToggleDialog}>Cancel</Button>

            <Button onClick={this.handleSubmitBill} intent={Intent.PRIMARY}>
              Submit
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  addBillDialog: state.addBillDialog,
});

export default connect(mapStateToProps, {
  toggleAddBillDialog, 
  addBill
})(AddBillDialog);
