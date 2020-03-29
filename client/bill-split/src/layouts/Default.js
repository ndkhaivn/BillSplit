import React, { Component } from "react";
import Sidebar from "../components/Sidebar"

class Admin extends Component {
  constructor(props) {
      super(props);
    this.state = {
      color: "black",
    };
  }
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          color={this.state.color}
        />

        <div className="main-panel">

        </div>
      </div>
    );
  }
}

export default Admin;
