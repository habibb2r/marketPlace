import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import useCart from "../../../Hooks/useCart";
import useGetUserInfo from "../../Dashboard/UserDashBoard/UserHooks/useGetUserInfo";
import Loading from "../Loading/Loading";

import logo from "../../../assets/Logo/Logo.png";
import home from '../../../icons/home-page.png';
import allproducts from '../../../icons/allproducts.png';
import dashboard from '../../../icons/dashboard.png';
import cartlogo from '../../../icons/cart.png';
import adminpanel from '../../../assets/adminpanel.png';
import sellerdash from '../../../assets/sellerdash.png';
import menu from '../../../assets/basic/001-menu-bar.png';
import cancel from '../../../assets/basic/002-button.png';
import guestPic from '../../../assets/basic/do-not.png';
import noPic from '../../../assets/basic/no-photo.png';

import './Navbar.css';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Navbar = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [cart] = useCart();
  const { user, logOut } = useContext(AuthContext);
  const [userInfo, refetch, isLoading] = useGetUserInfo();
  const axiosSecure = useAxiosSecure()

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(JSON.parse(savedMode));
    }
  }, []);

  const handleChangeTheme = () => {
    const newMode = !mode;
    setMode(newMode);
    localStorage.setItem('themeMode', JSON.stringify(newMode));
  };

  const controlNav = () => setClicked(!clicked);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/", { replace: true });
      })
      .catch(error => console.error(error));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="z-20 max-w-screen-xl fixed w-full mx-auto bg-opacity-35 bg-base-100 px-2 py-4 md:py-3">
      <div className="flex justify-between items-center">
        <img className="h-[65px] md:h-[80px]" src={logo} alt="Logo" />

        <div onClick={controlNav} className={`flex items-center gap-5 font-semibold text-md ${clicked ? 'navbar-res' : 'navbar-res navbar-active'}`}>
          <Link className="flex items-center gap-2 md:tooltip md:tooltip-bottom" data-tip="Home" to="/">
            <img className="h-[40px]" src={home} alt="Home" />
            <span className="block md:hidden">Home</span>
          </Link>
          <Link className="flex items-center gap-2 md:tooltip md:tooltip-bottom" data-tip="All Products" to="/allProducts">
            <img className="h-[35px]" src={allproducts} alt="All Products" />
            <span className="block md:hidden">All Products</span>
          </Link>
          {
            user ? <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-5 md:px-2">
            {userInfo?.role === 'admin' && (
            <Link className="flex items-center gap-2 md:tooltip md:tooltip-bottom" data-tip="Admin Panel" to="/adminpanel/adminhome">
              <img className="h-[35px]" src={adminpanel} alt="AdminPanel" />
              <span className="block md:hidden">Admin Panel</span>
            </Link>
          )}
          {userInfo?.role === 'customer' && (
            <>
              <Link className="flex items-center gap-2 md:tooltip md:tooltip-bottom" data-tip="Dashboard" to="/dashboard/userhome">
                <img className="h-[35px]" src={dashboard} alt="Dashboard" />
                <span className="block md:hidden">Dashboard</span>
              </Link>
              <Link className="flex items-center gap-2 md:tooltip md:tooltip-bottom" data-tip="Cart" to="/dashboard/cart">
                <div className="relative text-primary">
                  <img className="h-[42px]" src={cartlogo} alt="Cart" />
                  <div className="badge badge-md badge-primary absolute top-[-15px] right-[-10px]">{cart?.length || 0}</div>
                </div>
                <span className="block md:hidden">Cart</span>
              </Link>
            </>
          )}
          {userInfo?.role === 'seller' && (
            <Link className="flex items-center gap-2 md:tooltip md:tooltip-bottom" data-tip="Seller Dashboard" to="/sellerdashboard/sellerprofile">
              <img className="h-[35px]" src={sellerdash} alt="Seller Dashboard" />
              <span className="block md:hidden">Seller Dashboard</span>
            </Link>
          )}</div> : ''
          }
          {user ? (
            userInfo?.picture ? (
              <div className="flex items-center gap-2 lg:tooltip lg:tooltip-bottom" data-tip={userInfo?.name}>
                <img className="h-[42px] w-[42px] rounded-full shadow-md shadow-success border-2 border-success" src={userInfo?.picture} alt="User" />
                <span className="block md:hidden">{userInfo?.name}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 md:tooltip md:tooltip-bottom" data-tip={userInfo?.name}>
                <img className="h-[42px] w-[42px] rounded-full" src={noPic} alt="User" />
                <span className="block md:hidden">{userInfo?.name}</span>
              </div>
            )
          ) : (
            <div className="md:tooltip md:tooltip-bottom" data-tip="Guest">
              <img className="h-[42px] w-[42px]" src={guestPic} alt="Guest" />
            </div>
          )}
          {user ? (
            <button onClick={handleLogOut} className="btn btn-active btn-secondary text-md">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-active btn-accent text-xl">
              Login
            </Link>
          )}
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
              onChange={handleChangeTheme}
              checked={mode}
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
          <img onClick={controlNav} className="h-[40px]" src={clicked ? cancel : menu} alt="Menu" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
