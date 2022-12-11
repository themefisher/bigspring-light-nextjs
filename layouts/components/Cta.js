import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Cta({ cta }) {
  return (
    <section className="section px-4">
      <div className="section container rounded-xl shadow">
        <div className="row  mx-auto items-center justify-center">
          <div className="md:col-5 lg:col-4">
            <Image
              className="w-full"
              src={cta?.image}
              alt=""
              width={325}
              height={206}
            />
          </div>
          <div className="mt-5 text-center md:mt-0 md:text-left md:col-6 lg:col-5">
            <h2>{cta?.title}</h2>
            <p className="mt-6">{markdownify(cta?.desc)}</p>
            <Link
              className="btn btn-primary mt-4"
              href={cta.button_solid.href}
              rel={cta.button_solid.rel}
            >
              {cta.button_solid.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
