import CardSubCategories from "./CardSubCategories";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function SubcategoryCarousel({ subcategories }) {
  const slides = [];
  {
    slides.push(
      subcategories.map((category) => (
        <SwiperSlide key={category.id}>
          <Link to={`/gigs?category=${category.id}`}>
            <CardSubCategories
              title={category.title}
              description={category.description}
              url={category.url}
            />
          </Link>
        </SwiperSlide>
      ))
    );
  }

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={5}
      navigation
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1080: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
        1920: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
    >
      {slides}
    </Swiper>
  );
}
