import { AttentionSeeker } from "react-awesome-reveal";
import { FaHandPointRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useGetUserInfo from "../../Dashboard/UserDashBoard/UserHooks/useGetUserInfo";

const SellerCard = ({ data }) => {
  const [userInfo] = useGetUserInfo();
  const getCategoryColor = (category) => {
    if (category === "Gold") return "#FFD700";
    if (category === "Bronze") return "#CD7F32";
    return "#e5e4e2";
  };

  const backgroundColor = getCategoryColor(data.category);

  return (
    <AttentionSeeker className="" duration={1000} effect="jello">
      <div
        className={`flex flex-col justify-center items-center gap-4 px-4 py-10 rounded-lg shadow-md text-black transition-transform duration-300 ease-in-out hover:scale-105`}
        style={{ backgroundColor }}
      >
        <div className="text-2xl font-mono font-semibold">{data.category}</div>
        <div className="flex flex-col justify-start items-start gap-2">
          <p className="text-xl">Features</p>
          <div className="font-semibold flex flex-col justify-start items-start gap-2">
            <div className="flex items-center gap-2">
              <FaHandPointRight />{" "}
              <span>Shop size {data.features.shop_size} Products</span>
            </div>
            <div className="flex items-center gap-2">
              <FaHandPointRight />{" "}
              <span>
                Can add {data.features.max_category} categories of product
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaHandPointRight />{" "}
              <span>Duration {data.features.duration} years</span>
            </div>
          </div>
        </div>
        <div className="text-xl">
          Price : <span className="font-semibold">{data.price} only</span>
        </div>
        {/* <Link state={data}
          className={`${userInfo?.role == "customer" ? "block" : "hidden"}`}
          to={`/buyshop/${data._id}`}
        >
          <button className="btn btn-secondary">Buy Now</button>
        </Link> */}
        <Link  to={`/buyshop/${data._id}`} className={`${userInfo?.role == "customer" ? "block" : "hidden"} relative px-5 py-2 font-medium text-white group`}>
<span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
<span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
<span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
<span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
<span className="relative">Buy Now</span>
</Link>
        
      </div>
    </AttentionSeeker>
  );
};

export default SellerCard;
