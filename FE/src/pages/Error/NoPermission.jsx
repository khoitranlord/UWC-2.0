import React from "react";
import noPermission from "../../assets/images/403.jpg";
import "./error.css";

const NotFound = () => (
  <div>
    <div className="error-div">
      <div>
        <h4>
          You don't have permission! Please <a href="/signin">sign in</a>{" "}
        </h4>
      </div>
      <img src={noPermission} alt="not-found" className="error-img" />
    </div>
  </div>
);

export default NotFound;
