import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./SlideDiscount.css";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import useOfferProducts from "../../../Hooks/useOfferProducts";
import { Link } from "react-router-dom";
import { FcShop } from "react-icons/fc";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Loading from "../../Shared/Loading/Loading";


const SlideDiscount = () => {
  const [offers, isLoading] = useOfferProducts();
  if (isLoading){
    <Loading></Loading>
  }
  return (
    <Swiper
    autoplay={{
      delay: 1500,
      disableOnInteraction: false,
    }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, FreeMode, Pagination]}
      className="offer"
      
    >
      {offers.map((offer) => (
        <SwiperSlide key={offer._id} className="swiper-slide-offer rounded-lg">
          <div className="h-[400px] md:w-[650px] md:h-[300px] bg-base-100 shadow-xl shadow-success px-4 py-4 flex flex-col md:flex-row justify-between items-center rounded-lg md:gap-5">
            <figure>
              <img className="h-[150px] md:h-[300px]"
                src={offer.product_image}
                alt="Discount Products"
              />
            </figure>
            <div className="flex flex-col justify-start items-start gap-3">
              <div className="flex flex-col justify-start items-start text-start">
              <h2 className="font-bold text-sm md:text-xl pb-2">{offer.product_name}</h2>
              <div className="text-sm md:text-xl">Discount Available on : <br />
              <div className="flex items-center gap-1 p-1">
              <FcShop className="text-4xl" />
              <Link className="font-mono font-semibold shadow-sm  p-1 rounded-lg shadow-primary">
              {offer.stall_name}</Link>
              </div>
              </div>

              <div className="font-medium md:py-2 text-sm md:text-xl">
                <p className="flex items-center mb-2"><span>Previous Price : <span className="font-semibold text-error">{offer.product_price.previous_price}</span></span> <FaBangladeshiTakaSign /></p>
                <p className="flex items-center"><span>Present Price : <span className="font-semibold text-primary">{offer.product_price.present_price}</span></span> <FaBangladeshiTakaSign /></p>
              </div>
              </div>
              <Link to={`/details/${offer._id}`} className="card-actions justify-end">
                <button className="btn btn-secondary">Check out</button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
      {/* <SwiperSlide className='swiper-slide-offer'>Slide 2</SwiperSlide>
        <SwiperSlide className='swiper-slide-offer'>Slide 3</SwiperSlide>
        <SwiperSlide className='swiper-slide-offer'>Slide 4</SwiperSlide>
        <SwiperSlide className='swiper-slide-offer'>Slide 5</SwiperSlide>
        <SwiperSlide className='swiper-slide-offer'>Slide 6</SwiperSlide>
        <SwiperSlide className='swiper-slide-offer'>Slide 7</SwiperSlide>
        <SwiperSlide className='swiper-slide-offer'>Slide 8</SwiperSlide>
        <SwiperSlide className='swiper-slide-offer'>Slide 9</SwiperSlide> */}
    </Swiper>
  );
};

export default SlideDiscount;
