import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSinglePages, getSinglePagesSlug } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
const { blog_folder } = config.settings;

// post single layout
const Article = ({ post, authors, mdxContent, slug }) => {
  const { frontmatter, content } = post[0];

  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      authors={authors}
      slug={slug}
    />
  );
};

// get post single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePagesSlug(`content/${blog_folder}`);
  const paths = allSlug.map((slug) => ({
    params: {
      single: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const posts = getSinglePages(`content/${blog_folder}`);
  const post = posts.filter((p) => p.slug == single);
  const mdxContent = await parseMDX(post[0].content);

  return {
    props: {
      post: post,
      mdxContent: mdxContent,
      slug: single,
    },
  };
};

export default Article;
