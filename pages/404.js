import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";
import { getRegularPage } from "@lib/contentParser";

const notFound = ({ data }) => {
  return (
    <Base>
      <NotFound data={data} />
    </Base>
  );
};

// get 404 page data
export const getStaticProps = async () => {
  const notFoundData = await getRegularPage();
  return {
    props: {
      data: notFoundData,
    },
  };
};

export default notFound;
