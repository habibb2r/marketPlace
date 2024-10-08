import banner1 from './images/bannar1.png'
import banner2 from './images/banner2.png'
import banner3 from './images/banner3.png'
import banner4 from './images/banner4.png'
import banner5 from './images/banner5.png'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "./SlideBanner.css";
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

const SliderBanner = () => {
    return (
        <div className="pt-6 px-2 lg:pt-0 lg:h-[100vh]">
            <Swiper  autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }} modules={[Autoplay, Pagination, Navigation]} className="mySwiper">
        <SwiperSlide><img className='shadow-lg shadow-success rounded-md' src={banner1} alt="" /></SwiperSlide>
        <SwiperSlide><img className='shadow-lg shadow-success rounded-md' src={banner2} alt="" /></SwiperSlide>
        <SwiperSlide><img className='shadow-lg shadow-success rounded-md' src={banner3} alt="" /></SwiperSlide>
        <SwiperSlide><img className='shadow-lg shadow-success rounded-md' src={banner4} alt="" /></SwiperSlide>
        <SwiperSlide><img className='shadow-lg shadow-success rounded-md' src={banner5} alt="" /></SwiperSlide>
        
      </Swiper>
        </div>
    );
};

export default SliderBanner;