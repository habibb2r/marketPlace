import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';




const useGetItemInfo = (itemId) => {
    const id = itemId.id
    
    const axiosSecure = useAxiosSecure()
    const {data : itemDetails, refetch, isLoading } = useQuery({
        queryKey: ['itemdetails'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/details/${id}`)
            return res.data
        }
    })
    return [itemDetails, refetch, isLoading]
};

export default useGetItemInfo;