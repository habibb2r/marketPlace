import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../Pages/Shared/Loading/Loading";
import useSeller from "../Pages/Dashboard/Seller/SellerHooks/useSeller";



const SellerRoute = ({children}) => {
    const {user, loading}= useAuth();
    const [isSeller, isSellerLoading] = useSeller();
    const location = useLocation();
    if(loading || isSellerLoading){
        return <Loading></Loading>
    }
    if(user && isSeller){
        return children;
    }
    return <Navigate to='/' state={{from: location}}  replace></Navigate>
};

export default SellerRoute;