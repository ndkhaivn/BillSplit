import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllTenants } from "../redux/actions/tenants";
import { Intent, Spinner, Button, Colors } from "@blueprintjs/core";
import TenantItem from "./TenantItem";

class TenantList extends Component {
  componentDidMount() {
    this.props.getAllTenants();
  }

  render() {
    const tenants = this.props.tenants;
    console.log("Tenants: ", tenants);

    let tenantsMarkup =
      tenants.length === 0 ? (
        <Spinner intent={Intent.PRIMARY} />
      ) : (
        tenants.map((tenant, index) => (
          <TenantItem key={tenant.tenantId} tenantIndex={index} />
        ))
      );

    return <ul className="nav">{tenantsMarkup}</ul>;
  }
}

const mapStateToProps = (state) => ({
  tenants: state.tenants,
});

export default connect(mapStateToProps, { getAllTenants })(TenantList);
