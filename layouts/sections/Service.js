import CtaLink from "@layouts/components/CtaLink";
import Image from "next/image";
import React from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function Service({ service, index }) {
  const isOdd = index % 2 > 0;

  return (
    <section className={`section ${isOdd ? " bg-theme-light" : ""}`}>
      <div className="container">
        <div className="items-center gap-8 md:grid md:grid-cols-2">
          {/* Carousel */}
          <div className={`service-carousel ${!isOdd ? "md:order-2" : ""}`}>
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={
                service.images.length > 1 ? { clickable: true } : false
              }
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              init={service?.images > 1 ? false : true}
            >
              {/* Slides */}
              {service?.images.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Image src={slide} alt="" width={600} height={500} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Content */}
          <div
            className={`service-content mt-5 md:mt-0 ${
              !isOdd ? "md:order-1" : ""
            }`}
          >
            <h2 className="font-bold leading-[40px]">{service?.title}</h2>
            <p className="mt-4 mb-2">{service?.content}</p>
            <CtaLink href="#">Check it out</CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
