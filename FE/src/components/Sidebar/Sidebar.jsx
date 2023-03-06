import React from "react";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import CookieRoundedIcon from "@mui/icons-material/CookieRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTruckMoving,
  faUserGroup,
  faTrashCan,
  faCircleArrowDown,
  faCircleCheck,
  faClock,
  faCheckDouble,
  faUserCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../../assets/images/UWC.png";
import "./sidebar.css";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="avatar1">
            <img src={logo} className="uwc-logo" />
          </span>
        </Link>
      </div>
      <hr />
      <div className="icon-list">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="tab">
              <FontAwesomeIcon icon={faHouse} className="side-icon" />
              <span>Home</span>
            </li>
          </Link>
          <Link to="/workers" style={{ textDecoration: "none" }}>
            <li className="tab">
              <FontAwesomeIcon icon={faUserGroup} className="side-icon" />
              <span>Workers</span>
            </li>
          </Link>
          <Link to="/vehicles" style={{ textDecoration: "none" }}>
            <li className="tab">
              <FontAwesomeIcon icon={faTruckMoving} className="side-icon" />
              <span>Vehicles</span>
            </li>
          </Link>
          <Link to="/mcps" style={{ textDecoration: "none" }}>
            <li className="tab">
              <FontAwesomeIcon icon={faTrashCan} className="side-icon" />
              <span>MCPs</span>
            </li>
          </Link>
          <Link
            to="/task-assignment/mcp-assignment"
            style={{ textDecoration: "none" }}
          >
            <li className="tab">
              <FontAwesomeIcon icon={faCircleArrowDown} className="side-icon" />
              <span>Task Assignment</span>
            </li>
          </Link>
        </ul>
      </div>
      <hr />
      {props.isDashboard && (
        <div className="icon-list">
          <h5 className="side-title">Statistics</h5>
          <ul>
            <li className="stats-tab">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="side-icon bottom-icon"
              />
              <span>Active</span>
              <span className="stats">160</span>
            </li>
            <li className="stats-tab">
              <FontAwesomeIcon
                icon={faClock}
                className="side-icon bottom-icon"
              />
              <span>Working</span>
              <span className="stats">100</span>
            </li>
            <li className="stats-tab">
              <FontAwesomeIcon
                icon={faUserCheck}
                className="side-icon bottom-icon"
              />
              <span>Finished</span>
              <span className="stats">60</span>
            </li>
            <li className="stats-tab">
              <FontAwesomeIcon
                icon={faSquareXmark}
                className="side-icon bottom-icon"
              />
              <span>Inactive</span>
              <span className="stats">2000</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
