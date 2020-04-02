import { Link } from "react-router-dom";
import React, {Component} from "react";
import logo from "../logo.svg";
import TenantList from "./TenantList";
import BillList from "./BillList";

class Sidebar extends Component {
// constructor(props) {
//     super(props);
// }

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
              <div
                className="simple-text"
              >
                Tenants
              </div>
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

export default Sidebar;