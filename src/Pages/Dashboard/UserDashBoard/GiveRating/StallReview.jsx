import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import ico from "../../../../assets/basic/003-review.png";
import ict from "../../../../assets/basic/004-rate.png";
import useOrderStatus from "../UserHooks/useOrderStatus";
import Loading from "../../../Shared/Loading/Loading";
import { Rating, ThinStar } from "@smastrom/react-rating";




const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#e1f00a",
    inactiveFillColor: "#D19C00",
  };

  const alreadyRated = {
    itemShapes: ThinStar,
    activeFillColor: "#52cc00",
    inactiveFillColor: "#d1d3cf",
  };

const StallReview = () => {
    const [orderStatus, refetch, orderLoad] = useOrderStatus();
    if(orderLoad){
        return <Loading />
    }
    const datas = orderStatus?.shopDetails
    console.log(datas)
    return (
        <div>
            <SectionTitle ico={ico} ict={ict} title="Stall review"></SectionTitle>
            
                <div className="flex flex-col justify-start items-start gap-5">
                    {
                        datas.map((shop, index)=><div className="px-5 py-3 shadow-md shadow-success w-full bg-accent bg-opacity-40 rounded-md" key={index}>
                            <div className="flex justify-between items-start gap-3">
                                <div>
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
                                    <div>
                                        <p className="text-sm font-semibold">Category : {shop?.stall_type}</p>
                                        <div>
                                            {
                                                shop?.products?.map((order, j)=> <div key={j}>
                                                    <div className="flex flex-col md:flex-row items-center gap-3">
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
                  <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-3 bg-white rounded-md shadow-sm px-2" key={i}>
                    <div className="flex items-center gap-1">
                    <p>{order.itemNames[i]} - ( <span className="font-semibold">{order.product_prices[i]} $</span> )</p>
                    
                    </div>
                        
                    {
                        product.product_rating == false? <div className="flex items-center gap-3">
                          <Rating
                        isRequired
                        style={{ maxWidth: 150 }}
                        value={3}
                        readOnly={true}
                        // onChange={setRating}
                        itemStyles={myStyles}
                      />
                      <button className="tooltip" data-tip="Click Here"><img className="h-[45px] rounded-full shadow-md shadow-success" src='' alt="" /></button>
                        </div> : <div className="flex flex-col justify-center items-center"><p className="font-semibold text-success">Already rated</p> 
                      <Rating
                      isRequired
                      style={{ maxWidth: 150 }}
                      value={product?.rate_given}
                      readOnly={true}
                      itemStyles={alreadyRated}
                    /></div>
                    }
                  </div>
                ))}
              </div>
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <p>icon</p>
                            </div>
                        </div>)
                    }
                </div>
           
        </div>
    );
};

export default StallReview;