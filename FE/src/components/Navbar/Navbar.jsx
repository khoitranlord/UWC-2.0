import React from "react";
import "./navbar.css";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle";
import AuthService from "../../pages/authen/AuthService";

const logoutHandler = () => {
  AuthService.logout();
};

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <PageTitle title={props.pageTitle} />
        <div className="item">
          <Button variant="success">Contact</Button>{" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faEnvelope} className="nav-icon" />
          </Link>
          <Dropdown>
            <Dropdown.Toggle className="avatar"></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/account">My Account</Dropdown.Item>
              <Dropdown.Item href="/signin" onClick={logoutHandler}>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
