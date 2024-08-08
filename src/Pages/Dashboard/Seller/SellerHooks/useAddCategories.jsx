import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const useAddCategories = () => {
    const axiosSecure = useAxiosSecure()
    const {data: cateList, isLoading, refetch} = useQuery({
        queryKey: ['listCategories'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/listCategories')
            return res.data
        }
    })
    return [cateList, refetch, isLoading]
};

export default useAddCategories;