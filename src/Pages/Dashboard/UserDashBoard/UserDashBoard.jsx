import { Outlet } from "react-router-dom";
import UserNav from "./Shared/UserNavbar/UserNav";


const UserDashBoard = () => {
    return (
        <>
        <UserNav></UserNav>
        <div className="md:ml-[250px] pt-[3%] md:pl-5">
        <Outlet></Outlet>
        </div>
       
        </>
    );
};

export default UserDashBoard;