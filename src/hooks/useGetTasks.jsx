// api, axios (axios secure), tan stack
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useGetTasks = ({ status }) => {
  console.log(status);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: tasks = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["tasks", user?.email, status],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/tasks?email=${user.email}&status=${status}`
      );
      return res.data;
    },
  });

  return { tasks, refetch, isFetching };
};

export default useGetTasks;
