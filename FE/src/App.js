import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/authen/Signin";
import Signup from "./pages/authen/Signup";
import { Dashboard } from "./pages/BO/Dashboard/Dashboard";
import Worker from "./pages/BO/Worker/Worker";
import MCPAssignment from "./pages/BO/TaskAssignment/MCPAssignment";
import TaskAssignment from "./pages/BO/TaskAssignment/TaskAssignment";
import VehicleAssignment from "./pages/BO/TaskAssignment/VehicleAssignment";
import Contact from "./pages/Contact/Contact";
import ChatApp from "./pages/BO/Message/chatpage";
import MCP from "./pages/BO/MCP/MCP";
import Vehicle from "./pages/BO/Vehicle/Vehicle";
import NotFound from "./pages/Error/NotFound";
import NoPermission from "./pages/Error/NoPermission";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/*  */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/workers" element={<Worker />} />
        <Route path="/vehicles" element={<Vehicle />} />
        <Route path="/mcps" element={<MCP />} />
        <Route
          path="/task-assignment/mcp-assignment"
          element={<MCPAssignment />}
        />
        <Route
          path="/task-assignment/route-planning"
          element={<TaskAssignment />}
        />
        <Route
          path="/task-assignment/vehicle-assignment"
          element={<VehicleAssignment />}
        />
        <Route path="/message" element={<ChatApp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/403" element={<NoPermission />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
