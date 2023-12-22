import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { enqueueSnackbar } from "notistack";
const SignUp = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { createUser, googleSignIn, setUser } = auth;
  const [error, setError] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("SignIn: ", name, email, password);
    if (password.length < 6) {
      return setError("Password should be at least 6 characters long.");
    }

    if (!/[A-Z]/.test(password)) {
      return setError("Password should contain at least one capital letter.");
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      return setError(
        "Password should contain at least one special character."
      );
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateProfile(user, { displayName: name, photoURL: photo }).then(() => {
          // update the user name and photo after creating user
          setUser((currentUser) => {
            currentUser.displayName = name;
            currentUser.photoURL = photo;
            e.target.reset();
            navigate("/tasks/create-task");
            return enqueueSnackbar("User created successfully", {
              variant: "success",
              autoHideDuration: 1500,
            });
          });
        });
      })
      .catch((error) => {
        let errorMessage = "An error occurred while creating the user account.";

        if (error.code === "auth/email-already-in-use") {
          errorMessage =
            "The email address is already in use. Please use a different email.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address.";
        } else if (error.code === "auth/weak-password") {
          errorMessage =
            "The password is too weak. Please choose a stronger password.";
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
          <h1 className="mb-5 text-xl font-light text-left text-gray-800 sm:text-center">
            Sign up to create and manage todo!
          </h1>
          <form onSubmit={handleSignUp} className="pb-1 space-y-4">
            <label className="block">
              <span className="block mb-1 text-md font-medium text-gray-700">
                Name
              </span>
              <input
                className="w-full p-1 border"
                type="text"
                name="name"
                placeholder="Your full name"
                required
              />
            </label>
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
                Photo
              </span>
              <input
                className="w-full p-1 border"
                type="text"
                name="photo"
                placeholder="Your Photo URL"
                required
              />
            </label>
            <label className="block">
              <span className="block mb-1 text-md font-medium text-gray-700">
                Create a password
              </span>
              <input
                className="w-full p-1 border"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </label>

            <label className="">
              <span className="block ml-2 text-sm mt-1 font-medium text-gray-700 cursor-pointer">
                Use at least 6 characters, one uppercase, one lowercase and one
                special character.
              </span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="block ml-2 text-md font-medium text-gray-700 cursor-pointer">
                Agree to Privacy Policy
              </span>
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
                className="flex items-center justify-center w-full px-10 py-2.5 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-orange-600 rounded-xl hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign Up
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
          Already have an account?
          <Link to="/signIn" className="text-blue-700 hover:text-blue-900">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
