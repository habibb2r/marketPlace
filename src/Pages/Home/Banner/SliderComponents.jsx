
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './SlideComponents.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import image1 from '../../../assets/ad/headphone.png'
import image2 from '../../../assets/ad/headphone2.png'
import image3 from '../../../assets/ad/ii2.png'
import image4 from '../../../assets/ad/readmi.png'
import image5 from '../../../assets/ad/redmi1.png'
import image6 from '../../../assets/ad/watch.png'
import image7 from '../../../assets/ad/watch2.png'
import image8 from '../../../assets/ad/iii.png'



export const SliderComponents = () => {
    return (
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="banner"
      >
        <SwiperSlide className='swiper-slide-banner'><img src={image1} alt="" /></SwiperSlide>
        <SwiperSlide className='swiper-slide-banner'><img src={image2} alt="" /></SwiperSlide>
        <SwiperSlide className='swiper-slide-banner'><img src={image3} alt="" /></SwiperSlide>
        <SwiperSlide className='swiper-slide-banner'><img src={image4} alt="" /></SwiperSlide>
        <SwiperSlide className='swiper-slide-banner'><img src={image5} alt="" /></SwiperSlide>
        <SwiperSlide className='swiper-slide-banner'><img src={image6} alt="" /></SwiperSlide>
        <SwiperSlide className='swiper-slide-banner'><img src={image7} alt="" /></SwiperSlide>
        <SwiperSlide className='swiper-slide-banner'><img src={image8} alt="" /></SwiperSlide>
        
    
      </Swiper>
    );
};
