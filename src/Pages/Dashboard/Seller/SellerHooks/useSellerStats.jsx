
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useSellerInfo from './useSellerInfo';

const useSellerStats = () => {
    const [sellerInfo, , isLoading] = useSellerInfo()
    const axiosSecure = useAxiosSecure()
    const {data: sellerStats, refetch, isLoading: loadSellerStat} = useQuery({
        queryKey: ['sellerStats'],
        enabled: !isLoading,
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/sellerStats/${sellerInfo.sellerProfile?.stall_id}`)
            return res.data
        }
    })
    return [sellerStats, refetch, loadSellerStat]
};

export default useSellerStats;