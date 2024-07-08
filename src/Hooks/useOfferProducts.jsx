import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useOfferProducts = () => {

    const axiosSecure = useAxiosSecure();
    const {data: offers=[], isLoading} = useQuery({
        queryKey: ['offers'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/offers')
            return res.data
        }
    })
    return [offers, isLoading]
};

export default useOfferProducts;