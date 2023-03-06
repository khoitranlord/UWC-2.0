import React, { useState, useEffect } from "react";
import { COLUMNS } from "./utils/columns";
import { Table } from "../../../components/Table/Table.jsx";
import axios from "axios";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import "../../Tool/tool.css";
import AuthService from "../../authen/AuthService";

const MCP = () => {
  const [mcps, setMcps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mcpsPerPage, setMcpsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // authenticate current user on fe
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      return navigate("/403");
    }
    const config = {
      headers: {
        Authorization: "Bearer " + currentUser.access_token,
      },
    };

    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/mcps`, config)
      .then((res) => {
        setLoading(false);
        const objs = res.data;
        const data = objs.map((obj) => {
          return {
            id: obj.MCP_ID,
            name: obj.Name,
            dist: obj.Dist,
            capacity: obj["Capacity (L)"],
            status: obj.Status,
            time: obj["Overloaded Time"],
            location: "not yet",
          };
        });
        setMcps(data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.status == 403) {
          return navigate("/403");
        }
      });
  }, []);

  // get current mcps
  const indexOfLastMcp = currentPage * mcpsPerPage;
  const indexOfFirstMcp = indexOfLastMcp - mcpsPerPage;
  const currentMcps = mcps.slice(indexOfFirstMcp, indexOfLastMcp);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="tool">
      <Sidebar />
      <div className="toolContainer">
        <Navbar pageTitle="MCPs" />
        <div className="content">
          {!loading ? (
            <div>
              <Table
                columns={COLUMNS}
                data={currentMcps}
                placeholder={"Search MCP here..."}
                rowsPerPage={mcpsPerPage}
                totalRows={mcps.length}
                paginate={paginate}
                currentPage={currentPage}
                canSearch={true}
              />
            </div>
          ) : (
            <h4>Loading...</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCP;
