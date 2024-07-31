import { FaHandPointRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const SellerCard = ({data}) => {
    
    const getCategoryColor = (category) => {
        if (category === 'Gold') return '#FFD700';
        if (category === 'Bronze') return '#CD7F32';
        return '#e5e4e2';
      };
      
      const backgroundColor = getCategoryColor(data.category);
    
    return (
        <div className={`flex flex-col justify-center items-center gap-4 px-4 py-10 rounded-lg shadow-md text-black`} style={{ backgroundColor }}>
            <div className="text-2xl font-mono font-semibold">{data.category}</div>
            <div className="flex flex-col justify-start items-start gap-2">
                <p className="text-xl">Features</p>
                <div className="font-semibold flex flex-col justify-start items-start gap-2">
                    <div className="flex items-center gap-2"><FaHandPointRight /> <span>Shop size {data.features.shop_size} Products</span></div>
                    <div className="flex items-center gap-2"><FaHandPointRight /> <span>Can add {data.features.max_category} categories of product</span></div>
                    <div className="flex items-center gap-2"><FaHandPointRight /> <span>Duration {data.features.duration} years</span></div>
                </div>
            </div>
            <div className="text-xl">Price : <span className="font-semibold">{data.price} only</span></div>
            <Link to={`/buyshop/${data._id}`}><button className="btn btn-secondary">Buy Now</button></Link>
        </div>
    );
};

export default SellerCard;