import Image from "next/image";
import React from "react";

function Workflow({ workflow }) {
  return (
    <section className="section pb-0">
      <div className="mb-8 text-center">
        <h2 className="mx-auto max-w-[400px] font-bold leading-[44px]">
          {workflow.title}
        </h2>
      </div>
      <Image src={workflow.image} alt="" width={1920} height={296} />
    </section>
  );
}

export default Workflow;
