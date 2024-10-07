import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../../assets/Logo/Logo.png";
import Swal from "sweetalert2";
import adminHome from "../../../../assets/admin/png/001-home.png";
import manageUser from "../../../../assets/admin/png/002-management.png";
import manageShop from "../../../../assets/admin/png/003-market.png";
import manageItems from "../../../../assets/admin/png/004-checklist.png";
import menu from "../../../../assets/basic/001-menu-bar.png";
import cancel from "../../../../assets/basic/002-button.png";
import useAuth from "../../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import "../../dashboard.css";

const AdminNav = () => {
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
  const [clicked, setClick] = useState(false);
  const { user, logOut } = useAuth();

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
      className={`z-20 h-full fixed w-[200px] md:w-[250px] md:bg-opacity-40 bg-base-100 py-3 px-2 md:px-4 shadow-md shadow-success ${
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
        <div className="shadow-sm rounded-md p-1 flex flex-col justify-between items-start gap-3">
          <NavLink
            className={({ isActive }) =>
              `w-full px-3 py-3 rounded-md flex justify-start items-center gap-2 ${
                isActive ? "shadow-inner shadow-success" : ""
              }`
            }
            to="adminhome"
          >
            <img className="h-[35px]" src={adminHome} alt="Home" />{" "}
            <p>Statictics</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `w-full px-3 py-3 rounded-md flex justify-start items-center gap-2 ${
                isActive ? "shadow-inner shadow-success" : ""
              }`
            }
            to="manageusers"
          >
            <img className="h-[35px]" src={manageUser} alt="All Products" />
            <p>Manage Users</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `w-full px-3 py-3 rounded-md flex justify-start items-center gap-2 ${
                isActive ? "shadow-inner shadow-success" : ""
              }`
            }
            to="manageshops"
          >
            <img className="h-[35px]" src={manageShop} alt="Dashboard" />
            <p>Manage Shops</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `w-full px-3 py-3 rounded-md flex justify-start items-center gap-2 ${
                isActive ? "shadow-inner shadow-success" : ""
              }`
            }
            to="manageallitems"
          >
            <img className="h-[35px]" src={manageItems} alt="Dashboard" />
            <p>Manage Items</p>
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
          <label className="flex cursor-pointer gap-2 ">
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

export default AdminNav;
