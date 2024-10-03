import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import ico from "../../../../assets/basic/003-review.png";
import ict from "../../../../assets/basic/004-rate.png";
import useOrderStatus from "../UserHooks/useOrderStatus";
import Loading from "../../../Shared/Loading/Loading";
import { Rating, Star } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import './review.css'


const alreadyRated = {
  itemShapes: Star,
  activeFillColor: "#faf200",
  inactiveFillColor: "#b3c2c1",
  activeStrokeColor: 'mycolor',
  activeBoxColor: 'mycolor',
//   activeBoxBorderColor: '#000000',

//   inactiveFillColor?: string
  inactiveStrokeColor: '#3d3d3d',
//   inactiveBoxColor: '#3d3d3d'
//   inactiveBoxBorderColor?: string
};

const StallReview = () => {
  const [orderStatus, refetch, orderLoad] = useOrderStatus();
  if (orderLoad) {
    return <Loading />;
  }
  const datas = orderStatus?.shopDetails;
  console.log(datas);
  return (
    <div>
      <SectionTitle ico={ico} ict={ict} title="Stall review"></SectionTitle>

      <div className="flex flex-col justify-start items-start gap-5">
        {datas.map((shop, index) => (
          <div
            className="px-5 py-3 shadow-md shadow-success w-full bg-success bg-opacity-40 rounded-md"
            key={index}
          >
            <div className="flex justify-between items-start gap-3 w-full">
              <div className="w-full">
                <div className="flex items-center gap-2">
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
                  <p className="text-sm font-semibold">
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
                              className=" w-full flex flex-col md:flex-row justify-between items-center gap-5 py-3 bg-primary bg-opacity-10 rounded-md shadow-sm px-2"
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

              <p>icon</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StallReview;
