
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Pages/Dashboard/Admin/AdminHooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Loading from "../Pages/Shared/Loading/Loading";



const AdminRoute = ({children}) => {
    const {user, loading}= useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    if(loading || isAdminLoading){
        return <Loading></Loading>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/' state={{from: location}}  replace></Navigate>
};

export default AdminRoute;