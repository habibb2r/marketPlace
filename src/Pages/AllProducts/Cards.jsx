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
import { Slide } from "react-awesome-reveal";
import useGetUserInfo from "../Dashboard/UserDashBoard/UserHooks/useGetUserInfo";
import quanityimg from '../../assets/basic/quantity.png'
import {motion} from 'framer-motion'


const Cards = ({ data, refetchAllItems}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, , refetch] = useCart();
  const [userInfo, , ] = useGetUserInfo()




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
    if (user && user.email && userInfo?.role == 'customer') {
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
        console.log(res.data)
        if (res.data?.result?.status) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Added to Cart Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetchAllItems()
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
      if(userInfo?.role == "admin" || userInfo?.role == "seller"){
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
      }else{
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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeInOut",  }}>
      <div className="shadow-md shadow-success px-5 py-5 rounded-md bg-primary bg-opacity-5">
        <div className="flex flex-col justify-center items-center gap-3 transition-transform duration-300 ease-in-out hover:scale-105">
          <img loading="lazy" className="h-[250px] rounded-md" src={product_image} alt="" />
        </div>
        <div className="flex flex-col justify-start items-start gap-3 py-2">
          <p className="text-xl capitalize  overflow-ellipsis overflow-hidden whitespace-nowrap w-[250px]">
            {product_name}
          </p>
          <Rating style={{ maxWidth: 100 }} value={product_rating} readOnly />
          {product_price.discount ? (
            <div className="flex justify-between items-center gap-5 w-full">
              <div className="flex flex-row justify-between items-center gap-5 ">
              <div className="flex justify-start items-center font-bold text-error line-through">
                <TbCurrencyTaka />
                <p>{product_price.previous_price}</p>
              </div>
              <div className="flex justify-start items-center font-bold text-primary">
                <TbCurrencyTaka />
                <p>{product_price.present_price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 py-2 rounded-lg shadow-sm shadow-success tooltip tooltip-bottom" data-tip="Quantity">
              <img className="h-[35px]" src={quanityimg} alt="" />
              <p className="font-semibold font-sans text-primary">{quantity}</p>
            </div>

            </div>
          ) : (
            <div className="flex justify-between items-center gap-5 w-full">
              <div className="flex justify-start items-center font-bold text-primary">
              <TbCurrencyTaka />
              <p>{product_price.present_price}</p>
            </div>
            <div className="flex items-center gap-2 px-2 py-2 rounded-lg shadow-sm shadow-success tooltip tooltip-bottom" data-tip="Quantity">
              <img className="h-[35px]" src={quanityimg} alt="" />
              <p className="font-semibold font-sans text-primary">{quantity}</p>
            </div>
            </div>
          )}
          <div className="flex justify-start items-center font-bold gap-2">
            <BsShop />
            <p>{stall.name}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-5 pt-3">
          <button
            onClick={() => addToCart(data)}
            className="text-sm flex justify-center items-center font-bold gap-2"
          >
            <img className="h-[45px]" src={cart} alt="" />
            {/* <FaCartPlus className="text-xl" /> */}
            {/* <div className="">Cart</div> */}
          </button>
          <Link
            to={`/details/${_id}`}
            className="text-sm flex justify-center items-center font-bold gap-2"
          >
            <img className="h-[45px]" src={details} alt="" />
            {/* <TbListDetails className="text-xl" />
            <div className="">Details</div> */}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Cards;
