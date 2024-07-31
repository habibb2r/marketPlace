import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";


const useSellerInfo = () => {
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth()
    const{data: sellerInfo={}, refetch, isLoading} = useQuery({
        queryKey: ["sellerInfo"],
        enabled:  !loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/sellerInfo?email=${user.email}`)
            return res.data
        }
    })
    return [sellerInfo, refetch, isLoading]
};

export default useSellerInfo;