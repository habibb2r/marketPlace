import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaUserCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Loading from "../../Shared/Loading/Loading";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const reviewsPerSlide = 3;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_backend_server}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);
  const startIndex = currentSlide * reviewsPerSlide;
  const endIndex = startIndex + reviewsPerSlide;
  const currentReviews = reviews.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-6 py-2 rounded-full mb-4">
            <FaStar className="animate-pulse" />
            <span className="font-semibold">Customer Reviews</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            What Our <span className="text-green-600">Customers Say</span> 💬
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real experiences from our valued customers who trust Panda MarketPlace
          </p>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Reviews Slider Container */}
        <div className="relative">
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            <FaChevronLeft className="text-2xl" />
          </motion.button>

          {/* Reviews Grid with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-16"
            >
              {currentReviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 overflow-hidden"
                >
                  {/* Decorative Quote */}
                  <motion.div
                    animate={hoveredIndex === index ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                    className="absolute top-6 right-6 text-green-100"
                  >
                    <FaQuoteLeft className="text-6xl" />
                  </motion.div>

                  {/* Rating Stars */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-4 py-2 shadow-md">
                      <Rating style={{ maxWidth: 120 }} value={review.rate} readOnly />
                    </div>
                  </div>

                  {/* Review Text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 text-center leading-relaxed mb-6 italic relative z-10 line-clamp-4"
                  >
                    "{review.review}"
                  </motion.p>

                  {/* User Info */}
                  <div className="flex flex-col items-center pt-6 border-t border-gray-100">
                    <div className="relative mb-4">
                      {review.userImg ? (
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          src={review.userImg}
                          alt={review.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-green-500 shadow-md"
                        />
                      ) : (
                        <FaUserCircle className="text-6xl text-green-600" />
                      )}
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <FaStar className="text-white text-xs" />
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg">{review.name}</h4>
                    <p className="text-gray-500 text-sm">{review.email}</p>
                  </div>

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-green-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    animate={hoveredIndex === index ? {
                      boxShadow: [
                        '0 0 0 0 rgba(34, 197, 94, 0)',
                        '0 0 0 4px rgba(34, 197, 94, 0.2)',
                        '0 0 0 0 rgba(34, 197, 94, 0)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            <FaChevronRight className="text-2xl" />
          </motion.button>
        </div>

        {/* Slide Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  currentSlide === index
                    ? 'w-8 bg-gradient-to-r from-green-500 to-emerald-500'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Slide Counter */}
        <div className="text-center mt-4 text-gray-600">
          {currentSlide + 1} / {totalSlides}
        </div>

        {/* Average Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-around gap-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="text-7xl font-bold mb-2"
              >
                4.8
              </motion.div>
              <div className="flex justify-center mb-2">
                <Rating style={{ maxWidth: 150 }} value={4.8} readOnly />
              </div>
              <p className="text-green-100">Average Rating</p>
            </div>

            <div className="h-24 w-px bg-white/30 hidden md:block"></div>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
                className="text-5xl font-bold mb-2"
              >
                {reviews.length}+
              </motion.div>
              <p className="text-green-100">Happy Customers</p>
            </div>

            <div className="h-24 w-px bg-white/30 hidden md:block"></div>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8, delay: 0.4 }}
                className="text-5xl font-bold mb-2"
              >
                98%
              </motion.div>
              <p className="text-green-100">Satisfaction Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
