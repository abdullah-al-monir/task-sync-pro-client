import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { enqueueSnackbar } from "notistack";
const SignIn = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { signInUser, googleSignIn } = auth;
  const [error, setError] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("SignIn: ", email, password);

    signInUser(email, password)
      .then(() => {
        e.target.reset();
        navigate("/tasks/todo");
        return enqueueSnackbar("User logged in successfully", {
          variant: "success",
          autoHideDuration: 1500,
        });
      })
      .catch((error) => {
        let errorMessage = "An error occurred while creating the user account.";

        if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password.";
        }

        return setError(errorMessage);
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigate("/tasks/create-task");
        return enqueueSnackbar("User logged in successfully!", {
          variant: "success",
          autoHideDuration: 1500,
        });
      })
      .catch(() => {
        let errorMessage = "An error occurred while creating the user account.";
        return setError(errorMessage);
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="px-4 py-20 mx-auto max-w-7xl">
        <Link
          to="/"
          title="Task Sync Pro Home Page"
          className="flex items-center justify-start sm:justify-center"
        >
          <img className="h-20" src="/logo.png" alt="" />
          <span className="font-bold text-2xl">Task Sync Pro</span>
        </Link>
        <div className="w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 border-gray-200 rounded-lg md:bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5">
          <h1 className="mb-5 text-xl font-bold text-left text-gray-800 sm:text-center ">
            Sign In
          </h1>
          <form onSubmit={handleSignIn} className="pb-1 space-y-4">
            <label className="block">
              <span className="block mb-1 text-md font-medium text-gray-700">
                Your Email
              </span>
              <input
                className="w-full p-1 border"
                type="email"
                name="email"
                placeholder="Ex. james@bond.com"
                required
              />
            </label>
            <label className="block">
              <span className="block mb-1 text-md font-medium text-gray-700">
                Password
              </span>
              <input
                className="w-full p-1 border"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </label>
            {error && (
              <label className="">
                <span className="block ml-2 text-md font-medium text-gray-700 cursor-pointer">
                  {error}
                </span>
              </label>
            )}

            <div>
              <button
                type="submit"
                className="flex items-center justify-center w-full px-10 py-2.5 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-neutral-600 bg-white">
                Or continue with
              </span>
            </div>
          </div>
          <div>
            <button
              onClick={handleGoogleSignIn}
              className="w-full items-center block px-10 py-2.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <div className="flex items-center justify-center">
                <FcGoogle className="text-xl" />
                <span className="ml-4"> Sign in with Google</span>
              </div>
            </button>
          </div>
        </div>
        <p className="my-0 text-md font-medium text-center text-gray-700 sm:my-5">
          Don't have an account?
          <Link to="signUp" className="text-blue-700 hover:text-blue-900">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
