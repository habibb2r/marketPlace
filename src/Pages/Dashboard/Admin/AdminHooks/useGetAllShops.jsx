import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const useGetAllShops = () => {

    const axiosSecure = useAxiosSecure()
    const {data: allshops, refetch, isLoading: loadShops} = useQuery({
        queryKey: ['allshops'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/manageShops')
            return res.data
        }
    }) 
    return [allshops, refetch, loadShops]
};

export default useGetAllShops;