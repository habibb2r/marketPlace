import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";





const useSeller = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isSeller , isLoading: isSellerLoading} = useQuery({
        queryKey: ['isSeller', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/isseller?email=${user?.email}`);
            return res.data.isSeller;
        }
    })
    return [isSeller, isSellerLoading]
};

export default useSeller;