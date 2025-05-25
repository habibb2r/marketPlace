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
import useGetUserInfo from "../Dashboard/UserDashBoard/UserHooks/useGetUserInfo";
import reviewPic from '../../assets/basic/user.png';
import './ProductDetails.css';

const ProductDetails = () => {
  const itemId = useParams();
  const [details, itemRefetch,isLoading] = useDetails(itemId);
  const [, , refetch] = useCart();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, , ] = useGetUserInfo()

  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(details)
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
        if (res.data?.result?.status) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Added to Cart Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          itemRefetch()
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
    <div className="product-container">      <SectionTitle title="Product Details" ico={ico} ict={ict} />
      <div className="product-grid">
        <div className="product-image-container">
          <img
            src={details.product_image}
            alt={details.product_name}
            className="product-image"
          />
        </div>        <div className="product-info">
          <h1 className="product-name">{details.product_name}</h1>
          <div className="product-description">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p>{details.product_description?.description}</p>
          </div>

          <div className="product-features">
            {Object.entries(details.product_description.features).map(
              ([key, value]) => (
                <div key={key} className="feature-item">
                  <span className="feature-label">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span>
                  <span>{value}</span>
                </div>
              )
            )}
          </div>          <div className="product-purchase-section">
            <div className="price-section">
              {details.product_price.discount ? (
                <>
                  <span className="price-original">
                    ৳{details.product_price.previous_price}
                  </span>
                  <span className="price-current">
                    ৳{details.product_price.present_price}
                  </span>
                </>
              ) : (
                <span className="price-current">
                  ৳{details.product_price.present_price}
                </span>
              )}
            </div>

            {userInfo?.role === "customer" && (
              <button
                onClick={() => addToCart(details)}
                className="add-to-cart-btn"
              >
                <span className="text-primary">Add to Cart</span>
                <img className="h-5" src={cart} alt="cart icon" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Rating
                style={{ maxWidth: 100 }}
                value={details.product_rating}
                readOnly
              />
              <span className="text-gray-600">({details.total_rated})</span>
            </div>

            <Link
              to={`/shopDetails/${details.stall.id}`}
              className="shop-link"
            >
              <img className="h-8" src={shop} alt="Shop" />
              <span className="text-lg font-medium">{details.stall.name}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {details.product_reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <img className="h-6 w-6" src={reviewPic} alt="" />
                <span className="font-medium">{review.name}</span>
              </div>
              <div className="review-content">
                <Rating
                  style={{ maxWidth: 80 }}
                  value={review.product_info.rating}
                  readOnly
                />
                <p className="mt-2">{review.product_info.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
