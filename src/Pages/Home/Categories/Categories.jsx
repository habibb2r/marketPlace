import useCategories from "../../../Hooks/useCategories";
import Loading from "../../Shared/Loading/Loading";
import { motion, AnimatePresence } from 'framer-motion';
import { FaMobileAlt, FaFemale, FaChild, FaArrowRight, FaEye, FaShoppingCart, FaFire } from 'react-icons/fa';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";

const Categories = () => {
  const [categ, isLoading] = useCategories();
  const [activeCategory, setActiveCategory] = useState(0);

  if (isLoading) {
    return <Loading />;
  }

  const phones = categ.phone.slice(0, 6);
  const w_fasions = categ.women_fashion.slice(0, 6);
  const kids = categ.kids_fashion.slice(0, 6);

  const categories = [
    {
      id: 0,
      title: "Mobile & Phones",
      icon: <FaMobileAlt />,
      items: phones,
      color: "green",
      totalCount: categ.phone.length
    },
    {
      id: 1,
      title: "Women Fashion",
      icon: <FaFemale />,
      items: w_fasions,
      color: "pink",
      totalCount: categ.women_fashion.length
    },
    {
      id: 2,
      title: "Kids Collection",
      icon: <FaChild />,
      items: kids,
      color: "purple",
      totalCount: categ.kids_fashion.length
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <FaFire className="text-2xl sm:text-3xl text-orange-500" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              Trending <span className="text-green-600">Categories</span>
            </h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg px-4">Browse our most popular collections</p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative px-3 py-2 sm:px-5 sm:py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 z-20 ${
                activeCategory === category.id
                  ? `bg-${category.color}-600 text-white shadow-xl`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 relative z-20">
                <span className="text-lg sm:text-xl md:text-2xl">{category.icon}</span>
                <div className="text-left">
                  <div className="text-xs sm:text-sm md:text-base">{category.title}</div>
                  <div className={`text-[10px] sm:text-xs ${activeCategory === category.id ? 'text-white/80' : 'text-gray-500'} hidden sm:block`}>
                    {category.totalCount}+ items
                  </div>
                </div>
              </div>
              
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 bg-gradient-to-r ${
                    category.color === 'green' ? 'from-green-500 to-emerald-500' :
                    category.color === 'pink' ? 'from-pink-500 to-rose-500' :
                    'from-purple-500 to-indigo-500'
                  } rounded-2xl -z-10`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mb-12"
          >
            {categories[activeCategory].items.map((item, index) => (
              <motion.div
                key={item._id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  <Link to={`/details/${item._id}`}>
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link to={`/details/${item._id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white rounded-full text-gray-800 hover:bg-green-500 hover:text-white transition-colors"
                      >
                        <FaEye className="text-xl" />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white rounded-full text-gray-800 hover:bg-green-500 hover:text-white transition-colors"
                    >
                      <FaShoppingCart className="text-xl" />
                    </motion.button>
                  </div>

                  {/* Discount Badge */}
                  {item.product_price.previous_price > item.product_price.present_price && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      SALE
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <Link to={`/details/${item._id}`}>
                    <h3 className="font-bold text-lg text-gray-800 mb-2 truncate group-hover:text-green-600 transition-colors">
                      {item.product_name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <Rating
                      style={{ maxWidth: 90 }}
                      value={item.product_rating}
                      readOnly
                    />
                    <span className="text-sm text-gray-500">({item.product_rating})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-2xl font-bold text-green-600">
                        <FaBangladeshiTakaSign />
                        <span>{item.product_price.present_price}</span>
                      </div>
                      {item.product_price.previous_price > item.product_price.present_price && (
                        <div className="flex items-center text-gray-400 line-through text-sm">
                          <FaBangladeshiTakaSign className="text-xs" />
                          <span>{item.product_price.previous_price}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shop Name */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <Link 
                      to={`/shopDetails/${item.stall.id}`}
                      className="text-sm text-gray-600 hover:text-green-600 transition-colors flex items-center gap-1"
                    >
                      <span>by</span>
                      <span className="font-semibold">{item.stall.name}</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/allproducts">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto ${
                categories[activeCategory].color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                categories[activeCategory].color === 'pink' ? 'bg-gradient-to-r from-pink-500 to-rose-500' :
                'bg-gradient-to-r from-purple-500 to-indigo-500'
              } text-white`}
            >
              <span className="hidden sm:inline">View All {categories[activeCategory].title}</span>
              <span className="sm:hidden">View All</span>
              <FaArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
