import React, {Component} from "react";
import { connect } from "react-redux";
import axios from "axios";
import {getAllTenants} from "../redux/actions";

class TenantList extends Component {

  componentDidMount() {

    this.props.getAllTenants();
  }

  render() {

    const tenants = this.props.tenants;

    if (!tenants.length) {
      return (
        <ul className="nav">

        </ul>
      );
    }
    let tenantsMarkup = tenants.map((tenant) => <li key={tenant.tenantId} className="sidebar-item">{tenant.tenantName}</li>);

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