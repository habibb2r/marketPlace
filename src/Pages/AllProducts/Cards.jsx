import { Rating } from "@smastrom/react-rating";
import "./Cards.css";
import "@smastrom/react-rating/style.css";
import { TbCurrencyTaka } from "react-icons/tb";
import { BsShop } from "react-icons/bs";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import cart from "../../icons/005-add-to-cart.png";
import details from "../../icons/info.png";
import useGetUserInfo from "../Dashboard/UserDashBoard/UserHooks/useGetUserInfo";
import quanityimg from "../../assets/basic/quantity.png";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const Cards = ({ data, refetchAllItems }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, , refetch] = useCart();
  const [userInfo, ,] = useGetUserInfo();

  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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
    if (user && user.email && userInfo?.role == "customer") {
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
        console.log(res.data);
        if (res.data?.result?.status) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Added to Cart Successfully`,
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
      if (userInfo?.role == "admin" || userInfo?.role == "seller") {
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
      whileHover={{ y: -5 }}
      className="w-full"
    >
      <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
        {/* Discount Badge */}
        {product_price.discount && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {Math.round(
                ((product_price.previous_price - product_price.present_price) /
                  product_price.previous_price) *
                  100
              )}
              % OFF
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Link
            to={`/details/${_id}`}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-primary group relative flex items-center"
          >
            <img
              className="h-5 w-5 group-hover:invert transition-all duration-300"
              src={details}
              alt="Details"
            />
            <span className="absolute right-full mr-2 bg-black text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              View Details
            </span>
          </Link>
          <button
            onClick={() => addToCart(data)}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-primary group relative flex items-center"
          >
            <img
              className="h-5 w-5 group-hover:invert transition-all duration-300"
              src={cart}
              alt="Add to cart"
            />
            <span className="absolute right-full mr-2 bg-black text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Add to Cart
            </span>
          </button>
        </div>

        {/* Product Image */}
        <div className="relative overflow-hidden pt-[100%]">
          <img
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            src={product_image}
            alt={product_name}
          />
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5">
          <div className="space-y-3">
            {/* Title and Rating */}
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-800 line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors">
                {product_name}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <Rating
                  style={{ maxWidth: 80 }}
                  value={product_rating}
                  readOnly
                />
                <span className="text-xs text-gray-500">
                  ({product_rating})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                {product_price.discount && (
                  <div className="flex items-center text-gray-400 line-through text-sm">
                    <TbCurrencyTaka className="text-base" />
                    <span>{product_price.previous_price}</span>
                  </div>
                )}
                <div className="flex items-center text-primary font-bold text-lg sm:text-xl">
                  <TbCurrencyTaka className="text-xl sm:text-2xl" />
                  <span>{product_price.present_price}</span>
                </div>
              </div>

              {/* Quantity Badge */}
              <div
                className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full"
                data-tip="Available Quantity"
              >
                <img className="h-4 w-4 opacity-70" src={quanityimg} alt="" />
                <span className="text-sm font-medium text-primary">
                  {quantity}
                </span>
              </div>
            </div>

            {/* Shop Info */}
            <div className="flex items-center gap-2 text-gray-600 pt-1">
              <BsShop className="text-primary text-sm" />
              <p className="text-sm font-medium truncate">{stall.name}</p>
            </div>

            {/* Mobile Add to Cart Button */}
            <div className="block sm:hidden pt-2">
              <button
                onClick={() => addToCart(data)}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <img className="h-5 w-5 invert" src={cart} alt="" />
                <span className="text-sm font-medium">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cards;
