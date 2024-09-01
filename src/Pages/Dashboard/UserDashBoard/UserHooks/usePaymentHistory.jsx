import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";


const usePaymentHistory = () => {
    const { user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: payHistory, isLoading} = useQuery({
        queryKey: ['payhistory'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payhistory?email=${user.email}`)
            return res.data
        }
    })
    return [payHistory, isLoading]
};

export default usePaymentHistory;