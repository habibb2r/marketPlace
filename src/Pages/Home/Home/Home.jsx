import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaStore, FaTruck, FaShieldAlt, FaUsers, FaStar, FaBox, FaHeadset, FaLeaf, FaGift, FaHeart, FaTag } from "react-icons/fa";
import About from "../About/About";
import Banner from "../Banner/Banner";
import EraSlide from "../AdBoard/EraSlide";
import BuyStall from "../BuyStall/BuyStall";
import Categories from "../Categories/Categories";
import DiscountProducts from "../DiscountProducts/DiscountProducts";
import Reviews from "../Reviews/Reviews";
import TopStalls from "../TopStalls/TopStalls";
import useCategories from "../../../Hooks/useCategories";
import useAllProducts from "../../../Hooks/useAllProducts";
import { useState } from "react";

const Home = () => {
    // Fetch real data
    const [categ] = useCategories();
    const [allItems] = useAllProducts({ filter: '', sort: '' });
    const { scrollY } = useScroll();
    const [hoveredFeature, setHoveredFeature] = useState(null);
    
    // Parallax effect for hero section
    const y = useTransform(scrollY, [0, 300], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Real marketplace stats
    const totalProducts = allItems?.length || 10000;
    const totalCategories = categ?.length || 50;
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    const floatVariants = {
        float: {
            y: [-10, 10, -10],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const features = [
        {
            icon: <FaShoppingBag className="text-4xl" />,
            title: "Vast Selection",
            description: `${totalProducts.toLocaleString()}+ quality products across ${totalCategories}+ categories`,
            color: "from-green-400 to-green-600",
            hoverColor: "group-hover:from-green-500 group-hover:to-green-700"
        },
        {
            icon: <FaTruck className="text-4xl" />,
            title: "Swift Delivery",
            description: "Fast & reliable nationwide shipping with tracking",
            color: "from-emerald-400 to-emerald-600",
            hoverColor: "group-hover:from-emerald-500 group-hover:to-emerald-700"
        },
        {
            icon: <FaShieldAlt className="text-4xl" />,
            title: "Secure Checkout",
            description: "100% secure payments with buyer protection",
            color: "from-teal-400 to-teal-600",
            hoverColor: "group-hover:from-teal-500 group-hover:to-teal-700"
        },
        {
            icon: <FaHeadset className="text-4xl" />,
            title: "24/7 Support",
            description: "Dedicated support team always ready to assist",
            color: "from-cyan-400 to-cyan-600",
            hoverColor: "group-hover:from-cyan-500 group-hover:to-cyan-700"
        }
    ];

    const stats = [
        { 
            icon: <FaUsers className="text-5xl" />, 
            value: "50K+", 
            label: "Happy Customers",
            subtext: "& Growing Daily",
            color: "text-green-400"
        },
        { 
            icon: <FaStore className="text-5xl" />, 
            value: "500+", 
            label: "Trusted Sellers",
            subtext: "Verified Partners",
            color: "text-emerald-400"
        },
        { 
            icon: <FaBox className="text-5xl" />, 
            value: `${Math.floor(totalProducts/1000)}K+`, 
            label: "Products",
            subtext: `${totalCategories}+ Categories`,
            color: "text-teal-400"
        },
        { 
            icon: <FaStar className="text-5xl" />, 
            value: "4.8/5", 
            label: "Average Rating",
            subtext: "Customer Satisfaction",
            color: "text-yellow-400"
        }
    ];

    const benefits = [
        {
            icon: <FaLeaf className="text-3xl" />,
            title: "Eco-Friendly Options",
            description: "Supporting sustainable products"
        },
        {
            icon: <FaGift className="text-3xl" />,
            title: "Special Rewards",
            description: "Earn points on every purchase"
        },
        {
            icon: <FaHeart className="text-3xl" />,
            title: "Wishlist & Favorites",
            description: "Save items for later"
        },
        {
            icon: <FaTag className="text-3xl" />,
            title: "Daily Deals",
            description: "New discounts every day"
        }
    ];

    return (
        <div className="overflow-hidden -mt-20">
            {/* Hero Section - Panda Marketplace Theme */}
            <motion.section
                style={{ y, opacity }}
                className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white pt-32 pb-24 lg:pt-40 lg:pb-32">
            >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="mb-6"
                        >
                            <span className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold">
                                🐼 Welcome to Panda MarketPlace
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                        >
                            Your Ultimate <span className="text-yellow-300">Online Shopping</span> Destination
                        </motion.h1>

                        <motion.p
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl lg:text-2xl mb-10 text-green-50 max-w-3xl mx-auto leading-relaxed"
                        >
                            Discover amazing products from <span className="font-semibold text-white">{totalCategories}+ categories</span> with <span className="font-semibold text-white">500+ verified sellers</span>. Shop smart, shop local, shop with confidence! 🛍️
                        </motion.p>

                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                            className="flex flex-wrap gap-4 justify-center items-center"
                        >
                            <Link to="/allproducts">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg shadow-2xl overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <FaShoppingBag />
                                        Start Shopping
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                            </Link>

                            <Link to="/login">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-transparent border-3 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 shadow-lg flex items-center gap-2"
                                >
                                    <FaStore />
                                    Become a Seller
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Quick Stats Preview */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                        >
                            {[
                                { label: "Products", value: `${Math.floor(totalProducts/1000)}K+` },
                                { label: "Categories", value: `${totalCategories}+` },
                                { label: "Sellers", value: "500+" },
                                { label: "Rating", value: "4.8★" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                                >
                                    <div className="text-3xl font-bold text-yellow-300">{item.value}</div>
                                    <div className="text-sm text-green-100">{item.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Floating Decorative Elements */}
                <motion.div variants={floatVariants} animate="float" className="absolute bottom-20 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <motion.div variants={floatVariants} animate="float" className="absolute top-32 right-16 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl" />
                <motion.div variants={floatVariants} animate="float" className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-300/20 rounded-full blur-xl" />
            </motion.section>

            {/* Features Section - Why Choose Panda MarketPlace */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-20 bg-gradient-to-b from-gray-50 to-white"
            >
                <div className="container mx-auto px-4">
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Why Choose <span className="text-green-600">Panda MarketPlace</span>?
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Experience the best online shopping with our commitment to quality, security, and customer satisfaction
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -15, scale: 1.02 }}
                                onHoverStart={() => setHoveredFeature(index)}
                                onHoverEnd={() => setHoveredFeature(null)}
                                className="group relative bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Background gradient on hover */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                                />
                                
                                <motion.div
                                    animate={hoveredFeature === index ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className={`relative w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} ${feature.hoverColor} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all`}
                                >
                                    {feature.icon}
                                </motion.div>

                                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-green-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                                {/* Animated border */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-400"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: hoveredFeature === index ? "100%" : "0%" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Stats Section - Panda MarketPlace Achievements */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white overflow-hidden"
            >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <motion.div
                        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                            backgroundSize: "50px 50px"
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.h2
                        initial={{ y: -30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center mb-16"
                    >
                        Our Growing Community 🚀
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                                whileHover={{ scale: 1.1, y: -10 }}
                                className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                            >
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className={`text-6xl mb-4 flex justify-center ${stat.color}`}
                                >
                                    {stat.icon}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    className="text-5xl font-bold mb-2 text-yellow-300"
                                >
                                    {stat.value}
                                </motion.div>

                                <div className="text-xl font-semibold mb-1">{stat.label}</div>
                                <div className="text-sm text-green-100 opacity-90">{stat.subtext}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Additional Benefits Section */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-20 bg-white"
            >
                <div className="container mx-auto px-4">
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            More Reasons to <span className="text-green-600">Love Us</span> 💚
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-green-50 transition-colors duration-300 cursor-pointer"
                            >
                                <div className="text-green-600 mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Original Sections with animations */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Banner />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <About />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Categories />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <DiscountProducts />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <BuyStall />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <TopStalls />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <EraSlide />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Reviews />
            </motion.div>
        </div>
    );
};

export default Home;