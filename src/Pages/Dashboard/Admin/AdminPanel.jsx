import { Outlet } from "react-router-dom";
import AdminNav from "./Shared/AdminNav";


const AdminPanel = () => {
    return (
        <>
            <AdminNav></AdminNav>
            <div className="ml-[250px] pt-[3%] pl-5">
            <Outlet></Outlet>
            </div>
            
        </>
    );
};

export default AdminPanel;