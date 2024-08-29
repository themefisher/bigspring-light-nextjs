import { markdownify } from "@lib/utils/textConverter";
import MDXContent from "app/helper/MDXContent";
import Image from "next/image";
import SeoMeta from "./SeoMeta";

const PostSingle = ({ frontmatter, content }) => {
  let { description, title, image } = frontmatter;
  description = description ? description : content.slice(0, 120);

  return (
    <>
      <SeoMeta title={title} description={description} />
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="col-12 mx-auto text-center md:col-8">
              {image && (
                <Image
                  src={image}
                  height="500"
                  width="1000"
                  alt={title}
                  priority={true}
                  layout="responsive"
                  className="rounded-lg"
                />
              )}
              {markdownify(title, "h1", "h2 mb-6 mt-6 text-left")}

              <div className="content mb-16 text-left">
                <MDXContent content={content} />
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;
