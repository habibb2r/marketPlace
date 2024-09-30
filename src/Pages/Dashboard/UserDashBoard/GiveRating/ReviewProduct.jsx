import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useOrderStatus from "../UserHooks/useOrderStatus";
import ico from "../../../../assets/basic/003-review.png";
import ict from "../../../../assets/basic/004-rate.png";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { useState } from "react";
import Swal from "sweetalert2";
import { createRoot } from 'react-dom/client';
import nextprocess from '../../../../assets/basic/004-rate.png'
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


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

const ReviewProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [orderStatus, refetch, orderLoad] = useOrderStatus();
  const [rating, setRating] = useState(3);
  const filteredArray = orderStatus?.filter((item) => item.delivered === true);
  console.log(filteredArray);


 const handleRating = async (itemdata, data, name, price)=>{
  const wrapper = document.createElement("div");

 console.log(itemdata, data, name)
  const RatingComponent = () => (
    <div className="flex flex-col justify-center items-center gap-3">
      <p className="font-semibold">{name}</p>
      <Rating
      isRequired
      style={{ maxWidth: 150 }}
      value={rating}
      readOnly={true}
      // onChange={setRating}
      itemStyles={myStyles}
    />
    </div>
  );

  const root = createRoot(wrapper);
  root.render(<RatingComponent />);
  console.log(data, name)
  const { value: text } = await Swal.fire({
    title: "Tell Us About Your Experience",
    icon: "info",
    html: wrapper,
    input: "textarea",
    inputPlaceholder: "Type your review here...",
    inputAttributes: {
      "aria-label": "Type your review here",
    },
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Submit",
  });

  if (text) {
    const reviewData = {
     email: itemdata?.email,
     order_date: itemdata?.date,
     order_time: itemdata?.time,
     stall_id: itemdata?.stall_id,
     payslip_id: itemdata?._id,
     product_info: {
      name: name,
      product_id: data?.product_id,
      rating: rating,
      review: text,
      price: price,
     }
    };

    axiosSecure.post('/productReview', reviewData)
      .then(res =>{
        console.log(res.data)
        if(res.data){
          refetch()
          Swal.fire({
            title: "Thank You!",
            text: "Your review has been submitted.",
            icon: "success",
          });
        }
      })
    
    
  }
 }
  return (
    <div>
      <SectionTitle ico={ico} ict={ict} title="Product Review"></SectionTitle>
      <div className="grid grid-cols-1 gap-5 px-2 py-3">
        {filteredArray?.map((item, index) => (
          <div
            className="shadow-md bg-success bg-opacity-10 shadow-success px-3 py-4 rounded-md"
            key={index}
          >
            <div>
              <div className="flex justify-between items-center gap-4 py-3">
                <p className="text-xl font-semibold">Purchased Information : {index+1}</p>
                <div className="flex items-center gap-3">
                  <p>
                    {" "}
                    Order Date & Time :{" "}
                    <span className="font-semibold">{item.date}</span>
                  </p>
                  <p>
                    <span className="font-semibold">{item.time}</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {item.product_items.map((product, i) => (
                  <div className="flex justify-between items-center gap-5 py-3 bg-white rounded-md shadow-sm px-2" key={i}>
                    <div className="flex items-center gap-1">
                    <p>{item.itemNames[i]} - </p>
                    <p>( <span className="font-semibold">{item.product_prices[i]} $</span> )</p>
                    </div>
                        
                    {
                        product.product_rating == false? <div className="flex items-center gap-3">
                          <Rating
                        isRequired
                        style={{ maxWidth: 150 }}
                        value={rating}
                        // readOnly={true}
                        onChange={setRating}
                        itemStyles={myStyles}
                      />
                      <button className="tooltip" data-tip="Click Here" onClick={()=>handleRating(item,product,item.itemNames[i], item.product_prices[i])}><img className="h-[45px] rounded-full shadow-md shadow-success" src={nextprocess} alt="" /></button>
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
              <div className=" w-full py-2">
                    <div className="flex justify-end items-end gap-5">
                    <p>Quantity: {item.quantity}</p>
                    <p>Total Price: <span className="font-semibold">{item.total_price}$</span></p>
                    </div>
              </div>
            </div>
          </div>
        )) || <p>No delivered products yet to give ratings.</p>}
      </div>
    </div>
  );
};

export default ReviewProduct;
