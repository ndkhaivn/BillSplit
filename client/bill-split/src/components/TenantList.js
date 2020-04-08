import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllTenants } from "../redux/actions";
import { Intent, Spinner, Button, Colors } from "@blueprintjs/core";

class TenantList extends Component {
  componentDidMount() {
    this.props.getAllTenants();
  }

  render() {
    const tenants = this.props.tenants;

    let tenantsMarkup =
      tenants.length === 0 ? (
        <Spinner intent={Intent.PRIMARY} />
      ) : (
        tenants.map((tenant) => (
          <li key={tenant.tenantId} className="sidebar-item">
            {tenant.tenantName}

            <div className="overlay-edit">
              <Button icon="edit" outlined="true"></Button>

              <Button icon="plus" outlined="true"></Button>
            </div>
          </li>
        ))
      );

    return <ul className="nav">{tenantsMarkup}</ul>;
  }
}

const mapStateToProps = (state) => ({
  tenants: state.tenants,
});

export default connect(mapStateToProps, { getAllTenants })(TenantList);
