import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLUMNS } from "./utils/columns";
import { ScrollTable } from "../../../../components/Table/ScrollTable";
import axios from "axios";
import AuthService from "../../../authen/AuthService";

const ActiveWorker = () => {
  const [workers, setWorkers] = useState([]);
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/working`, config)
      .then((res) => {
        setLoading(false);
        const objs = res.data;
        const data = objs.map((obj) => {
          return {
            id: obj.ID,
            name: obj.Name,
            role: obj.Role,
          };
        });
        setWorkers(data);
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
        <ScrollTable columns={COLUMNS} data={workers} />
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

export default ActiveWorker;
