import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Pages/Shared/Loading/Loading";
import useGetUserInfo from "../Pages/Dashboard/UserDashBoard/UserHooks/useGetUserInfo";


const PrivateRoute = ({children}) => {
    const { user, loading} = useContext(AuthContext)
    const location = useLocation()
    const [userInfo, refetch, isLoading] = useGetUserInfo()

    if(loading){
        return <Loading></Loading>
    }

    if(user){
        if(userInfo?.role === 'customer'){
            return children
        }
        else{
            return <Navigate to='/' state={{from: location}} replace></Navigate>
        }
        
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;