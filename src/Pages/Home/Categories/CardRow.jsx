import { Rating } from "@smastrom/react-rating";
import shop from "../../../icons/online-shop.png";
import info from "../../../icons/information.png";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
const CardRow = (data) => {
  const item = data.data;
  return (
    <div className="flex justify-between items-center gap-3 p-3 w-full shadow-sm shadow-primary rounded-lg hover:shadow-inner hover:shadow-success">
      
      <div className="flex justify-center items-center gap-2">
      <img
        className="w-[65px] h-[80px] rounded-2xl"
        src={item.product_image}
        alt=""
      />
        <div className="flex flex-col justify-center items-start gap-1">
          <p className="font-semibold uppercase w-[170px]  overflow-ellipsis overflow-hidden whitespace-nowrap">{item.product_name}</p>
          <div className="flex items-center">
          <TbCurrencyTaka className="text-secondary" />
          <p className="font-medium text-primary">
            {item.product_price.present_price}
          </p>
          </div>
          
          <Rating
            style={{ maxWidth: 100 }}
            value={item.product_rating}
            readOnly
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <Link to={`/shopDetails/${item.stall.id}`}><img className="h-[40px]" src={shop} alt="" /></Link>
        <Link to={`/details/${item._id}`}><img className="h-[50px] rounded-full" src={info} alt="" /></Link>
      </div>
    </div>
  );
};

export default CardRow;
