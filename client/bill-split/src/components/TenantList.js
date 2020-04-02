import React, {Component} from "react";
import { connect } from "react-redux";
import axios from "axios";
import {getAllTenants} from "../redux/actions";
import { Intent, Spinner } from "@blueprintjs/core";

class TenantList extends Component {

  componentDidMount() {

    this.props.getAllTenants();
  }

  render() {

    const tenants = this.props.tenants;

    let tenantsMarkup = (tenants.length == 0) ? <Spinner intent={Intent.PRIMARY}/> : tenants.map((tenant) => <li key={tenant.tenantId} className="sidebar-item">{tenant.tenantName}</li>);

    return (
      <ul className="nav">
        {tenantsMarkup}
      </ul>
    )
  }

}

const mapStateToProps = (state) => ({
  tenants: state.tenants
});

export default connect(
  mapStateToProps,
  { getAllTenants }
)(TenantList);