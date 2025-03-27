import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

const ImageSlider = () => {
  const navigate=useNavigate()
  const images = [
    "/Home.png",
    "/cloths.png",
    "/Footwear.png",
    "/toys.png"
  ];

  return (
    <div className="relative max-w-[1500px] mx-auto min-h-[75vh] flex items-center">
      
      {/* Explore Button (Positioned Above Slider) */}
      <button
        className="absolute bottom-5 right-10 z-50 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-200"
        onClick={()=>navigate("/products")}
      >
        Explore
      </button>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-lg w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[90vh] object-cover rounded-lg pt-5"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS to Change Pagination (Bubble) Color to Pink */}
      <style jsx>{`
        .swiper-pagination-bullet {
          background: pink !important;
        }
      `}</style>

    </div>
  );
};

export default ImageSlider;
