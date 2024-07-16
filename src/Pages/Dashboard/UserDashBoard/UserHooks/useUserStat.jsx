import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const useUserStat = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure()
    const {data: stat, isLoading: statLoad} = useQuery({
        queryKey: ['userStat'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/userStat?email=${user.email}`)
            return res.data;
        }
    })
    return [stat, statLoad]
}
export default useUserStat;