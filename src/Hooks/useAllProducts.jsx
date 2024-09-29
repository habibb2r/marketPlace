
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAllProducts = ({filter, sort}) => {
    console.log(sort, filter)
    const axiosSecure = useAxiosSecure()
    const { data : allItems, refetch: refetchAllItems, isLoading: loadItems} = useQuery({
        queryKey: ['allProducts'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`${import.meta.env.VITE_backend_server}/allProducts/${filter}?sort=${sort}`)
            return res.data
        }
    })
    return [allItems, refetchAllItems, loadItems]
};

export default useAllProducts;