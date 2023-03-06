import React from "react";
import notFound from "../../assets/images/404.jpg";
import "./error.css";

const NotFound = () => (
  <div className="error-div">
    <img src={notFound} alt="not-found" className="error-img" />
  </div>
);

export default NotFound;
