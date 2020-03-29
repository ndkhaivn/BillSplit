import { Link } from "react-router-dom";
import React, {Component} from "react";
import logo from "../logo.svg";
import TenantList from "./TenantList";

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
            Creative Tim
          </Link>
        </div>

        <div className="sidebar-wrapper">
          <TenantList/>

            {/*{this.props.routes.map((prop, key) => {*/}
            {/*  if (!prop.redirect)*/}
            {/*    return (*/}
            {/*      <li*/}
            {/*        className={*/}
            {/*          prop.upgrade*/}
            {/*            ? "active active-pro"*/}
            {/*            : this.activeRoute(prop.layout + prop.path)*/}
            {/*        }*/}
            {/*        key={key}*/}
            {/*      >*/}
            {/*        <NavLink*/}
            {/*          to={prop.layout + prop.path}*/}
            {/*          className="nav-link"*/}
            {/*          activeClassName="active"*/}
            {/*        >*/}
            {/*          <i className={prop.icon} />*/}
            {/*          <p>{prop.name}</p>*/}
            {/*        </NavLink>*/}
            {/*      </li>*/}
            {/*    );*/}
            {/*  return null;*/}
            {/*})}*/}
        </div>

      </div>
    )
  }
}

export default Sidebar;