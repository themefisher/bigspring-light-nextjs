import MDXContent from "@/app/helper/MDXContent";
import { markdownify } from "@lib/utils/textConverter";

const Default = ({ data }) => {
  const { frontmatter, content } = data;
  const { title } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "h2 mb-8 text-center")}
        <div className="content">
          <MDXContent content={content} />
        </div>
      </div>
    </section>
  );
};

export default Default;
