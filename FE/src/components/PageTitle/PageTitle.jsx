import React from "react";
import "./pageTitle.css";

const PageTitle = (props) => {
  return (
    <div className="mb-3 mb-lg-0">
      <div className="title">
        <h4 className="font-weight-bold title-name">{props.title}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default PageTitle;
