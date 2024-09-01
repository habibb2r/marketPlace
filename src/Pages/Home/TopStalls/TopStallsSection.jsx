import andr from "../../../assets/for title/andriod.png";
import weba from "../../../assets/for title/www.png";
import phone from "./com.mp4";
import pc from "../../../assets/ad/pc.png";
const TopStallsSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-10 lg:gap-5 pt-5">
      <div className="lg:w-2/6 flex flex-col justify-center items-center gap-4">
        <div className="mockup-phone shadow-xl shadow-success">
          <div className="camera"></div>
          <div className="display md:w-[350px] md:h-[700px]">
            <video
              src={phone}
              className="md:w-[350px] md:h-[700px] rounded-2xl object-fill"
              autoPlay
              loop
              playsInline
            ></video>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <img className="h-[50px]" src={andr} alt="" />
          <p className="font-semibold text-xl">Android Application</p>
        </div>
      </div>
      <div className="lg:w-4/6 flex flex-col justify-center gap-4">
        <div className="mockup-browser bg-success border-2 border-accent shadow-xl shadow-secondary">
          <div className="mockup-browser-toolbar py-2 ">
            <div className="input">
              https://habibb2r-marketplace.netlify.app/
            </div>
          </div>
          <div className="bg-base-200 flex justify-center px-4 pt-12 pb-5">
            <img
              src={pc}
              className=" object-fill rounded-2xl "
              alt="Display Image"
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <img className="h-[50px]" src={weba} alt="" />
          <p className="font-semibold text-xl">Web Application</p>
        </div>
      </div>
    </div>
  );
};

export default TopStallsSection;
