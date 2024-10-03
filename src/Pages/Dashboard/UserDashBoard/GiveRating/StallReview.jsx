import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import ico from "../../../../assets/basic/003-review.png";
import ict from "../../../../assets/basic/004-rate.png";
import useOrderStatus from "../UserHooks/useOrderStatus";
import Loading from "../../../Shared/Loading/Loading";
import { Rating, Star } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import './review.css'
import nextprocess from '../../../../assets/basic/004-rate.png'
import Swal from "sweetalert2";
import useGetUserInfo from "../UserHooks/useGetUserInfo";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const alreadyRated = {
  itemShapes: Star,
  activeFillColor: "#b10326",
  inactiveFillColor: "#ff94a9",
  activeStrokeColor: 'mycolor',
  activeBoxColor: 'mycolor',
//   activeBoxBorderColor: '#000000',

//   inactiveFillColor?: string
  inactiveStrokeColor: '#3d3d3d',
//   inactiveBoxColor: '#3d3d3d'
//   inactiveBoxBorderColor?: string
};

const StallReview = () => {
  const axiosSecure = useAxiosSecure()
  const [userInfo, , ] = useGetUserInfo()
  const [orderStatus, refetch, orderLoad] = useOrderStatus();
  if (orderLoad) {
    return <Loading />;
  }
  const datas = orderStatus?.shopDetails;
  console.log(datas);

  const handleStallReview = async(shop)=>{
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          1: "😡",
          2: "🙁",
          3: "😐",
          4: "😊",
          5: "😍",
        });
      }, 1000);
    });
    const { value: rating } = await Swal.fire({
      title: "Give Ratings",
      input: "radio",
      inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "You need to choose something!";
        }
      }
    });
    const { value: text } = await Swal.fire({
      title: `Tell Us About Your Experience With ${shop?.stall_name}`,
      icon: "info",
      input: "textarea",
      inputPlaceholder: "Type your review here...",
      inputAttributes: {
        "aria-label": "Type your review here",
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit",
    })
    if (text && rating) {
      const reviewData = {
        review: text,
        rating: parseInt(rating),
        email: userInfo?.email,
        name: userInfo?.name,
        stall_id: shop?.stall_id,
        stall_name: shop?.stall_name,
        products: shop?.products
      };
      axiosSecure.post('/stallReview', reviewData)
      .then(res=>{
        if(res.data.status){
          refetch()
          Swal.fire({
            title: "Thank You!",
            text: "Your review has been submitted.",
            icon: "success",
          });
        }
      })
   
      
      
    }else{
      Swal.fire({
        title: "Error",
        text: "Please fill out all fields",
        icon: "error",
      });
    }
  }
  return (
    <div className="px-2">
      <SectionTitle ico={ico} ict={ict} title="Stall review"></SectionTitle>

      <div className="flex flex-col justify-start items-start gap-5">
        {datas.map((shop, index) => (
          <div
            className="px-1 md:px-5 py-3 shadow-md shadow-success w-full bg-success bg-opacity-20 rounded-md"
            key={index}
          >
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-3 w-full">
              <div className="w-full">
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <h3 className="text-xl font-semibold">{shop.stall_name} </h3>
                  <Rating
                    isRequired
                    style={{ maxWidth: 100 }}
                    value={shop?.rated}
                    readOnly={true}
                    
                    // onChange={setRating}
                    itemStyles={alreadyRated}
                  />
                </div>
                <div className="pt-3">
                  <p className="text-sm font-semibold text-center md:text-start">
                    Category : {shop?.stall_type}
                  </p>
                  <div className="w-full">
                    {shop?.products?.map((order, j) => (
                      <div className="px-2 py-3 w-full" key={j}>
                        <div className="flex flex-col md:flex-row items-center gap-3 py-3">
                          <p>
                            {" "}
                            Order Date & Time :{" "}
                            <span className="font-semibold">{order.date}</span>
                          </p>
                          <p>
                            <span className="font-semibold">{order.time}</span>
                          </p>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {order.product_items.map((product, i) => (
                            <div
                              className=" w-full flex flex-col md:flex-row justify-between items-center gap-5 py-3 bg-success bg-opacity-30 rounded-md shadow-sm px-2"
                              key={i}
                            >
                              <div className="flex items-center gap-1">
                                <p>
                                  {order.itemNames[i]} - ({" "}
                                  <span className="font-semibold">
                                    {order.product_prices[i]} $
                                  </span>{" "}
                                  )
                                </p>
                              </div>

                              {product.product_rating == false ? (
                                <Link
                                  to="/dashboard/giverating/product"
                                  className="font-semibold text-error"
                                >
                                  Give Review
                                </Link>
                              ) : (
                                <div className="flex flex-col justify-center items-center">
                                  <p className="font-semibold text-primary">
                                    Already rated
                                  </p>
                                  <Rating className="my-rating"
                                    isRequired
                                    style={{ maxWidth: 150 }}
                                    value={product?.rate_given}
                                    readOnly={true}
                                    itemStyles={alreadyRated}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={()=>handleStallReview(shop)} className=" "><img className="h-[60px] bg-white rounded-full shadow-md shadow-secondary" src={nextprocess} alt="" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StallReview;
