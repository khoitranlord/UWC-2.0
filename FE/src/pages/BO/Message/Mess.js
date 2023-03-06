import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import "../../Tool/tool.css";
import PageTitle from "../../../components/PageTitle/PageTitle";

function Messages() {
  return (
    <div className="tool">
      <Sidebar />
      <div className="toolContainer">
        <Navbar />
        <div className="content">
          <PageTitle title="Message" />
        </div>
      </div>
    </div>
  );
}

export default Messages;
