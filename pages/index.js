import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Workflow from "@layouts/sections/Workflow";
import Service from "@layouts/sections/Service";
import { getListPage } from "../lib/contentParser";
import Cta from "@layouts/sections/Cta";
import Banner from "@layouts/sections/Banner";
import Features from "@layouts/sections/Features";

const Home = ({ frontmatter }) => {
  const {
    banner,
    feature,
    services,
    workflow,
    call_to_action: cta,
  } = frontmatter;
  const { title } = config.site;

  return (
    <Base title={title}>
      {/* hero */}
      <Banner content={banner} />

      {/* Features */}
      <Features content={feature} />

      {/* services */}
      {services.map((service, index) => {
        return <Service key={index} index={index} service={service} />;
      })}

      {/* Banner */}
      <Workflow workflow={workflow} />

      {/* Cta */}
      <Cta cta={cta} />
    </Base>
  );
};

export const getStaticProps = async () => {
  const homePage = await getListPage("content");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Home;
