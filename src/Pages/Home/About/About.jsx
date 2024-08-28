import Lottie from "lottie-react";
import about from "./abt.json";
import { Link } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import abouticon from "../../../assets/for title/001-marketplace.png";
import abouticont from "../../../assets/for title/003-market-segment.png";
import { AttentionSeeker, Bounce } from "react-awesome-reveal";


const About = () => {

  return (
    <div className="md:py-10">
      <SectionTitle
        title={"About"}
        ico={abouticon}
        ict={abouticont}
      ></SectionTitle>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-2 md:gap-10">
        <Bounce  delay={1} duration={1500} className="md:w-1/2 px-5">
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
            <Link to="/about" className="btn btn-accent font-bold text-md">
              Know More..
            </Link>
          </div>
        </Bounce>
        <AttentionSeeker effect="jello" delay={1} duration={1500} className="md:w-1/2">
          <Lottie animationData={about}></Lottie>
        </AttentionSeeker>
        
      </div>
    </div>
  );
};

export default About;
