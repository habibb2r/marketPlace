import { Rating } from "@smastrom/react-rating";
import "./Cards.css";
import "@smastrom/react-rating/style.css";
import { TbCurrencyTaka} from "react-icons/tb";
import { BsShop } from "react-icons/bs";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import cart from '../../icons/005-add-to-cart.png'
import details from '../../icons/info.png'


const Cards = ({data}) => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const axiosSecure = useAxiosSecure()
  const [, ,refetch] = useCart()

  const {
    product_image,
    product_name,
    product_rating,
    product_price,
    stall,
    _id
  } = data;
  
  const addToCart = item => {
    if(user && user.email){
      const cartItem = {
        stall_id: item.stall.id,
        cartData : {
        product_id : item._id,
        user : user.email,
        product_name: item.product_name,
        product_image : item.product_image,
        price : parseInt(item.product_price.present_price),
        stall : item.stall.name,
        rating: item.product_rating,
        }
        
      }
      axiosSecure.post('/addToCart', cartItem)
      .then(res =>{
        if(res.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Added to Cart Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch()
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Oops...Cannot add item from multiple shop at a time",
            text: "Pay previously added item..!",
          });
          
        }
        
      })
      
    }else{
      Swal.fire({
        title: "You don't have any account",
        text: "You have to login first",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state: {from: location}})
        }
      });
    }
    
  };
  return (
    <div className="shadow-sm shadow-success px-5 py-5 rounded-md">
      <div className="flex flex-col justify-center items-center gap-3">
        <img className="h-[250px] rounded-md" src={product_image} alt="" />
      </div>
      <div className="flex flex-col justify-start items-start gap-3 py-2">
        <p className="text-xl capitalize  overflow-ellipsis overflow-hidden whitespace-nowrap w-[250px]">
          {product_name}
        </p>
        <Rating style={{ maxWidth: 100 }} value={product_rating} readOnly />
        {product_price.discount ? (
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
        ) : (
          <div className="flex justify-start items-center font-bold text-primary">
            <TbCurrencyTaka />
            <p>{product_price.present_price}</p>
          </div>
        )}
        <div className="flex justify-start items-center font-bold gap-2">
          <BsShop />
          <p>{stall.name}</p>
        </div>
        
      </div>
      <div className="flex justify-between items-center gap-5 pt-3">
          <button
            
            onClick={()=>addToCart(data)}
            className="text-sm flex justify-center items-center font-bold gap-2"
          >
            <img className="h-[45px]" src={cart} alt="" />
            {/* <FaCartPlus className="text-xl" /> */}
            {/* <div className="">Cart</div> */}
          </button>
          <Link to={`/details/${_id}`}
            className="text-sm flex justify-center items-center font-bold gap-2"
          >
            <img className="h-[45px]" src={details} alt="" />
            {/* <TbListDetails className="text-xl" />
            <div className="">Details</div> */}
          </Link>
        </div>
    </div>
  );
};

export default Cards;
