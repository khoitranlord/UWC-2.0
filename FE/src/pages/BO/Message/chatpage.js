import Chat from "./Chat";
import SidebarJan from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import "../../Tool/Tool";
import React, { useState, useEffect } from "react";
import { COLUMNS } from "./utils/columns";
import { Table } from "../../../components/Table/Table";
import axios from "axios";
function ChatApp() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api?results=200&nat=us&inc=id,name,phone")
      .then((res) => {
        const objs = res.data.results;
        const data = objs.map((obj) => {
          return {
            id: obj.id.value,
            name: obj.name.first + " " + obj.name.last,
            phone: obj.phone,
          };
        });
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="tool">
      <SidebarJan />
      <div className="toolContainer">
        <Navbar />
        <div className="content">
          <div class="row">
            <div class="table-responsive col-md-6" style={{ width: "40%" }}>
              <Table columns={COLUMNS} data={posts} />
            </div>
            <div class="table-responsive col-md-6" style={{ width: "60%" }}>
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
