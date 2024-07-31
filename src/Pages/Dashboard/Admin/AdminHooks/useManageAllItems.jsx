import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const useManageAllItems = () => {
    const axiosSecure = useAxiosSecure()
    const {data : manageAllItems=[], refetch, isLoading} = useQuery({
        queryKey: ['manageAllItems'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/manageAllItems')
            return res.data
        }
    })
    return [manageAllItems, refetch, isLoading]
};

export default useManageAllItems;