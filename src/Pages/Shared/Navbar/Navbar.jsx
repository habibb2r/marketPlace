import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo/Logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";
import home from '../../../icons/home-page.png'
import allproducts from '../../../icons/allproducts.png'
import dashboard from '../../../icons/dashboard.png'
import cartlogo from '../../../icons/cart.png'
import adminpanel from '../../../assets/adminpanel.png'
import sellerdash from '../../../assets/sellerdash.png'
import useGetUserInfo from "../../Dashboard/UserDashBoard/UserHooks/useGetUserInfo";
import Loading from "../Loading/Loading";
import menu from '../../../assets/basic/001-menu-bar.png'
import cancel from '../../../assets/basic/002-button.png'
import './Navbar.css'

const Navbar = () => {
 
  const navigate = useNavigate();
  // const location = useLocation();
  const from = "/";
  const [clicked, setClick] = useState(false)
  const [cart] = useCart()
  const {user, logOut} = useContext(AuthContext)
  const [userInfo, refetch, isLoading] = useGetUserInfo()
  if(isLoading){
    return <Loading></Loading>
  }

  const controlNav =()=>{
    setClick(!clicked)
  }
  const handleLogOut = ()=>{
      logOut()
      .then(()=>{
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from, { replace: true });
      })
      .catch(error => console.log(error))
  }
  return (
    <div className=" z-20 max-w-screen-xl fixed w-[100%]  mx-auto bg-opacity-35 bg-base-100 px-2 py-4 md:py-3">
      <div className="">
        <div className="flex justify-between items-center">
          <div>
            <img className="h-[65px] md:h-[80px]" src={logo} alt="" />
          </div>
          <div className="shadow-sm rounded-md p-1 font-thin"> Hey, {user? userInfo?.name : 'Guest' }</div>
          <div className={`flex align-middle items-center gap-5 font-semibold text-md ${clicked? 'navbar-res': 'navbar-res navbar-active'}`}>
            <Link to='/'><img className="h-[40px]" src={home} alt="Home" /></Link>
            <Link to='/allProducts'><img className="h-[35px]" src={allproducts} alt="All Products" /></Link>
            {
              userInfo?.role == 'admin'? <Link to='/adminpanel/adminhome'><img className="h-[35px]" src={adminpanel} alt="AdminPanel" /></Link> : ''
            }
            {
              userInfo?.role == 'customer'? <Link to='/dashboard/userhome'><img className="h-[35px]" src={dashboard} alt="Dashboard" /></Link> : ''
            }
            {
              userInfo?.role == 'seller'? <Link to='/sellerdashboard/sellerprofile'><img className="h-[35px]" src={sellerdash} alt="Dashboard" /></Link> : ''
            }
            {
              userInfo?.role == 'customer'? <Link to='/dashboard/cart' className="text-primary relative">
              <img className="h-[42px]" src={cartlogo} alt="Cart" />
              <div className="badge badge-md badge-primary top-[-15px] right-[-10px] absolute">{cart?.length || 0}</div>
              </Link> : ''
            }
            
            {
             user? <button onClick={handleLogOut} className="btn btn-active btn-secondary text-md">Logout</button> : <Link to='/login' className="btn btn-active btn-accent text-xl">Login</Link>
            }
            <label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                value="forest"
                className="toggle theme-controller"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>
          <div className="resposive-nav">
            <img onClick={()=>controlNav()} className="h-[40px]" src={clicked?cancel : menu} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
