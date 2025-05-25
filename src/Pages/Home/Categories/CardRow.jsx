import { Rating } from "@smastrom/react-rating";
import shop from "../../../icons/online-shop.png";
import info from "../../../icons/information.png";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";

const CardRow = (data) => {
  const item = data.data;
  
  return (
    <div className="group bg-base-100 rounded-xl p-3 flex items-center justify-between gap-4 hover:bg-base-200/50 transition-all duration-300 hover:scale-[102%]">
      <div className="flex items-center gap-4">
        <div className="relative overflow-hidden rounded-lg w-16 h-20">
          <img
            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-300"
            src={item.product_image}
            alt={item.product_name}
            loading="lazy"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <h4 className="font-medium capitalize w-[170px] overflow-ellipsis overflow-hidden whitespace-nowrap group-hover:text-primary transition-colors duration-300">
            {item.product_name}
          </h4>
          
          <div className="flex items-center gap-1">
            <TbCurrencyTaka className="text-primary text-lg" />
            <span className="font-semibold text-primary">
              {item.product_price.present_price}
            </span>
          </div>
          
          <Rating
            style={{ maxWidth: 90 }}
            value={item.product_rating}
            readOnly
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link 
          to={`/shopDetails/${item.stall.id}`}
          className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
        >
          <img className="w-8 h-8" src={shop} alt="View Shop" />
        </Link>
        <Link 
          to={`/details/${item._id}`}
          className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300"
        >
          <img className="w-8 h-8" src={info} alt="View Details" />
        </Link>
      </div>
    </div>
  );
};

export default CardRow;
