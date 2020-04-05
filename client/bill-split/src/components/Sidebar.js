import { Link } from "react-router-dom";
import React, {Component} from "react";
import logo from "../logo.svg";
import TenantList from "./TenantList";
import BillList from "./BillList";
import { Button, Intent, Popover, PopoverInteractionKind, Position, InputGroup } from "@blueprintjs/core"
import { addTenant } from "../redux/actions"
import { connect } from "react-redux";

class Sidebar extends Component {
  constructor(props) {
      super(props);

      this.state = {
        showAddTenantPopup: false
      };

      this.handleToggleAddTenant = this.handleToggleAddTenant.bind(this);
      this.handleAddTenant = this.handleAddTenant.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleToggleAddTenant() {
    this.setState((state) => ({
      showAddTenantPopup: !state.showAddTenantPopup
    }));
  }

  handleAddTenant() {
    this.handleToggleAddTenant();
    this.props.addTenant({
      tenantName: this.state.newTenantName,
      stays: []
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div
        className="sidebar"
        data-color="black"
      >
        <div>
          <div className="logo">
            <Link
              to="/"
              className="simple-text logo-mini"
            >
              <div className="logo-img">
                <img src={logo} alt="logo_image" />
              </div>
            </Link>
            <Link
              to="/"
              className="simple-text logo-normal"
            >
              BillSplit
            </Link>
          </div>

          <div className="sidebar-wrapper">
            <div>

              <Popover
                isOpen={this.state.showAddTenantPopup}
                interactionKind={PopoverInteractionKind.CLICK}
                popoverClassName="bp3-popover-content-sizing"
                content={<div>
                  abc
                </div>}
                position={Position.LEFT}
              > 
                <Button icon="add" minimal={true} intent={Intent.PRIMARY} onClick={this.handleToggleAddTenant}></Button>
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

                    <Button onClick={this.handleToggleAddTenant}>Cancel</Button>
                    <Button onClick={this.handleAddTenant} intent={Intent.PRIMARY}>Submit</Button>
                  </div>
              </Popover>

              

              <span
                className="simple-text"
              >
                Tenants
              </span>
              <TenantList/>
            </div>

            <div>
              <div
                className="simple-text"
              >
                Bills
              </div>
              <BillList/>
            </div>

          </div>
        </div>


      </div>
    )
  }
}

export default connect(
  null,
  { addTenant }
)(Sidebar);