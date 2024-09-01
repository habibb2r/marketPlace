import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useDetails from "../../Hooks/useDetails";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import Loading from "../Shared/Loading/Loading";
import { Rating } from "@smastrom/react-rating";
import shop from "../../icons/008-shop.png";
import cart from "../../icons/003-carts.png";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import ico from "../../assets/for title/012-seo.png";
import ict from "../../assets/for title/010-map.png";
import Typewriter from 'typewriter-effect';

const ProductDetails = () => {
  const itemId = useParams();
  const [details, isLoading] = useDetails(itemId);
  const [, , refetch] = useCart();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return <Loading></Loading>;
  }

  const addToCart = (item) => {
    if (user && user.email) {
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
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Added to Cart Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
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
  };

  return (
    <div className="">
      <SectionTitle title="Product Details" ico={ico} ict={ict}></SectionTitle>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 px-5 py-5 bg-success bg-opacity-30 rounded-lg shadow-md md:shadow-lg md:shadow-secondary">
      {/* <h1 className="font-mono uppercase font-semibold text-xl px-3 py-2 md:w-[500px] bg-accent bg-opacity-20 rounded-lg shadow-inner shadow-success">
            {details.product_name}
          </h1> */}
<div className="font-mono uppercase font-semibold text-xl px-3 py-2 md:w-[500px] bg-accent bg-opacity-20 rounded-lg shadow-inner shadow-success">
<Typewriter
  options={{
    strings: [`${details.product_name}`],
    autoStart: true,
    loop: true,
  }}
/>
</div>


        <div className="flex justify-between md:justify-center items-center gap-4">
          <button
            onClick={() => addToCart(details)}
            className="btn btn-error shadow-md shadow-success"
          >
            <p className="font-semibold">Add to Cart</p>{" "}
            <img className="h-[20px]" src={cart} alt="" />
          </button>
          
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-start md:gap-0 gap-3 md:px-10 py-5 shadow-md">
        <div className="md:w-2/5 flex flex-col justify-center items-center">
          
          <img
            className="md:h-[300px] h-[250px] rounded-lg shadow-md shadow-secondary p-2"
            src={details.product_image}
            alt=""
          />
        </div>
        <div className="md:w-3/5 flex flex-col justify-center items-start gap-1 px-5">
          <p className="py-3">
            <span className="font-bold font-serif">Description :</span>{" "}
            {details.product_description?.description}
          </p>
          {Object.entries(details.product_description.features).map(
            ([key, value]) => (
              <p key={key}>
                <span className="font-bold font-serif uppercase">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                </span>
                <span>{value}</span>
              </p>
            )
          )}

          {details.product_price.discount ? (
            <div>
              <p>
                <span className="font-bold font-serif">Price : </span>
                <span className="font-semibold font-mono line-through text-secondary">
                  {details.product_price.previous_price}
                </span>{" "}
                <span className="font-mono font-semibold">
                  {details.product_price.present_price}
                </span>
              </p>
            </div>
          ) : (
            <div>
              <p>
                <span className="font-bold font-serif">Price : </span>
                <span className="font-mono font-semibold">
                  {details.product_price.present_price}
                </span>{" "}
                Tk
              </p>
            </div>
          )}
          <div className="flex flex-col justify-center items-start gap-4 py-2">
            <Rating
              style={{ maxWidth: 100 }}
              value={details.product_rating}
              readOnly
            />
            <Link
            to={`/shopDetails/${details.stall.id}`}
            className="flex justify-start items-center gap-1"
          >
            {" "}
            <img className="h-[40px]" src={shop} alt="Shop" />{" "}
            <p className="text-xl font-medium text-primary">
              {details.stall.name}
            </p>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
