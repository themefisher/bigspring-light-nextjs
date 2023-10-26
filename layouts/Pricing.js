import Link from "next/link";
import Cta from "./components/Cta";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import ReservationCheckoutFlow from "@layouts/components/ReservationCheckoutFlow";
import { useState, useEffect } from "react";


function Pricing({ data }) {

  const { frontmatter, mdxContent } = data;
  const { title, plans, call_to_action } = frontmatter;
  const [isReservationCheckoutVisible, setIsReservationCheckoutVisible] = useState(false);

  const startReservationCheckout = () => {
    setIsReservationCheckoutVisible(true);
  };

  const closeReservationCheckout = () => {
    setIsReservationCheckoutVisible(false);
  };

  useEffect(() => {
    if (isReservationCheckoutVisible) {
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
  }, [isReservationCheckoutVisible]);

  return (
    <>
      <section className="pb-0 section">
        <div className="container">
          <h1 className="font-normal text-center">{title}</h1>
          <div className="justify-center -mt-10 section row md:mt-0">
            {plans.map((plan, index) => (
              <div
                className={`col-12 md:col-4 ${!plan.recommended ? "lg:px-0" : "col-recommended"
                  }`}
                key={plan.title + index}
              >
                <div className="text-center card">
                  <h4>{plan.title}</h4>
                  <div className="mt-5">
                    <span className="text-5xl text-dark">${plan.price}</span>
                    <span>/ {plan.type}</span>
                  </div>
                  <h5 className="mt-2 font-normal text-text">
                    {plan.subtitle}
                  </h5>
                  <ul className="mt-5">
                    {plan.features.map((feature, index) => (
                      <li className="mb-[10px] leading-5" key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`btn mt-5 ${plan.recommended ? "btn-primary" : "btn-outline-primary"
                      }`}
                    onClick={startReservationCheckout}
                  >
                    {plan.button.label}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {isReservationCheckoutVisible && (
            <section className="absolute inset-0 z-10 flex items-center justify-center h-screen overflow-hidden">
              <ReservationCheckoutFlow closeReservationCheckout={closeReservationCheckout} />
            </section>
          )}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="mx-auto text-center col-12 md:col-8">
              <div className="mb-16 text-left content">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>
            </article>
          </div>
        </div>
      </section>
      <Cta cta={call_to_action} />
    </>
  );
}

export default Pricing;
