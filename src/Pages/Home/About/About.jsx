import Lottie from "lottie-react";
import about from "./abt.json";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShieldAlt, FaUsers, FaRocket } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaCheckCircle className="text-2xl" />,
      title: "Quality Guaranteed",
      description: "Every product verified for authenticity"
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Secure Shopping",
      description: "Your data is always protected"
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Trusted Sellers",
      description: "500+ verified marketplace vendors"
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Fast Delivery",
      description: "Quick nationwide shipping"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            About <span className="text-green-600">Panda MarketPlace</span>
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-gray-800 leading-tight"
            >
              Your Ultimate <span className="text-green-600">Online Shopping</span> Destination 🐼
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Panda MarketPlace is your one-stop destination for all your shopping needs, offering a diverse and vibrant online marketplace where you can find a wide array of products across various categories.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Our platform is designed to provide a <span className="font-semibold text-green-600">seamless shopping experience</span>, connecting buyers with trusted sellers from all over the country. Shop with confidence, shop with Panda!
            </motion.p>

            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Discover More About Us</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <Lottie animationData={about} className="w-full max-w-lg mx-auto" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-50"></div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
