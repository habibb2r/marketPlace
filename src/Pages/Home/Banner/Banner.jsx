// import EraSlide from "./EraSlide";
import useConnect from "../../../Hooks/useConnect";
import SliderBanner from "./SliderBanner";



const Banner = () => {
    const [preloader,] = useConnect();
    console.log(preloader)
    return (
        <div className="lg:h-[100vh] rounded-md">
           <SliderBanner></SliderBanner>
            {/* <EraSlide></EraSlide> */}
        </div>
    );
};

export default Banner;