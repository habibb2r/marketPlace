import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useBuyShop = () => {
 
    const axiosSecure = useAxiosSecure()
    const {data: buyShop=[], isLoading} = useQuery({
        queryKey:['buyShop'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/buyShop')
            return res.data
        }
    })
    return [buyShop, isLoading]
};

export default useBuyShop;