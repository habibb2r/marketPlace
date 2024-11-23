import Lottie from "lottie-react";
import about from "./abt.json";
import { Link } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import abouticon from "../../../assets/for title/001-marketplace.png";
import abouticont from "../../../assets/for title/003-market-segment.png";
import {motion} from 'framer-motion'

const About = () => {
  return (
    <div className="md:py-10">
      <SectionTitle
        title={"About"}
        ico={abouticon}
        ict={abouticont}
      ></SectionTitle>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-2 md:gap-10">
        <motion.div initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.9, ease: 'easeInOut'}} className="md:w-1/2 px-5">
          <div className="flex flex-col justify-start items-start gap-4 ">
            <h1 className="text-3xl font-semibold">
              Welcome to Panda MarketPlace: Your Ultimate Online Shopping
            </h1>
            <p className="text-xl text-justify">
              Destination Panda MarketPlace is your one-stop destination for all
              your shopping needs, offering a diverse and vibrant online
              marketplace where you can find a wide array of products across
              various categories. Our platform is designed to provide a seamless
              shopping experience, connecting buyers with sellers from all over
              the world. Here is what makes Panda MarketPlace the best place to
              shop online:
            </p>

            <Link
              to="/about"
              className="rounded-md px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">Know More..</span>
            </Link>
          </div>
        </motion.div>
        <motion.div initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.9, ease: 'easeInOut'}}
          className="md:w-1/2"
        >
          <Lottie animationData={about}></Lottie>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
