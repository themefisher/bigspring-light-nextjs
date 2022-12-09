import Image from "next/image";
import React from "react";

function FeatureCard({ data }) {
  const { title, icon, desc } = data;
  return (
    <div className="feature-card rounded-xl bg-white p-5 pb-8 text-center">
      {icon && (
        <Image className="mx-auto" src={icon} width={30} height={30} alt="" />
      )}
      <div className="mt-4">
        <h5>{title}</h5>
        <p className="mt-3">{desc}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
