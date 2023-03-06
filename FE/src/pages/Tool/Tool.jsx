import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/SidebarCol";
import ToolCard from "../../components/Card/Card";
import PageTitle from "../../components/PageTitle/PageTitle";

import "./tool.css";

const Tool = () => {
  return (
    <div className="tool">
      <Sidebar />
      <div className="toolContainer">
        <Navbar />
        <div className="content">
          <PageTitle title="TITLE" description="Description here" />
          <ToolCard />
        </div>
      </div>
    </div>
  );
};

export default Tool;
