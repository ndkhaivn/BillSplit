import { Link } from "react-router-dom";
import React, { Component } from "react";
import logo from "../logo.svg";
import TenantList from "./TenantList";
import BillTypeList from "./BillTypeList";
import {
  Button,
  Intent,
  Popover,
  PopoverInteractionKind,
  Position,
  InputGroup,
} from "@blueprintjs/core";
import { addTenant } from "../redux/actions/tenants";
import { addBillType } from "../redux/actions/billTypes";
import { connect } from "react-redux";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleAddTenant = this.handleAddTenant.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleAddBillType = this.handleAddBillType.bind(this);
  }

  handleAddTenant() {
    this.props.addTenant({
      tenantName: this.state.newTenantName,
      stays: [],
    });
  }

  handleAddBillType() {
    this.props.addBillType({
      title: this.state.newBillTypeTitle,
      bills: [],
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="sidebar" data-color="black">
        <div>
          <div className="logo">
            <Link to="/" className="simple-text logo-mini">
              <div className="logo-img">
                <img src={logo} alt="logo_image" />
              </div>
            </Link>
            <Link to="/" className="simple-text logo-normal">
              BillSplit
            </Link>
          </div>

          <div className="sidebar-wrapper">
            <div>
              <Popover
                interactionKind={PopoverInteractionKind.CLICK}
                popoverClassName="bp3-popover-content-sizing"
                position={Position.LEFT}
              >
                <Button
                  icon="add"
                  minimal={true}
                  intent={Intent.PRIMARY}
                ></Button>
                <div>
                  <form>
                    <InputGroup
                      value={this.state.newTenantName}
                      onChange={this.handleInputChange}
                      name="newTenantName"
                      leftIcon="new-person"
                      placeholder="Tenant Name"
                    />
                  </form>

                  <Button className="bp3-popover-dismiss">Cancel</Button>
                  <Button
                    className="bp3-popover-dismiss"
                    onClick={this.handleAddTenant}
                    intent={Intent.PRIMARY}
                  >
                    Submit
                  </Button>
                </div>
              </Popover>

              <span className="simple-text">Tenants</span>
              <TenantList />
            </div>

            <div>
              <Popover
                interactionKind={PopoverInteractionKind.CLICK}
                popoverClassName="bp3-popover-content-sizing"
                position={Position.LEFT}
              >
                <Button
                  icon="add"
                  minimal={true}
                  intent={Intent.PRIMARY}
                ></Button>
                <div>
                  <form>
                    <InputGroup
                      value={this.state.newBillTypeTitle}
                      onChange={this.handleInputChange}
                      name="newBillTypeTitle"
                      leftIcon="folder-new"
                      placeholder="Bill Type"
                    />
                  </form>

                  <Button className="bp3-popover-dismiss">Cancel</Button>
                  <Button
                    className="bp3-popover-dismiss"
                    onClick={this.handleAddBillType}
                    intent={Intent.PRIMARY}
                  >
                    Submit
                  </Button>
                </div>
              </Popover>

              <span className="simple-text">Bills</span>
              <BillTypeList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addTenant, addBillType })(Sidebar);
