import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Collapse,
  Icon,
  Popover,
  InputGroup,
  PopoverInteractionKind,
  Position,
  Button,
  Intent,
  FormGroup
} from "@blueprintjs/core";
import { DateRangeInput } from "@blueprintjs/datetime";
import config from "../config";
import { toDateFormat, fromDateFormat } from "../utilitiy";
import { addStay, deleteStay, deleteTenant } from "../redux/actions/tenants";

class TenantItem extends Component {
  state = {
    isOpen: false,
    showAddStayPopup: false,
    period: {
      fromDate: null,
      toDate: null
    }
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleAddStay = () => {
    this.props.addStay(this.props.tenants[this.props.tenantIndex], this.state.period);
  };

  handleRangeChange = (selectedRange) => {
    this.setState((state) => ({
      period: {
        ...state.period,
        ...(selectedRange[0] && { fromDate: selectedRange[0] }),
        ...(selectedRange[1] && { toDate: selectedRange[1] }),
      },
    }));
  };

  render() {
    const tenant = this.props.tenants[this.props.tenantIndex];
    const stays = tenant.stays;

    let staysMarkup = stays.map((stay, index) => (
      <li key={stay.fromDate.getTime()}>
        {`${toDateFormat(stay.fromDate)} - ${toDateFormat(stay.toDate)}`}

        <div className="overlay-edit-child">
          <Button icon="edit" outlined="true" />
          <Button
            icon="cross"
            outlined="true"
            intent={Intent.DANGER}
            onClick={() => {
              this.props.deleteStay(tenant, stay);
            }}
          />
        </div>
      </li>
    ));

    return (
      <li key={tenant.tenantId} className="sidebar-item">
        <div onClick={this.handleClick}>
          <Icon icon={this.state.isOpen ? "chevron-down" : "chevron-right"} />
          {tenant.tenantName}
        </div>

        <Collapse isOpen={this.state.isOpen}>
          <ul className="nav">{staysMarkup}</ul>
        </Collapse>

        <div className="overlay-edit">
          <Button icon="edit" outlined="true"></Button>

          <Popover
            interactionKind={PopoverInteractionKind.CLICK}
            popoverClassName="bp3-popover-content-sizing"
            position={Position.BOTTOM_RIGHT}
          >
            <Button
              icon="plus"
              outlined="true"
            ></Button>

            <div>

              <h3>{tenant.tenantName} </h3>

              <FormGroup
                label="Stayed period"
                fill={true}
              >
                <DateRangeInput
                  startInputProps={{
                    className: "flex-one",
                    placeholder: config.date_format,
                  }}
                  endInputProps={{
                    className: "flex-one",
                    placeholder: config.date_format,
                  }}
                  popoverProps={{ targetClassName: "full-width" }}
                  formatDate={toDateFormat}
                  onChange={this.handleRangeChange}
                  parseDate={fromDateFormat}
                  value={[this.state.period.fromDate, this.state.period.toDate]}
                />
              </FormGroup>

              <Button className="bp3-popover-dismiss">Cancel</Button>
              <Button
                className="bp3-popover-dismiss"
                onClick={this.handleAddStay}
                intent={Intent.PRIMARY}
              >
                Submit
              </Button>
            </div>
          </Popover>
          <Button
            icon="cross"
            outlined="true"
            onClick={() => {
              this.props.deleteTenant(tenant.tenantId);
            }}
            intent={Intent.DANGER}
          />
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  tenants: state.tenants,
});

export default connect(mapStateToProps, {
  addStay,
  deleteStay,
  deleteTenant
})(TenantItem);
