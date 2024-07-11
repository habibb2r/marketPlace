import "./myCSS.css";
import bannerjson from './banner.json'
import image1 from "../../../assets/ad/headphone.png";
import image2 from "../../../assets/ad/headphone2.png";
import image3 from "../../../assets/ad/ii2.png";
import image4 from "../../../assets/ad/readmi.png";
import image5 from "../../../assets/ad/redmi1.png";
import image6 from "../../../assets/ad/watch.png";
import image7 from "../../../assets/ad/watch2.png";
import image8 from "../../../assets/ad/iii.png";
import Lottie from "lottie-react";
const EraSlide = () => {
  return (
    <div className="my-body">
      <div className="my-bannner">
        <div className="my-slider" style={{ "--quantity": 7 }}>
          <div className="item" style={{ "--position": 1 }}>
            <img src={image2} alt="" />
          </div>
          <div className="item" style={{ "--position": 2 }}>
            <img src={image1} alt="" />
          </div>
          <div className="item" style={{ "--position": 3 }}>
            <img src={image3} alt="" />
          </div>
          <div className="item" style={{ "--position": 4 }}>
            <img src={image4} alt="" />
          </div>
          <div className="item" style={{ "--position": 5 }}>
            <img src={image5} alt="" />
          </div>
          <div className="item" style={{ "--position": 6 }}>
            <img src={image6} alt="" />
          </div>
          <div className="item" style={{ "--position": 7 }}>
            <img src={image7} alt="" />
          </div>
        </div>
        <div className="content">
            <Lottie className="h-[450px]" animationData={bannerjson}></Lottie>
        </div>
      </div>
      
    </div>
  );
};

export default EraSlide;
