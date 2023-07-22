import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Cta from "@layouts/components/Cta";
import Contact from "@layouts/Contact";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";

const Home = ({ frontmatter }) => {
  const { banner, feature, verra, services, benefits, contact_us, call_to_action } = frontmatter;
  const { title } = config.site;

  return (
    <Base title={title}>
      {/* Banner */}
      <section className="section pb-[50px] mt-[77px]">
        <div className="container">
          <div className="row text-center">
            <div className="mx-auto lg:col-10">
              <h1 className="font-primary font-bold">{banner.title}</h1>
              <p className="mt-4">{markdownify(banner.content)}</p>
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-4"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
              <Image
                className="mx-auto mt-12"
                src={banner.image}
                width={750}
                height={390}
                alt="banner image"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Indroduction */}
      <section
        className={`section bg-theme-light`}
      >
        <div className="container">
          <div className="items-center gap-8 md:grid md:grid-cols-2">
            {/* Carousel */}
            <div className={`service-carousel`}>
              <Swiper
                modules={[Autoplay, Pagination]}
                // pagination={
                //   service.images.length > 1 ? { clickable: true } : false
                // }
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                // init={service?.images > 1 ? false : true}
              >
                {/* Slides */}
                {/* {service?.images.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <Image src={slide} alt="" width={600} height={500} />
                  </SwiperSlide>
                ))} */}
              </Swiper>
            </div>

            {/* Indroduction */}
            <div
              className={`service-content mt-5 md:mt-0`}
            >
              <h2 className="font-bold leading-[40px]">
              COCOONCO2: 
              Pioneering Carbon Reduction and Enhanced Sustainability in Cement and Concrete
              </h2>
              <p className="mt-4 mb-2">content</p>
              {/* {service.button.enable && (
                <Link
                  href={service?.button.link}
                  className="cta-link inline-flex items-center text-primary"
                >
                  {service?.button.label}
                  <Image
                    className="ml-1"
                    src="/images/arrow-right.svg"
                    width={18}
                    height={14}
                    alt="arrow"
                  />
                </Link>
              )} */}
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <Cta cta={call_to_action} />

      {/* Technology */}
      <section className="section" id="technology">
        <h2 className="text-center font-bold leading-[40px]">Technology</h2>
        {services.map((service, index) => {
          const isOdd = index % 2 > 0;
          return (
            <section
              key={`service-${index}`}
              className={`section ${isOdd && "bg-theme-light"}`}
            >
              <div className="container">
                <div className="items-center gap-8 md:grid md:grid-cols-2">
                  {/* Carousel */}
                  <div className={`service-carousel ${!isOdd && "md:order-2"}`}>
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
                      !isOdd && "md:order-1"
                    }`}
                  >
                    <h2 className="font-bold leading-[40px]">{service?.title}</h2>
                    <p className="mt-4 mb-2">{service?.content}</p>
                    {service.button.enable && (
                      <Link
                        href={service?.button.link}
                        className="cta-link inline-flex items-center text-primary"
                      >
                        {service?.button.label}
                        <Image
                          className="ml-1"
                          src="/images/arrow-right.svg"
                          width={18}
                          height={14}
                          alt="arrow"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </section>

      {/* Certificate */}
      <section className="section bg-theme-light">
        <div className="container">
          <div className="text-center">
            <h2>{markdownify(feature.title)}</h2>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {feature.features.map((item, i) => (
              <div
                className="feature-card rounded-xl bg-white p-5 pb-8 text-center"
                key={`feature-${i}`}
              >
                {item.icon && (
                  <Image
                    className="mx-auto"
                    src={item.icon}
                    width={30}
                    height={30}
                    alt=""
                  />
                )}
                <div className="mt-4">
                  {markdownify(item.name, "h3", "h5")}
                  <p className="mt-3">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verra */}
      <section className="section bg-theme-light">
        <div className="container">
          <div className="text-center">
            <h2>{markdownify(verra.title)}</h2>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {verra.VerraItems.map((item, i) => (
              <div
                className="feature-card rounded-xl bg-white p-5 pb-8 text-center"
                key={`feature-${i}`}
              >
                {item.icon && (
                  <Image
                    className="mx-auto"
                    src={item.icon}
                    width={30}
                    height={30}
                    alt=""
                  />
                )}
                <div className="mt-4">
                  {markdownify(item.name, "h3", "h5")}
                  <p className="mt-3">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <div className="section px-10" id="benefits">
        <h2 className="text-center font-bold leading-[40px] mb-10">Benefits</h2>
        <div className="flex flex-wrap justify-center w-full px-10">
          {benefits.map((benefit, i) => (
            <div key={`key-${i}`} className="col-12 mb-8 sm:col-6 lg:col-4">
              {benefit.image && (
                <Image
                  className="rounded-lg"
                  src={benefit.image}
                  alt={benefit.title}
                  width={i === 0 ? "925" : "445"}
                  height={i === 0 ? "475" : "230"}
                />
              )}
              <h2 className="h3 mb-2 mt-4">
                <Link
                  // href={`/${blog_folder}/${post.slug}`}
                  href=""
                  className="block hover:text-primary"
                >
                  {benefit.title}
                </Link>
              </h2>
              <p className="text-text">{benefit.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Us */}
      <Contact data={contact_us} />

      {/* workflow */}
      {/* <section className="section pb-0">
        <div className="mb-8 text-center">
          {markdownify(
            workflow.title,
            "h2",
            "mx-auto max-w-[400px] font-bold leading-[44px]"
          )}
          {markdownify(workflow.description, "p", "mt-3")}
        </div>
        <Image
          src={workflow.image}
          alt="workflow image"
          width={1920}
          height={296}
        />
      </section> */}
  
    </Base>
  );
};

export const getStaticProps = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Home;
