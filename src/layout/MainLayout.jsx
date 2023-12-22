import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-5 min-h-[calc(100vh-200px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
