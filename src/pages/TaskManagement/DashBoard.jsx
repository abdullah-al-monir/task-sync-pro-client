import useAuth from "../../hooks/useAuth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { enqueueSnackbar } from "notistack";
import useGetTasks from "../../hooks/useGetTasks";
const Dashboard = () => {
  const { user, logOut } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { refetch } = useGetTasks();
  const handleDrop = (status) => (item) => {
    console.log(status);
    axiosPublic
      .patch(`/update/${item.task._id}`, { status: status })
      .then((res) => {
        if (res.data.modifiedCount) {
          enqueueSnackbar(`Task moved to ${status}`, {
            variant: "success",
            autoHideDuration: 1500,
          });
          refetch();
          navigate(`/tasks/${status.toLowerCase()}`);
        }
      })
      .catch((error) => console.log(error));
  };

  const [{ isOver: isOverTodo }, dropTodo] = useDrop({
    accept: "TASK",
    drop: handleDrop("Todo"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOverOngoing }, dropOngoing] = useDrop({
    accept: "TASK",
    drop: handleDrop("Ongoing"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOverCompleted }, dropCompleted] = useDrop({
    accept: "TASK",
    drop: handleDrop("Completed"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleLogOut = () => {
    logOut();
    navigate("/");
    enqueueSnackbar("User logged out successfully", {
      variant: "success",
      autoHideDuration: 1500,
    });
  };

  return (
    <div className="mt-8 flex flex-col">
      <div className="flex flex-col items-center justify-center gap-5 my-10">
        <img className="rounded-full w-24 h-24" src={user?.photoURL} alt="" />
        <h4 className="text-2xl  font-bold">{user?.displayName}</h4>
      </div>
      <div className="md:hidden ">
        <Link
          className="bg-lime-600 w-full block text-center hover:bg-lime-700 text-white px-2 py-1 rounded-lg text-sm md:text-base font-semibold my-2"
          to="/"
        >
          Home
        </Link>
        <button
          onClick={handleLogOut}
          className="bg-red-600 w-full hover:bg-red-700 text-white px-2 py-1 rounded-lg text-sm md:text-base font-semibold"
        >
          Log Out
        </button>
        <hr className="my-5" />
      </div>
      <nav className="w-full">
        <ul>
          <li className="w-full p-2 my-2 text-lg font-semibold bg-blue-400">
            <NavLink className="w-full block" to="/tasks/create-task">
              Create Task
            </NavLink>
          </li>
          <li
            className="w-full p-2 my-2 text-lg font-semibold bg-teal-400"
            ref={dropTodo}
            style={{ border: isOverTodo ? "1px dashed green" : "none" }}
          >
            <NavLink className="w-full block" to="/tasks/todo">
              Todo
            </NavLink>
          </li>
          <li
            className="w-full p-2 my-2 text-lg font-semibold bg-yellow-400"
            ref={dropOngoing}
            style={{ border: isOverOngoing ? "1px dashed green" : "none" }}
          >
            <NavLink className="w-full block" to="/tasks/ongoing">
              Ongoing
            </NavLink>
          </li>
          <li
            className="w-full p-2 my-2 text-lg font-semibold bg-green-400"
            ref={dropCompleted}
            style={{ border: isOverCompleted ? "1px dashed green" : "none" }}
          >
            <NavLink className="w-full block" to="/tasks/completed">
              Completed
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="hidden md:block">
        <hr className="my-5" />
        <Link
          className="bg-lime-600 w-full block text-center hover:bg-lime-700 text-white px-2 py-1 rounded-lg text-sm md:text-base font-semibold my-2"
          to="/"
        >
          Home
        </Link>
        <button
          onClick={handleLogOut}
          className="bg-red-600 w-full hover:bg-red-700 text-white px-2 py-1 rounded-lg text-sm md:text-base font-semibold"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
