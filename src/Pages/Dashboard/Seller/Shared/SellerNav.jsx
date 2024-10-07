import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../../assets/Logo/Logo.png";
import Swal from "sweetalert2";
import sellerProfile from "../../../../assets/seller/001-profile.png";
import addItems from "../../../../assets/seller/002-add-item.png";
import manageItems from "../../../../assets/seller/003-clipboard.png";
import manageOrders from "../../../../assets/seller/004-order.png";
import useAuth from "../../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import menu from "../../../../assets/basic/001-menu-bar.png";
import cancel from "../../../../assets/basic/002-button.png";
import "../../dashboard.css";

const SellerNav = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(JSON.parse(savedMode));
    }
  }, []);

  const handleChangeTheme = () => {
    const newMode = !mode;
    setMode(newMode);
    localStorage.setItem("themeMode", JSON.stringify(newMode));
  };

  const from = "/";

  const { user, logOut } = useAuth();
  const [clicked, setClick] = useState(false);
  const controlNav = () => {
    setClick(!clicked);
  };
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate(from, { replace: true });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      className={`z-20 h-full fixed w-[200px] md:w-[250px] md:bg-opacity-40 bg-base-100 py-3 px-2 md:px-4 shadow-md shadow-success hover-nav ${
        clicked ? "" : "my-nav"
      }`}
    >
      <div className="relative block md:hidden">
        <img
          onClick={() => controlNav()}
          className="top-[35px] right-[-60px] absolute h-[40px]"
          src={clicked ? cancel : menu}
          alt=""
        />
      </div>
      <div
        onClick={() => controlNav()}
        className="flex flex-col justify-start items-start h-full"
      >
        <div>
          <NavLink
            className="flex justify-start items-center gap-2 tooltip tooltip-right tooltip-accent"
            data-tip="Home"
            to="/"
          >
            <img className="h-[80px] mx-auto" src={logo} alt="Logo" />
          </NavLink>
        </div>
        <div className="shadow-sm rounded-md p-1 flex flex-col justify-center items-start gap-3">
          <NavLink
            className={({ isActive }) =>
              `w-full px-3 py-3 rounded-md flex justify-start items-center gap-2 ${
                isActive ? "shadow-inner shadow-success" : ""
              }`
            }
            to="sellerprofile"
          >
            <img className="h-[35px]" src={sellerProfile} alt="Home" />{" "}
            <p>Seller Profile</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `w-full px-3 py-3 rounded-md flex justify-start items-center gap-2 ${
                isActive ? "shadow-inner shadow-success" : ""
              }`
            }
            to="additemcategory"
          >
            <img className="h-[35px]" src={addItems} alt="All Products" />
            <p>Add Items</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `w-full px-3 py-3 rounded-md flex justify-start items-center gap-2 ${
                isActive ? "shadow-inner shadow-success" : ""
              }`
            }
            to="manageitems"
          >
            <img className="h-[35px]" src={manageItems} alt="Dashboard" />
            <p>Manage Items</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `w-full px-3 py-3 rounded-md flex justify-start items-center gap-2 ${
                isActive ? "shadow-inner shadow-success" : ""
              }`
            }
            to="manageorders"
          >
            <img className="h-[35px]" src={manageOrders} alt="Dashboard" />
            <p>Manage Orders</p>
          </NavLink>
        </div>
        <div className="divider divider-success"></div>
        <div className="flex flex-col md:flex-row items-center gap-5 font-semibold text-md mt-2">
          <Link to="/"></Link>
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-active btn-secondary text-md"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-active btn-accent text-xl">
              Login
            </Link>
          )}
          <label className="flex cursor-pointer gap-2 mt-5 md:mt-0">
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
      </div>
    </div>
  );
};

export default SellerNav;
