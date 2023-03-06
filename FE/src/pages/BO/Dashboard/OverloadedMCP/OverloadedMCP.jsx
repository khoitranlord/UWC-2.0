import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLUMNS } from "./utils/columns";
import { ScrollTable } from "../../../../components/Table/ScrollTable";
import axios from "axios";
import AuthService from "../../../authen/AuthService";

const OverloadedMCP = () => {
  const [overloadedMCPs, setOverloadedMCPs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // authenticate current user on fe
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      return navigate("/signin");
    }
    const config = {
      headers: {
        Authorization: "Bearer " + currentUser.access_token,
      },
    };

    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/overloaded-mcps`, config)
      .then((res) => {
        setLoading(false);
        const objs = res.data;
        const data = objs.map((obj) => {
          return {
            id: obj.MCP_ID,
            dist: obj.Dist,
            time: obj["Overloaded Time"],
          };
        });
        setOverloadedMCPs(data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.status == 403) {
          return navigate("/signin");
        }
      });
  }, []);

  return (
    <div>
      {!loading ? (
        <ScrollTable columns={COLUMNS} data={overloadedMCPs} />
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

export default OverloadedMCP;
