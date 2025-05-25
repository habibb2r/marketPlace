import { motion } from 'framer-motion';
import sign from "../../../assets/basic/checked.png";
import { Link } from "react-router-dom";
import useGetUserInfo from "../../Dashboard/UserDashBoard/UserHooks/useGetUserInfo";
import './SellerCard.css';

const SellerCard = ({ data }) => {
  const [userInfo] = useGetUserInfo();

  const getCardClass = (category) => {
    const baseClass = "seller-card";
    if (category === "Gold") return `${baseClass} seller-card-gold`;
    if (category === "Bronze") return `${baseClass} seller-card-bronze`;
    return `${baseClass} seller-card-silver`;
  };

  const getBadgeClass = (category) => {
    const baseClass = "category-badge";
    if (category === "Gold") return `${baseClass} badge-gold`;
    if (category === "Bronze") return `${baseClass} badge-bronze`;
    return `${baseClass} badge-silver`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={getCardClass(data.category)}
    >
      <div className="p-6 space-y-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center"
        >
          <span className={getBadgeClass(data.category)}>
            {data.category}
          </span>
        </motion.div>

        <div className="features-list">
          <h3 className="text-lg font-semibold mb-4 border-b border-primary/20 pb-2">
            Package Features
          </h3>
          
          <motion.div className="space-y-3">
            {[
              { icon: sign, text: `Shop size ${data.features.shop_size} Products` },
              { icon: sign, text: `Can add ${data.features.max_category} categories of product` },
              { icon: sign, text: `Duration ${data.features.duration} years` }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img className="feature-icon" src={feature.icon} alt="" />
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="price-tag text-center"
        >
          <span className="text-xl font-bold">
            ৳{data.price}
          </span>
          <span className="text-sm font-medium ml-1">only</span>
        </motion.div>

        {userInfo?.role === "customer" && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={`/buyshop/${data._id}`}
              className="block w-full"
            >              <button className="buy-button w-full">
                Buy Now
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SellerCard;
