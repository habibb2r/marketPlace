import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";


const useGetUserInfo = () => {
    const {user, loading}= useAuth()
    console.log(user.email)
    const axiosSecure = useAxiosSecure()
    const {data: userInfo, isLoading}= useQuery({
        queryKey: ['userInfo'],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/userInfo?email=${user? user.email : false}`)
            return res.data
        }
    })
    return [userInfo, isLoading]
};

export default useGetUserInfo;