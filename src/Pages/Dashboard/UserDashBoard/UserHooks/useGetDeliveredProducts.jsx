import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const useGetDeliveredProducts = () => {
    const axiosSecure = useAxiosSecure()
    const { data: getAllDeliveredProducts, refetch, isLoading } = useQuery({
        queryKey: ['getAllDeliveredProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/getAllDeliveredProducts')
            return res.data
        }
    })
    return [getAllDeliveredProducts, refetch, isLoading]
};

export default useGetDeliveredProducts;