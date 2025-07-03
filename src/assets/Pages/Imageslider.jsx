import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useNavigate } from 'react-router-dom';

const ImageSlider = () => {
  const navigate = useNavigate();
  const images = [
    {
      url: "https://plus.unsplash.com/premium_photo-1695460203290-b85120ac6967?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Premium Baby Essentials",
      subtitle: "Everything your little one deserves"
    },
    {
      url: "https://images.unsplash.com/photo-1690551900519-82b94bfe7021?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Adorable Baby Clothes",
      subtitle: "Soft, comfortable and stylish"
    },
    {
      url: "https://images.unsplash.com/photo-1693331239174-2d984c1e455b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Step Into Comfort",
      subtitle: "Stylish magical steps"
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1683133872854-aa663cf3b125?q=80&w=2921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Educational Toys",
      subtitle: "Fun and development combined"
    }
];

  return (
    <div className="relative w-full h-screen">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white !opacity-80',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-pink-500'
        }}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false
        }}
        effect="fade"
        speed={1000}
        loop={true}
        className="h-full w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={img.url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center">
                <div className="text-center px-4 max-w-3xl">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
                    {img.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white mb-8 animate-fadeIn">
                    {img.subtitle}
                  </p>
                  <button
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                    onClick={() => navigate("/products")}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;