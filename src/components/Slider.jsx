import { GrFormNext } from "react-icons/gr";
import { FaChevronLeft } from "react-icons/fa";

import "swiper/css";

import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import slideImage1 from "../assets/sliderImages/1.jpg";
import slideImage2 from "../assets/sliderImages/5.jpg";
import slideImage3 from "../assets/sliderImages/3.jpg";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "/src/globalCss.css";

function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={50}
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        navigation={{
          nextEl: ".btn-custom-next",
          prevEl: ".btn-custom-prev",
        }}
        pagination={{clickable: true}}
        autoplay={{ delay: 3000 }}
        
        className="relative lg:h-[80vh]  swiper z-20"
      >
        <SwiperSlide>
          <img src={slideImage1} alt="" className="w-full h-full object-fit object-center" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slideImage3} alt="" className="w-full h-full object-fit object-center" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slideImage2} alt="" className="w-full h-full object-fit object-center" />
        </SwiperSlide>
        <button className="btn-custom-prev">
          <FaChevronLeft />
        </button>
        <button className="btn-custom-next">
          <GrFormNext />
        </button>
      </Swiper>
    </>
  );
}

export default Slider;
