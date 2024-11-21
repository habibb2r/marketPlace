import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useConnect = () => {
    const axiosSecure = useAxiosSecure()
        const now = new Date();
        const date = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
       const data = {
        date: date,
        time: time,
        browser: navigator.userAgent,
        platform: navigator.platform, 
        language: navigator.language,
       }

    
    const {data: preloader, isLoading} = useQuery({
        queryKey: ['connect'],
        queryFn: async()=>{
            const result = await axiosSecure.post('/connect', data)
            return result.data
        }
    })
    return [preloader, isLoading]
};

export default useConnect;