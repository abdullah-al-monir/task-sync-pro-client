import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import background from "/background.png";
import useAuth from "../hooks/useAuth";
const Banner = () => {
  const { user } = useAuth();
  return (
    <div className="">
      <div
        style={{ backgroundImage: `url('${background}')` }}
        className="bg-{url('${background}')} bg-cover bg-center text-center py-24 text-white"
      >
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Your Task Manager
        </h1>
        <p className="text-lg mb-8">
          Organize and streamline your tasks effortlessly.
        </p>
        <Link to={`${user ? "/tasks/create-task" : "/signIn"}`}>
          <button className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-300">
            Let’s Explore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
