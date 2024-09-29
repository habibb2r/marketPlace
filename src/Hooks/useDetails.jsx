import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from './useAxiosSecure';


const useDetails = (itemId) => {
    const id = itemId.id
    
    const axiosSecure = useAxiosSecure()
    const {data : details, refetch: itemRefetch, isLoading } = useQuery({
        queryKey: ['details'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/details/${id}`)
            return res.data
        }
    })
    return [details, itemRefetch, isLoading]
};

export default useDetails;