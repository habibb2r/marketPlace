import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTag, FaStore, FaArrowRight, FaPercentage } from 'react-icons/fa';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import useOfferProducts from '../../../Hooks/useOfferProducts';
import Loading from '../../Shared/Loading/Loading';
import { useState } from 'react';

const DiscountProducts = () => {
    const [offers, isLoading] = useOfferProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    if (isLoading) {
        return <Loading />;
    }

    // Calculate pagination
    const totalPages = Math.ceil(offers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOffers = offers.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="py-20 bg-gradient-to-b from-green-50 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-6 py-2 rounded-full mb-4">
                        <FaTag className="animate-pulse" />
                        <span className="font-semibold">Hot Deals!</span>
                    </div>
                    <h2 className="text-5xl font-bold text-gray-800 mb-4">
                        Special <span className="text-red-600">Offers</span> 🔥
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Don't miss out on these amazing deals! Limited time offers on selected products
                    </p>
                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mt-4"></div>
                </motion.div>

                {/* Offers Grid with Animation */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                    >
                        {currentOffers.map((offer, index) => (
                            <motion.div
                                key={offer._id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Discount Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-1"
                                    >
                                        <FaPercentage className="text-sm" />
                                        <span className="font-bold">
                                            {Math.round(((offer.product_price.previous_price - offer.product_price.present_price) / offer.product_price.previous_price) * 100)}% OFF
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Product Image */}
                                <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 overflow-hidden">
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        src={offer.product_image}
                                        alt={offer.product_name}
                                        className="max-h-full w-auto object-contain"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                {/* Product Details */}
                                <div className="p-6">
                                    {/* Product Name */}
                                    <h3 className="font-bold text-xl text-gray-800 mb-3 truncate group-hover:text-green-600 transition-colors">
                                        {offer.product_name}
                                    </h3>

                                    {/* Store Info */}
                                    <div className="flex items-center gap-2 mb-4 text-gray-600">
                                        <FaStore className="text-green-600" />
                                        <span className="text-sm font-medium">{offer.stall.name}</span>
                                    </div>

                                    {/* Price Section */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center text-gray-400 line-through">
                                            <FaBangladeshiTakaSign className="text-sm" />
                                            <span className="font-semibold">{offer.product_price.previous_price}</span>
                                        </div>
                                        <div className="flex items-center text-2xl font-bold text-green-600">
                                            <FaBangladeshiTakaSign />
                                            <span>{offer.product_price.present_price}</span>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <Link to={`/details/${offer._id}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
                                        >
                                            <span>Grab This Deal</span>
                                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </motion.button>
                                    </Link>
                                </div>

                                {/* Animated Border */}
                                <motion.div
                                    className="absolute inset-0 border-2 border-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    animate={{
                                        boxShadow: [
                                            '0 0 0 0 rgba(239, 68, 68, 0)',
                                            '0 0 0 4px rgba(239, 68, 68, 0.2)',
                                            '0 0 0 0 rgba(239, 68, 68, 0)'
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center items-center gap-2 mt-12"
                    >
                        {/* Previous Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                currentPage === 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-md'
                            }`}
                        >
                            Previous
                        </motion.button>

                        {/* Page Numbers */}
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <motion.button
                                    key={pageNum}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`w-10 h-10 rounded-full font-bold transition-all ${
                                        currentPage === pageNum
                                            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-110'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                    }`}
                                >
                                    {pageNum}
                                </motion.button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-md'
                            }`}
                        >
                            Next
                        </motion.button>
                    </motion.div>
                )}

                {/* Page Info */}
                {totalPages > 1 && (
                    <div className="text-center mt-4 text-gray-600">
                        Showing {startIndex + 1}-{Math.min(endIndex, offers.length)} of {offers.length} deals
                    </div>
                )}
            </div>
        </section>
    );
};

export default DiscountProducts;