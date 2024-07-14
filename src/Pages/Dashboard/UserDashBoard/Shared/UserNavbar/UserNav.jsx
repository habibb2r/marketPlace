import { Link, NavLink } from "react-router-dom";
import logo from "../../../../../assets/Logo/Logo.png";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

import home from '../../../../../icons/home-page.png'
import allproducts from '../../../../../icons/allproducts.png'
import dashboard from '../../../../../icons/dashboard.png'
import cartlogo from '../../../../../icons/cart.png'
import userHome from '../../../../../icons/userHome.png'
import cartUser from '../../../../../icons/userfull-cart.png'
import ratingUser from '../../../../../icons/give rating.png'
import payhist from '../../../../../icons/payment history.png'
import status from '../../../../../icons/status.png'
import userDash from '../../../../../icons/user-Dash.png'
import useAuth from "../../../../../Hooks/useAuth";
import useCart from "../../../../../Hooks/useCart";

const UserNav = () => {
    const [cart] = useCart()
    const {user, logOut} = useAuth()
    const handleLogOut = ()=>{
        logOut()
        .then(()=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Logout successfully",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => console.log(error))
    }
    return (
        <div className="z-20 h-full fixed w-[250px] bg-opacity-40 bg-base-100 py-3">
        <div className="flex flex-col justify-between items-start h-full">
          <div>
            <img className="h-[80px] mx-auto" src={logo} alt="Logo" />
            <h1 className=" flex items-center gap-2 pt-2"> <p className="text-2xl font-semibold font-mono">User Dashboard </p><img className="h-[35px]" src={userDash} alt="" /></h1>
          </div>
          <div className="shadow-sm rounded-md p-1 flex flex-col justify-between items-start gap-7"> 
            <NavLink className='flex justify-start items-center gap-2' to='userhome'><img className="h-[35px]" src={userHome} alt="Home" /> <p>User Home</p></NavLink>
            <NavLink className='flex justify-start items-center gap-2' to='cart'><img className="h-[35px]" src={cartUser} alt="All Products" /><p>Cart Items</p><span className="badge badge-accent">+{cart.length}</span></NavLink>
            <NavLink className='flex justify-start items-center gap-2' to='giverating'><img className="h-[35px]" src={ratingUser} alt="Dashboard" /><p>Give Rating</p></NavLink>
            <NavLink className='flex justify-start items-center gap-2' to='payhistory'><img className="h-[35px]" src={payhist} alt="Dashboard" /><p>Payment History</p></NavLink>
            <NavLink className='flex justify-start items-center gap-2' to='orderstatus'><img className="h-[35px]" src={status} alt="Dashboard" /><p>Order Status</p></NavLink>
          </div>
          <div className="divider divider-success"></div>
          <div className="flex flex-col items-center gap-5 font-semibold text-md mt-5">
          <NavLink className='flex justify-start items-center gap-2' to='/'><img className="h-[40px]" src={home} alt="Home" /><p>Home</p></NavLink>
            <Link to='/'></Link>
            {
              user ? 
              <button onClick={handleLogOut} className="btn btn-active btn-secondary text-md">Logout</button> 
              : 
              <Link to='/login' className="btn btn-active btn-accent text-xl">Login</Link>
            }
            <label className="flex cursor-pointer gap-2 mt-5">
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
        </div>
      </div>
    );
};

export default UserNav;