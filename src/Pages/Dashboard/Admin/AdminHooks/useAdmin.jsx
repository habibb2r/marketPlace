import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";



const useAdmin = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isAdmin , isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/isadmin?email=${user?.email}`);
            return res.data.isAdmin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;