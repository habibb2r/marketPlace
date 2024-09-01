import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_backend_server}`,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
