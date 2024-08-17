import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useSellerInfo from './useSellerInfo';

const useManageOrders = () => {
    const [sellerInfo, , isLoading] =useSellerInfo();
    const id = sellerInfo?.sellerProfile?.stall_id;
    console.log(id);
    const axiosSecure = useAxiosSecure();
    const {data: getOrderSeller, refetch, isLoading: orderLoading} = useQuery({
        queryKey: ['getOrderSeller'],
        enabled: !isLoading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/getOrderSeller/${id}`)
            return res.data
        }
    })
    return [getOrderSeller, refetch, orderLoading]
};

export default useManageOrders;