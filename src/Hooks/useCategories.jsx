import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCategories = () => {
    const axiosSecure = useAxiosSecure();
  const { data: categ, isLoading} = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosSecure.get("/homeCategories")
        return res.data
    },
  });
  return [categ, isLoading];
};

export default useCategories;
