import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const MainLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
