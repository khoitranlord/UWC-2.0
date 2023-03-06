import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLUMNS } from "./utils/columns";
import { Table } from "../../../components/Table/Table.jsx";
import axios from "axios";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import "../../Tool/tool.css";
import AuthService from "../../authen/AuthService";

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage, setVehiclesPerPage] = useState(10);
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/vehicles`, config)
      .then((res) => {
        setLoading(false);
        const objs = res.data;
        const data = objs.map((obj) => {
          return {
            id: obj.Vehicle_ID,
            license: obj["License Plate"],
            brand: obj.Brand,
            capacity: obj["Capacity (m3)"],
            fuel: obj["Fuel Tank"],
            weight: obj["Total Weight"],
          };
        });
        setVehicles(data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.status == 403) {
          return navigate("/403");
        }
      });
  }, []);

  // get current vehicles
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="tool">
      <Sidebar />
      <div className="toolContainer">
        <Navbar pageTitle="Vehicles" />
        <div className="content">
          {!loading ? (
            <div>
              <Table
                columns={COLUMNS}
                data={currentVehicles}
                placeholder={"Search vehicle here..."}
                rowsPerPage={vehiclesPerPage}
                totalRows={vehicles.length}
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

export default Vehicle;
