import React, {Component} from "react";
import feather from "feather-icons";

class TenantList extends Component {

  render() {
    const icon= {icon: "FiAperture"};
    return (
      <ul className="nav">
        <li className="sidebar-item">
          Khai Nguyen 1
        </li>

        <li className="sidebar-item">
          Khai Nguyen 2
        </li>

      </ul>
    )
  }

}

export default TenantList;