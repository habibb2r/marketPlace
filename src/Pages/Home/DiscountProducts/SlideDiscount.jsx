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
  
  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        // when window width is >= 1024px (large devices)
        1024: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is < 1024px (medium and small devices)
        0: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      }}
      freeMode={true}
      pagination={{
        clickable: true,
        dynamicBullets: true
      }}
      modules={[Autoplay, FreeMode, Pagination]}
      className="offer"
    >
      {offers.map((offer) => (
        <SwiperSlide key={offer._id} className="swiper-slide-offer rounded-lg p-2">
          <div className="h-[400px] w-full lg:h-[300px] bg-base-100 shadow-xl shadow-success px-4 py-4 flex flex-col md:flex-row justify-around items-center rounded-lg gap-4">
            <figure className="md:w-2/5 h-[150px] md:h-[250px] flex items-center justify-center">
              <img 
                className="max-h-full w-auto rounded-md p-3 object-contain"
                src={offer.product_image}
                alt={offer.product_name}
              />
            </figure>
            
            <div className="flex flex-col justify-start items-start gap-3 md:w-3/5">
              <div className="flex flex-col justify-start items-start text-start w-full">                <h2 className="font-bold text-sm md:text-xl pb-2 max-w-full">
                  <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap w-[200px] sm:w-[280px] md:w-[320px] lg:w-[400px]" title={offer.product_name}>
                    {offer.product_name}
                  </span>
                </h2>
                
                <div className="text-sm md:text-xl">
                  Discount Available on:
                  <div className="flex items-center gap-1 p-1">
                    <FcShop className="text-4xl" />
                    <Link className="font-mono font-semibold shadow-sm p-1 rounded-lg shadow-primary">
                      {offer.stall.name}
                    </Link>
                  </div>
                </div>

                <div className="font-medium md:py-2 text-sm md:text-xl flex flex-wrap items-center gap-3">
                  <p className="flex items-center">
                    <span>Price: <span className="font-semibold text-error line-through">{offer.product_price.previous_price}</span></span>
                    <FaBangladeshiTakaSign />
                  </p>
                  <p className="flex items-center">
                    <span className="font-semibold text-primary">{offer.product_price.present_price}</span>
                    <FaBangladeshiTakaSign />
                  </p>
                </div>
              </div>
              
              <Link 
                to={`/details/${offer._id}`} 
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
              >
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  Check out
                </span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideDiscount;
