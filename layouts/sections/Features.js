import FeatureCard from "@layouts/components/FeatureCard";
import { markdownify } from "@lib/utils/textConverter";
import React from "react";

function Features({ content: feature }) {
  return (
    <section className="section bg-theme-light">
      <div className="container">
        <div className="text-center">
          <h2>{markdownify(feature.title)}</h2>
        </div>
        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {feature.features.map((item, index) => (
            <FeatureCard key={index} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
