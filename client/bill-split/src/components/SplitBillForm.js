import React, { Component } from "react"
import TenantSelect from "./TenantSelect"
import { FormGroup, NumericInput, ControlGroup, Tag, Intent, Button } from "@blueprintjs/core"

class SplitBillForm extends Component {

  render() {
    return (
      <div>

        <ControlGroup fill={true}>
          <TenantSelect setTenantId={this.props.handleTenantChange}/>
          {/* Duration */}
          <FormGroup label="Stayed Duration">
            <NumericInput
              fill={true}
              inline={true}
              value={this.props.days}
              onValueChange={this.props.handleDurationChange}
              rightElement={<Tag minimal="true">days</Tag>}
              buttonPosition="none"
            />
          </FormGroup>
          {/* Amount Input */}
          <FormGroup label="Amount">
            <NumericInput
              fill={true}
              inline={true}
              value={this.props.amount}
              leftIcon="dollar"
              onValueChange={this.props.handleAmountChange}
              buttonPosition="none"
            />
          </FormGroup>
          <Button 
            icon="cross"
            minimal={true}
            onClick={this.props.handleDeleteSplit}
          />
        </ControlGroup>



      </div>
    )
  }
}

export default SplitBillForm