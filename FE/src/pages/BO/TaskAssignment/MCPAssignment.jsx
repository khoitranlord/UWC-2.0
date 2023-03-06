import { React } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Task from "./Task/Task";
import MapTask from "./MapTask/MapTask";
import Button from "react-bootstrap/esm/Button";
import "./taskAssignment.css";

export const TaskAssignment = () => {
  return (
    <div className="task-assignment">
      <Sidebar />
      <div className="task-assignment-container">
        <Navbar pageTitle="Task Assignment" />
        <div className="task-assignment-content">
          <div className="task-content">
            <Task isMcp={true} />
          </div>
          <div className="map-task-content">
            <MapTask />
            <Button
              variant="success"
              className="finish-btn"
              href="/task-assignment/route-planning"
            >
              Finish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignment;
