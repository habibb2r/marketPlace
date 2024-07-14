import { Link } from "react-router-dom";
import logo from "../../../assets/Logo/Logo.png";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";
import home from '../../../icons/home-page.png'
import allproducts from '../../../icons/allproducts.png'
import dashboard from '../../../icons/dashboard.png'
import cartlogo from '../../../icons/cart.png'

const Navbar = () => {
  const [cart] = useCart()
  const {user, logOut} = useContext(AuthContext)
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
    <div className=" z-20 max-w-screen-xl fixed w-[100%]  mx-auto bg-opacity-35 bg-base-100 px-2 py-3">
      <div className="">
        <div className="flex justify-between items-center">
          <div>
            <img className="h-[80px]" src={logo} alt="" />
          </div>
          <div className="shadow-sm rounded-md p-1 font-thin"> Hey, {user? user.email : 'Login' }</div>
          <div className="flex align-middle items-center gap-5 font-semibold text-md">
            <Link to='/'><img className="h-[40px]" src={home} alt="Home" /></Link>
            <Link to='/allProducts'><img className="h-[35px]" src={allproducts} alt="All Products" /></Link>
            <Link to='/dashboard'><img className="h-[35px]" src={dashboard} alt="Dashboard" /></Link>
            <div className="text-primary relative">
            <img className="h-[42px]" src={cartlogo} alt="Cart" />
            <div className="badge badge-md badge-primary top-[-15px] right-[-10px] absolute">{cart?.length || 0}</div>
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
