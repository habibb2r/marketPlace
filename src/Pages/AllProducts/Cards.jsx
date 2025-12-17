import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaEye, FaStore, FaBox } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import useGetUserInfo from "../Dashboard/UserDashBoard/UserHooks/useGetUserInfo";

const Cards = ({ data, refetchAllItems, viewMode = "grid" }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, , refetch] = useCart();
  const [userInfo] = useGetUserInfo();

  const {
    product_image,
    product_name,
    product_rating,
    product_price,
    quantity,
    stall,
    _id,
  } = data;

  const addToCart = (item) => {
    if (user && user.email && userInfo?.role === "customer") {
      const cartItem = {
        stall_id: item.stall.id,
        cartData: {
          product_id: item._id,
          user: user.email,
          product_name: item.product_name,
          product_image: item.product_image,
          price: parseInt(item.product_price.present_price),
          stall: item.stall.name,
          rating: item.product_rating,
        },
      };
      axiosSecure.post("/addToCart", cartItem).then((res) => {
        if (res.data?.result?.status) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added to Cart Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetchAllItems();
          refetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...Cannot add item from multiple shop at a time",
            text: "Pay previously added item..!",
          });
        }
      });
    } else {
      if (userInfo?.role === "admin" || userInfo?.role === "seller") {
        Swal.fire({
          title: "Admin and Seller Cannot Buy Items",
          text: "You have to login with customer account",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login Now",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login", { state: { from: location } });
          }
        });
      } else {
        Swal.fire({
          title: "You don't have any account",
          text: "You have to login first",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login Now",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login", { state: { from: location } });
          }
        });
      }
    }
  };

  const discountPercentage = product_price.previous_price > product_price.present_price
    ? Math.round(((product_price.previous_price - product_price.present_price) / product_price.previous_price) * 100)
    : 0;

  // Grid View
  if (viewMode === "grid") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col"
      >
        {/* Product Image */}
        <div className="relative h-52 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Link to={`/details/${_id}`}>
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              src={product_image}
              alt={product_name}
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {discountPercentage}% OFF
            </div>
          )}

          {/* Stock Badge */}
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <FaBox className="text-xs" />
            {quantity}
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Link to={`/details/${_id}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white rounded-full text-gray-800 hover:bg-green-500 hover:text-white transition-colors shadow-lg"
              >
                <FaEye className="text-xl" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(data)}
              className="p-3 bg-white rounded-full text-gray-800 hover:bg-green-500 hover:text-white transition-colors shadow-lg"
            >
              <FaShoppingCart className="text-xl" />
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 flex-1 flex flex-col">
          <Link to={`/details/${_id}`}>
            <h3 className="font-bold text-lg text-gray-800 mb-2 truncate group-hover:text-green-600 transition-colors">
              {product_name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <Rating style={{ maxWidth: 90 }} value={product_rating} readOnly />
            <span className="text-sm text-gray-500">({product_rating})</span>
          </div>

          {/* Price */}
          <div className="mb-3 flex items-center gap-4">
            <div className="flex items-center text-xl font-bold text-green-600">
              <FaBangladeshiTakaSign />
              <span>{product_price.present_price}</span>
            </div>
            {discountPercentage > 0 && (
              <div className="flex items-center text-gray-400 line-through text-sm mb-1">
                <FaBangladeshiTakaSign className="text-xs" />
                <span>{product_price.previous_price}</span>
              </div>
            )}
            
          </div>

          {/* Shop Name */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <Link
              to={`/shopDetails/${stall.id}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
            >
              <FaStore />
              <span className="truncate font-medium">{stall.name}</span>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // List View
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Product Image */}
        <div className="relative w-full sm:w-48 h-32 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
          <Link to={`/details/${_id}`}>
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              src={product_image}
              alt={product_name}
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              {discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 flex justify-between">
          <div>
            <Link to={`/details/${_id}`}>
              <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                {product_name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <Rating style={{ maxWidth: 100 }} value={product_rating} readOnly />
              <span className="text-sm text-gray-500">({product_rating} stars)</span>
            </div>

            {/* Shop Info */}
            <Link
              to={`/shopDetails/${stall.id}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors mb-3"
            >
              <FaStore />
              <span className="font-medium">{stall.name}</span>
            </Link>

            {/* Stock */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaBox className="text-green-600" />
              <span><span className="font-semibold">{quantity}</span> in stock</span>
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
            <div>
              {discountPercentage > 0 && (
                <div className="flex items-center text-gray-400 line-through text-sm mb-1">
                  <FaBangladeshiTakaSign className="text-xs" />
                  <span>{product_price.previous_price}</span>
                </div>
              )}
              <div className="flex items-center text-3xl font-bold text-green-600">
                <FaBangladeshiTakaSign />
                <span>{product_price.present_price}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link to={`/details/${_id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
                >
                  <FaEye />
                  <span>View</span>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(data)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cards;
