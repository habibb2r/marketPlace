import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useGetUserInfo from "./useGetUserInfo";

const useMyReview = () => {
    const [userInfo, , isLoading] = useGetUserInfo()
    const axiosSecure = useAxiosSecure()
    const { data: myReviews , refetch, isLoading: loadReview } = useQuery({
        queryKey: ['myReviews'],
        enabled: !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myReviews?email=${userInfo?.email}`)
            return res.data
        },
    })
    return [myReviews, refetch, loadReview]
};

export default useMyReview;