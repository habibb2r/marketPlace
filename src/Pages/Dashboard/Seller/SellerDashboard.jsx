
import SellerNav from './Shared/SellerNav';
import { Outlet } from 'react-router-dom';

const SellerDashboard = () => {
    return (
        <>
            <SellerNav></SellerNav>
            <div className="md:ml-[250px] px-2 pt-[3%] md:pl-5">
            <Outlet></Outlet>
            </div>
        </>
    );
};

export default SellerDashboard;