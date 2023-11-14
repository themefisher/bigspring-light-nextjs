import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

function Cta({ cta, modalOpeningFunction }) {
  return (
    <section className="px-4 section">
      <div className="container shadow section rounded-xl">
        <div className="items-center justify-center mx-auto row">
          <div className="md:col-5 lg:col-4">
            <Image
              className="w-full"
              src={cta?.image}
              alt="call to action image"
              width={325}
              height={206}
            />
          </div>
          <div className="mt-5 text-center md:mt-0 md:text-left md:col-6 lg:col-5">
            <h2>{cta?.title}</h2>
            <p className="mt-6">{markdownify(cta?.content)}</p>
            {cta.button.enable && (
              <button
                className="mt-4 btn btn-primary"
                id="start-reservation-checkout-lower-cta-section"
                type="button"
                onClick={modalOpeningFunction}
                rel={cta.button.rel}
              >
                {cta.button.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
