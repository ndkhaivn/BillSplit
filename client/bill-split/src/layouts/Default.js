import React, { Component } from "react";
import Sidebar from "../components/Sidebar"
import MainPanel from "../components/MainPanel"

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

        <MainPanel/>
      </div>
    );
  }
}

export default Admin;
