import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useShopDetails = (id) => {

    const axiosSecure = useAxiosSecure()
    const {data: shopDetails= [], isLoading} = useQuery({
        queryKey: ['shopDetails'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/shopDetails/${id.id}`)
            return res.data
        }
    })
    return [shopDetails, isLoading]
};

export default useShopDetails;