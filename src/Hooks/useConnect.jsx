import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useConnect = () => {
    const axiosSecure = useAxiosSecure()
    const {data: preloader, isLoading} = useQuery({
        queryKey: ['connect'],
        queryFn: async()=>{
            const result = await axiosSecure.get('/connect')
            return result.data
        }
    })
    return [preloader, isLoading]
};

export default useConnect;