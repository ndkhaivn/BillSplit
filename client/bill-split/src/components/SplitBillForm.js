import React, { Component } from "react"
import TenantSelect from "./TenantSelect"
import { FormGroup, NumericInput, ControlGroup, Tag } from "@blueprintjs/core"

class SplitBillForm extends Component {

  state = {
    amount: 0.0,
    days: 0
  };


  render() {
    return (
      <div>

        <ControlGroup fill={true}>
          <TenantSelect />
          {/* Duration */}
          <FormGroup label="Stayed Duration">
            <NumericInput
              fill={true}
              inline={true}
              value={this.state.days}
              // onValueChange={this.handleAmountChange}
              rightElement={<Tag minimal="true">days</Tag>}
              buttonPosition="none"
            />
          </FormGroup>
          {/* Amount Input */}
          <FormGroup label="Amount">
            <NumericInput
              fill={true}
              inline={true}
              value={this.state.amount}
              leftIcon="dollar"
              // onValueChange={this.handleAmountChange}
              buttonPosition="none"
            />
          </FormGroup>
        </ControlGroup>



      </div>
    )
  }
}

export default SplitBillForm