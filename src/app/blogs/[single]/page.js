import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
const { blog_folder } = config.settings;

// post single layout
const Article = async ({ params }) => {
  const { single } = params;
  const posts = await getSinglePage(`content/${blog_folder}`);
  const post = posts.filter((p) => p.slug == single);
  const { frontmatter, content } = post[0];

  return <PostSingle frontmatter={frontmatter} content={content} />;
};

// get post single slug
export const generateStaticParams = () => {
  const allSlug = getSinglePage(`content/${blog_folder}`);
  const paths = allSlug.map((item) => ({
    single: item.slug,
  }));

  return paths;
};

export default Article;
