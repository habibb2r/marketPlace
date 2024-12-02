import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useConnectToServer = () => {
    const axiosSecure = useAxiosSecure()
    const { data: connectToServer , isLoading: serverLoading} = useQuery({
        queryKey: ["connectToServer"],
        queryFn: async () => {
            const response = await axiosSecure.get("/connect");
            return response.data;
        }
    })
    return [connectToServer, serverLoading ]
};

export default useConnectToServer;