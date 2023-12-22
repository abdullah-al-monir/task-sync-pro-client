import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404!</h1>
        <p className="text-lg text-gray-600 mb-8">Page Not Found</p>
        <Link to="/" className="">
          <button className="bg-blue-500 text-white px-4 py-2 text-lg font-semibold rounded-lg">
            Go back to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
