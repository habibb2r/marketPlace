import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useMyReview from "../UserHooks/useMyReview";
import ico from "../../../../assets/basic/003-review.png";
import ict from "../../../../assets/basic/004-rate.png";
import { Rating, Star } from "@smastrom/react-rating";



const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffe40d",
    inactiveFillColor: "#ffdde4",
  };
const MyReviews = () => {
  const [myReview, refetch, loadReview] = useMyReview();
  console.log(myReview);
  return (
    <div>
      <SectionTitle ico={ico} ict={ict} title="My Reviews"></SectionTitle>
      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item shadow-lg shadow-success my-5">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-3">
                <p className="text-xl">Product Reviews</p>
                <p>Total Reviews: <span className="text-primary">{myReview?.product.length}</span></p>
            </div>
          </div>
          <div className="collapse-content">
            <div className="grid grid-cols-2 gap-4">
                {myReview?.product?.map((item, index) => (
                  <div className="flex flex-col justify-start items-start gap-2 shadow-sm shadow-secondary rounded-lg px-3 py-4" key={index}>
                    <p className=" font-semibold">{item?.product_info?.name}</p>
                    <p>Price: {item?.product_info?.price}$</p>
                    <div className="flex items-center gap-2"><p>Rating: </p><Rating
            isRequired
            style={{ maxWidth: 150 }}
            value={item?.product_info?.rating}
            readOnly={true}
            itemStyles={myStyles}
          /></div>
                    <p>Review: {item?.product_info?.review}</p>
                  </div>
                ))}
              
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item shadow-lg shadow-success my-5">
          <input type="radio" name="my-accordion-4"  />
          <div className="collapse-title text-xl font-medium">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-3">
                <p className="text-xl">Stall Reviews</p>
                <p>Total Reviews: <span className="text-primary">{myReview?.stall?.length}</span></p>
            </div>
          </div>
          <div className="collapse-content">
          <div className="grid grid-cols-2 gap-4">
                {myReview?.product?.map((item, index) => (
                  <div className="flex flex-col justify-start items-start gap-2 shadow-sm shadow-secondary rounded-lg px-3 py-4" key={index}>
                    <p className=" font-semibold">{item?.product_info?.name}</p>
                    <p>Price: {item?.product_info?.price}$</p>
                    <div className="flex items-center gap-2"><p>Rating: </p><Rating
            isRequired
            style={{ maxWidth: 150 }}
            value={item?.product_info?.rating}
            readOnly={true}
            itemStyles={myStyles}
          /></div>
                    <p>Review: {item?.product_info?.review}</p>
                  </div>
                ))}
              
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item shadow-lg shadow-success my-5">
          <input type="radio" name="my-accordion-4"  />
          <div className="collapse-title text-xl font-medium">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-3">
                <p className="text-xl">MarketPlace Reviews</p>
                <p>Total Reviews: <span className="text-primary">{myReview?.marketPlace?.length}</span></p>
            </div>
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
