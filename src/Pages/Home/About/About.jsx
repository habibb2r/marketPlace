import Lottie from "lottie-react";
import about from "./abt.json";
import { Link } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const About = () => {
  return (
    <div className="md:py-10">
        <SectionTitle title={'About This MarketPlace'}></SectionTitle>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-2 md:gap-10">
        <div className="flex flex-col justify-start items-start gap-4 md:w-1/2 px-5">
          <h1 className="text-3xl font-semibold">Welcome to Panda MarketPlace: Your Ultimate Online Shopping</h1>
          <p className="text-xl text-justify">
            Destination Panda MarketPlace is your one-stop destination for all
            your shopping needs, offering a diverse and vibrant online
            marketplace where you can find a wide array of products across
            various categories. Our platform is designed to provide a seamless
            shopping experience, connecting buyers with sellers from all over
            the world. Here is what makes Panda MarketPlace the best place to
            shop online:
          </p>
          <Link to='/about' className="btn btn-accent font-bold text-md">Know More..</Link>
        </div>
        <Lottie className="md:w-1/2" animationData={about}></Lottie>
      </div>
    </div>
  );
};

export default About;
