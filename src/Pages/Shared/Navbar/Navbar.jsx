import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, 
  FaShoppingBag, 
  FaShoppingCart, 
  FaTachometerAlt, 
  FaUserShield, 
  FaStore, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaSun,
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle
} from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import useCart from "../../../Hooks/useCart";
import useGetUserInfo from "../../Dashboard/UserDashBoard/UserHooks/useGetUserInfo";
import Loading from "../Loading/Loading";
import "./Navbar.css";


const Navbar = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [cart] = useCart();
  const { user, logOut } = useContext(AuthContext);
  const [userInfo, refetch, isLoading] = useGetUserInfo();


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
          timer: 1500,
        });
        navigate("/", { replace: true });
      })
      .catch((error) => console.error(error));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="text-4xl"
            >
              🐼
            </motion.div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors">
                Panda
              </h1>
              <p className="text-xs text-gray-500 -mt-1">MarketPlace</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            
            {/* Home Link */}
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all font-medium"
              >
                <FaHome className="text-lg" />
                <span>Home</span>
              </motion.button>
            </Link>

            {/* All Products Link */}
            <Link to="/allProducts">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all font-medium"
              >
                <FaShoppingBag className="text-lg" />
                <span>Products</span>
              </motion.button>
            </Link>

            {/* Role-Based Navigation */}
            {user && (
              <>
                {userInfo?.role === "admin" && (
                  <Link to="/adminpanel/adminhome">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all font-medium"
                    >
                      <FaUserShield className="text-lg" />
                      <span>Admin Panel</span>
                    </motion.button>
                  </Link>
                )}

                {userInfo?.role === "customer" && (
                  <>
                    <Link to="/dashboard/userhome">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all font-medium"
                      >
                        <FaTachometerAlt className="text-lg" />
                        <span>Dashboard</span>
                      </motion.button>
                    </Link>

                    <Link to="/dashboard/cart">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all font-medium"
                      >
                        <FaShoppingCart className="text-lg" />
                        <span>Cart</span>
                        {cart?.length > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                          >
                            {cart.length}
                          </motion.span>
                        )}
                      </motion.button>
                    </Link>
                  </>
                )}

                {userInfo?.role === "seller" && (
                  <Link to="/sellerdashboard/sellerprofile">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all font-medium"
                    >
                      <FaStore className="text-lg" />
                      <span>My Store</span>
                    </motion.button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Right Side - User & Actions */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleChangeTheme}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              {mode ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
            </motion.button>

            {/* User Section */}
            {user ? (
              <>
                {/* User Avatar/Name */}
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                  {userInfo?.picture ? (
                    <img
                      src={userInfo.picture}
                      alt={userInfo?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-green-600" />
                  )}
                  <span className="font-medium text-gray-700 text-sm max-w-[100px] truncate">
                    {userInfo?.name || "User"}
                  </span>
                </div>

                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogOut}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 shadow-md hover:shadow-lg transition-all"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg transition-all"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={controlNav}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            {clicked ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-2">
              
              {/* Mobile Links */}
              <Link to="/" onClick={() => setClicked(false)}>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  <FaHome className="text-xl" />
                  <span>Home</span>
                </motion.div>
              </Link>

              <Link to="/allProducts" onClick={() => setClicked(false)}>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  <FaShoppingBag className="text-xl" />
                  <span>All Products</span>
                </motion.div>
              </Link>

              {user && (
                <>
                  {userInfo?.role === "admin" && (
                    <Link to="/adminpanel/adminhome" onClick={() => setClicked(false)}>
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                      >
                        <FaUserShield className="text-xl" />
                        <span>Admin Panel</span>
                      </motion.div>
                    </Link>
                  )}

                  {userInfo?.role === "customer" && (
                    <>
                      <Link to="/dashboard/userhome" onClick={() => setClicked(false)}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                          <FaTachometerAlt className="text-xl" />
                          <span>Dashboard</span>
                        </motion.div>
                      </Link>

                      <Link to="/dashboard/cart" onClick={() => setClicked(false)}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 transition-colors font-medium relative"
                        >
                          <FaShoppingCart className="text-xl" />
                          <span>Cart</span>
                          {cart?.length > 0 && (
                            <span className="ml-auto bg-green-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                              {cart.length}
                            </span>
                          )}
                        </motion.div>
                      </Link>
                    </>
                  )}

                  {userInfo?.role === "seller" && (
                    <Link to="/sellerdashboard/sellerprofile" onClick={() => setClicked(false)}>
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors font-medium"
                      >
                        <FaStore className="text-xl" />
                        <span>Seller Dashboard</span>
                      </motion.div>
                    </Link>
                  )}
                </>
              )}

              {/* Mobile User Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-green-50 rounded-lg mb-3">
                      {userInfo?.picture ? (
                        <img
                          src={userInfo.picture}
                          alt={userInfo?.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                        />
                      ) : (
                        <FaUserCircle className="text-4xl text-green-600" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">{userInfo?.name || "User"}</p>
                        <p className="text-xs text-gray-500">{userInfo?.email}</p>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleLogOut();
                        setClicked(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 transition-all"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setClicked(false)}>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"
                    >
                      <FaSignInAlt />
                      <span>Login</span>
                    </motion.button>
                  </Link>
                )}

                {/* Mobile Theme Toggle */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleChangeTheme}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors font-medium"
                >
                  {mode ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
                  <span>{mode ? "Dark Mode" : "Light Mode"}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
