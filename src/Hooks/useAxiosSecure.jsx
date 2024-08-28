import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "https://market-server-two.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
