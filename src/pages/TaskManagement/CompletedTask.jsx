import { useDrag } from "react-dnd";

import useGetTasks from "../../hooks/useGetTasks";
import { MdDeleteSweep } from "react-icons/md";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { enqueueSnackbar } from "notistack";
import { IoMenuOutline } from "react-icons/io5";
import Loader from "../../components/Loader";

const Task = ({ task, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const handleDeleteTask = (id) => {
    axiosPublic
      .delete(`/delete/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          enqueueSnackbar("Task deleted Successfully", { variant: "success" });
          refetch();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <tr
      className="bg-gray-200 text-center my-2 "
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <td className="p-2">
        <IoMenuOutline className="" />
      </td>
      <td className="font-semibold border p-2 text-left">{task.title}</td>
      <td className="border p-2">{task.description}</td>
      <td className="border p-2">{task.deadline.slice(0, 10)}</td>
      <td className="border p-2">{task.priority.label}</td>
      <td className="border p-2">
        <button onClick={() => handleDeleteTask(task._id)}>
          <MdDeleteSweep className="text-xl text-red-500" />
        </button>
      </td>
    </tr>
  );
};

const CompletedTask = () => {
  const { tasks, refetch, isFetching } = useGetTasks({ status: "Completed" });

  return (
    <div>
      <h2 className="text-center my-10 text-4xl font-semibold">
        Completed Tasks
      </h2>
      {isFetching ? (
        <Loader color={"#86EFAC"} />
      ) : (
        <>
          {tasks.length === 0 ? (
            <p className="text-center font-semibold text-red-500 text-xl">
              There is no completed task
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border">
                <thead className=" bg-green-200">
                  <tr>
                    <th className="p-2"></th>
                    <th className="border p-2 text-left">Task</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2">Deadline</th>
                    <th className="border p-2">Priority</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks?.map((task, index) => (
                    <Task key={index} task={task} refetch={refetch} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CompletedTask;
