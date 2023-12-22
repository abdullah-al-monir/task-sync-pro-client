import { useDrag } from "react-dnd";

import useGetTasks from "../../hooks/useGetTasks";
import { MdDeleteSweep } from "react-icons/md";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { enqueueSnackbar } from "notistack";

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
    <li
      className="bg-green-200 p-2 rounded-lg flex justify-between items-center text-center my-2"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h3 className="font-semibold">{task.title}</h3> <p>{task.description}</p>{" "}
      <p>{task.deadline.slice(0, 10)}</p>
      <p>{task.priority.label}</p>
      <button onClick={() => handleDeleteTask(task._id)}>
        <MdDeleteSweep className="text-xl text-red-500" />
      </button>
    </li>
  );
};

const CompletedTask = () => {
  const { tasks, refetch } = useGetTasks({ status: "Completed" });

  return (
    <div>
      <h2 className="text-center my-10 text-4xl font-semibold">
        Completed Tasks
      </h2>
      <ul>
        {tasks?.map((task, index) => (
          <Task key={index} task={task} refetch={refetch} />
        ))}
      </ul>
    </div>
  );
};

export default CompletedTask;
