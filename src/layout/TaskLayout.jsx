import Dashboard from "../pages/TaskManagement/Dashboard";
import { Outlet } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

const TaskLayout = () => {
  const backend = isMobile ? TouchBackend : HTML5Backend;
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row">
      <DndProvider backend={backend}>
        <div className="w-full md:w-64 h-full md:min-h-screen bg-purple-300 p-5">
          <Dashboard />
        </div>
        <div className="flex-1 p-5">
          <Outlet />
        </div>
      </DndProvider>
    </div>
  );
};

export default TaskLayout;
