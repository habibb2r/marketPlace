import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdminStats = () => {

    const axiosSecure = useAxiosSecure()
    const {data: adminstat, refetch, isLoading: loadStat} = useQuery({
        queryKey: ['adminstats'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/adminstats')
            return res.data
        }
    })
    return [adminstat, refetch, loadStat]
};

export default useAdminStats;