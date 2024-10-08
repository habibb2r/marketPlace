import { Outlet } from "react-router-dom";
import AdminNav from "./Shared/AdminNav";


const AdminPanel = () => {
    return (
        <>
            <AdminNav></AdminNav>
            <div className="md:ml-[250px] pt-[3%] md:pl-5">
            <Outlet></Outlet>
            </div>
            
        </>
    );
};

export default AdminPanel;