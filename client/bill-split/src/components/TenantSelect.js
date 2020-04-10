import React, { Component } from "react";
import { Select } from "@blueprintjs/select";
import { MenuItem, Button, InputGroup, Label } from "@blueprintjs/core";
import { connect } from "react-redux";

class TenantSelect extends Component {
  state = {
    query: "",
    selectedTenantName: "",
  };

  handleQueryChange = (queryString) => {
    this.setState({
      query: queryString,
    });
  };

  filterTenant = (tenants, query) => {
    if (!tenants) {
      return [];
    }

    return tenants.filter((tenant) => {
      const normalizedName = tenant.tenantName.toLowerCase();
      const normalizedQuery = query.toLowerCase();
      return normalizedName.indexOf(normalizedQuery) >= 0;
    });
  };

  renderSelect = (tenant, { handleClick, modifiers, query }) => {
    return (
      <MenuItem
        key={tenant.tenantId}
        onClick={handleClick}
        text={`${tenant.tenantName}`}
      ></MenuItem>
    );
  };

  handleItemSelect = (item, index) => {
    this.setState({
      selectedTenantName: item.tenantName,
    });
    this.props.setTenantId(item.tenantId);
  };

  render() {
    return (
        <Label>
          Tenant
          <Select
            id="select-tenant"
            items={this.filterTenant(this.props.tenants, this.state.query)}
            itemRenderer={this.renderSelect}
            onItemSelect={this.handleItemSelect}
            filterable={true}
            query={this.state.query}
            onQueryChange={this.handleQueryChange}
          >
            <InputGroup
              fill={false}
              placeholder="Select Tenant..."
              value={this.state.selectedTenantName}
              leftIcon="caret-down"
            />
          </Select>
        </Label>
    );
  }
}

const mapStateToProps = (state) => ({
  tenants: state.tenants,
});

export default connect(mapStateToProps)(TenantSelect);
