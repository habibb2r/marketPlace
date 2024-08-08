import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const useFeatureList = (cate) => {
    const axiosSecure = useAxiosSecure();
    const {data: featureList, isLoading, refetch} = useQuery({
        queryKey: ['featureList'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/featureList?category=${cate}`)
            return res.data
        }
    })
    return [featureList, refetch, isLoading]
};

export default useFeatureList;