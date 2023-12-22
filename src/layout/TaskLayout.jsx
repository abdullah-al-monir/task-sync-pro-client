import Dashboard from "../pages/TaskManagement/DashBoard";
import { Outlet } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const TaskLayout = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex">
      <DndProvider backend={HTML5Backend}>
      <div className="w-64 min-h-screen bg-purple-300 p-5">
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
