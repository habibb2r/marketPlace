import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';

const useOrderStatus = () => {
    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()

    const {data: orderStatus, refetch, isLoading: orderLoad} = useQuery({
        queryKey: ['orderStatus'],
        enabled:!loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/orderStatus?email=${user.email}`)
            return res.data
        }
    })
    return [orderStatus, refetch, orderLoad]
};

export default useOrderStatus;