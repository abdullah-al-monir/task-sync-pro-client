import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Select from "react-select";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
let priority = [
  { value: "low", label: "Low" },
  { value: "moderate", label: "Moderate" },
  { value: "high", label: "High" },
];
const CreateTask = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();
  const [date, setDate] = useState(new Date(Date.now()));
  const onSubmit = async (data) => {
    const taskData = {
      status: "Todo",
      email: user?.email,
      ...data,
    };
    try {
      const response = await axiosPublic.post("/create-task", taskData);
      if (response.status === 200) {
        enqueueSnackbar("Task created successfully", { variant: "success" });
        navigate("/tasks/todo");
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task!", error);
    }
  };
  const handleChange = (dateChange) => {
    setValue("deadline", dateChange, {
      shouldDirty: true,
    });
    setDate(dateChange);
  };
  const today = new Date();

  return (
    <div className="">
      <h2 className="text-center my-10 text-4xl font-semibold">Create Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            id="title"
            placeholder="Title"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            type="text"
            id="description"
            placeholder="description"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.description && (
            <span className="text-red-500">Description is required</span>
          )}
        </div>
        <div className="flex gap-5 ">
          <div className="mb-4 relative md:w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="deadline"
            >
              Deadline
            </label>
            <Controller
              name="deadline"
              control={control}
              defaultValue={date}
              render={() => (
                <DatePicker
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  selected={date}
                  placeholderText="Select date"
                  onChange={handleChange}
                  dateFormat="dd/MM/yyyy"
                  minDate={today}
                />
              )}
            />
          </div>

          <div className="mb-4 relative md:w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="priority"
            >
              Priority
            </label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={priority}
                  isSearchable
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  value={priority.find((c) => c.value === field.value)}
                />
              )}
              rules={{ required: true }}
            />
            {errors.priority && (
              <span className="text-red-500">Priority is required</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
