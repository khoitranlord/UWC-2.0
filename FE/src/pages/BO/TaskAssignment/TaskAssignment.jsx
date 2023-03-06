import { React } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Task from "./Task/Task";
import MapTask from "./MapTask/MapTask";
import Button from "react-bootstrap/esm/Button";
import map1 from "../../../assets/images/map-1.png";
import map2 from "../../../assets/images/map-2.png";
import map3 from "../../../assets/images/map-3.png";
import "./taskAssignment.css";

const handleRenderMap = (listMcps) => {
  let childImg = document.createElement("img");
  childImg.classList.value = "to-remove";
  childImg.width = 558;
  childImg.height = 600;

  const exMap = document.querySelector(".mapboxgl-map");

  if (exMap) {
    exMap.remove();
  } else {
    const toRemove = document.querySelector(".to-remove");
    toRemove.remove();
  }

  const mapTaskContent = document.querySelector(".map-task-content");
  if (listMcps === "2, 15, 19, 10, 6") {
    childImg.src = map1;
  } else if (listMcps === "16, 8, 22, 11, 2") {
    childImg.src = map2;
  } else if (listMcps === "24, 14, 7, 18, 4, 3") {
    childImg.src = map3;
  }
  mapTaskContent.prepend(childImg);
};

export const TaskAssignment = () => {
  return (
    <div className="task-assignment">
      <Sidebar />
      <div className="task-assignment-container">
        <Navbar pageTitle="Task Assignment" />
        <div className="task-assignment-content">
          <div className="task-content">
            <Task handleRenderMap={handleRenderMap} />
          </div>
          <div className="map-task-content">
            <MapTask className="mapTask" />
            <Button
              variant="success"
              className="finish-btn"
              href="/task-assignment/vehicle-assignment"
            >
              Create Route
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignment;
