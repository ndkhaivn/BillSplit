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
import { toggleAddBillDialog } from "../redux/actions";
import moment from "moment";
import config from "../config";
import SplitBillForm from "./SplitBillForm";

class AddBillDialog extends Component {
  state = {
    startDate: null,
    endDate: null,
    amount: 0.0,
    paymentDate: null,
  };

  handleRangeChange = (selectedRange) => {
    this.setState({
      ...(selectedRange[0] && { startDate: selectedRange[0] }),
      ...(selectedRange[1] && { endDate: selectedRange[1] }),
    });
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

  handleSubmit = () => {};

  render() {
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
              value={[this.state.startDate, this.state.endDate]}
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

          {/* Splits */}
          <SplitBillForm />
          <Divider />
          <SplitBillForm />
          
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={this.handleToggleDialog}>Cancel</Button>

            <Button onClick={this.handleSubmit} intent={Intent.PRIMARY}>
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

export default connect(mapStateToProps, { toggleAddBillDialog })(AddBillDialog);
