import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const useCategoryChart = () => {
    const axiosSecure = useAxiosSecure()
    const {data: cateChart, refetch, isLoading}= useQuery({
        queryKey: ['cateChart'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/categorysellchart')
            return res.data
        }
    })
    return [cateChart, refetch, isLoading]
};

export default useCategoryChart;