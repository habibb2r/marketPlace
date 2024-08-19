import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useSellerInfo from "./useSellerInfo";


const useGetShopItems = () => {
    const axiosSecure = useAxiosSecure()
    const [sellerInfo, , isLoading] =useSellerInfo();
    const id = sellerInfo?.sellerProfile?.stall_id;
    const {data: getAllShopItems, refetch, isLoading: shopItemLoad} = useQuery({
        queryKey: ['getShopItems'],
        enabled: !isLoading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/manageItems/${id}`)
            return res.data
        }
    })
    return [getAllShopItems, refetch, shopItemLoad]
};

export default useGetShopItems;