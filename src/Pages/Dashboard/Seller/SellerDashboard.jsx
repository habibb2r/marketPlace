
import SellerNav from './Shared/SellerNav';
import { Outlet } from 'react-router-dom';

const SellerDashboard = () => {
    return (
        <>
            <SellerNav></SellerNav>
            <div className="ml-[250px] pt-[3%] pl-5">
            <Outlet></Outlet>
            </div>
        </>
    );
};

export default SellerDashboard;