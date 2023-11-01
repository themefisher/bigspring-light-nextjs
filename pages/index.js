import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Cta from "@layouts/components/Cta";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";
import { useState, useEffect } from "react";
import MailingListOptin from "@layouts/partials/MailingListOptin";
import ReservationCheckoutFlow from "@layouts/components/ReservationCheckoutFlow";



const Home = ({ frontmatter }) => {
  const { meta_title, banner, feature, services, workflow, call_to_action } = frontmatter;
  const { title } = config.site;
  const [isReservationCheckoutVisible, setIsReservationCheckoutVisible] = useState(false);
  const [isMailingListOptinVisible, setIsMailingListOptinVisible] = useState(false);

  const startReservationCheckout = () => {
    setIsReservationCheckoutVisible(true);
  };

  const closeReservationCheckout = () => {
    setIsReservationCheckoutVisible(false);
  };

  const openMailingListModal = () => {
    setIsMailingListOptinVisible(true);
  };

  const closeMailingListModal = () => {
    setIsMailingListOptinVisible(false);
  };

  useEffect(() => {
    async function delayModalOpening() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
    }

    delayModalOpening().then(() => {
      setIsMailingListOptinVisible(true);
    });
  }, []);


  useEffect(() => {
    if (isReservationCheckoutVisible || isMailingListOptinVisible) {
      // Prevent scrolling when the modal is visible
      document.body.style.overflow = "hidden";
    } else {
      // Reset the body's overflow property
      document.body.style.overflow = "auto";
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isReservationCheckoutVisible, isMailingListOptinVisible]);

  return (
    <Base title={meta_title ?? title} openModalFunction={openMailingListModal}>
      {/* Banner */}
      <section className="section pb-[50px]">
        <div className="container">
          <div className="text-center row">
            <div className="mx-auto lg:col-10">
              <h1 className="text-2xl font-bold font-primary md:text-4xl">{banner.title}</h1>
              <p className="mt-4 italic text-md md:text-2xl font-secondary">{banner.content}</p>
              <p className="mt-4 text-md md:text-2xl">{banner.content_2}</p>
              {banner.button.enable && (
                <button
                  className="mt-4 btn btn-primary"
                  id="start-reservation-checkout-hero-section"
                  type="button"
                  onClick={startReservationCheckout}
                >
                  {banner.button.label}
                </button>
              )}
              <div className="">
                <Image
                  className="mx-auto mt-12 rounded-md shadow-lg"
                  src={banner.image}
                  width={1500}
                  height={800}
                  alt="A mother and her new infant bonding at Yuzi Care's postpartum retreat for new mothers."
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        {isReservationCheckoutVisible && (
          <section className="z-10 flex items-center justify-center w-full h-screen">
            <ReservationCheckoutFlow closeReservationCheckout={closeReservationCheckout} />
          </section>
        )}
        {isMailingListOptinVisible && (
          <section className="z-10 flex items-center justify-center w-full h-screen">
            <MailingListOptin
              onClose={closeMailingListModal}
            />
          </section>
        )}
      </section>

      {/* Features */}
      <section className="section bg-theme-light">
        <div className="container">
          <div className="text-center">
            <h2>{feature.title}</h2>
          </div>
          <div className="grid mt-8 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {feature.features.map((item, i) => (
              <div
                className="p-5 pb-8 text-center bg-white feature-card rounded-xl"
                key={`feature-${i}`}
              >
                {/* {item.icon && (
                  <Image
                    className="mx-auto"
                    src={item.icon}
                    width={60}
                    height={60}
                    alt=""
                  />
                )} */}
                <div className="mt-4">
                  {markdownify(item.name, "h3", "h5")}
                  <p className="mt-3">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services */}
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
                        <Image src={slide} className="pb-2" alt="We offer a variety of services: spa; pelvic floor PT; yoga; custom meal planning." width={600} height={500} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Content */}
                <div
                  className={`service-content mt-5 md:mt-0 ${!isOdd && "md:order-1"
                    }`}
                >
                  <h2 className="font-bold leading-[40px]">{service?.title}</h2>
                  <p className="mt-4 mb-2">{service?.content}</p>
                  {service.button.enable && (
                    <Link
                      href={service?.button.link}
                      className="inline-flex items-center cta-link text-primary"
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

      {/* workflow */}
      <section className="pb-0 section">
        <div className="mb-8 text-center">
          {markdownify(
            workflow.title,
            "h2",
            "mx-auto font-bold leading-[44px]"
          )}
          {markdownify(workflow.description, "p", "mt-3 text-md md:text-2xl")}
        </div>
        <div>
          <Image
            src={workflow.image}
            alt="Ready to join an inclusive and supportive community for new mothers?"
            width={1920}
            height={400}
            className="mx-auto w-[100%] object-cover max-h-[500px]"
          />
        </div>
      </section>

      {/* Cta */}
      <Cta cta={call_to_action} modalOpeningFunction={startReservationCheckout} />
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
