import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import {
  getListPage,
  getSinglePages,
  getSinglePagesSlug,
} from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { markdownify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
const { blog_folder } = config.settings;

// blog pagination
const BlogPagination = ({ postIndex, posts, currentPage, pagination }) => {
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter, content } = postIndex;
  const { title } = frontmatter;

  return (
    <Base title={title}>
      <section className="section">
        <div className="container">
          {markdownify(title, "h1", "h1 text-center font-normal text-[56px]")}
          <Posts posts={currentPosts} />
          <Pagination
            section={blog_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </Base>
  );
};

export default BlogPagination;

// get blog pagination slug
export const getStaticPaths = () => {
  const allSlug = getSinglePagesSlug(`content/${blog_folder}`);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const posts = getSinglePages(`content/${blog_folder}`).sort(
    (post1, post2) =>
      new Date(post2.frontmatter.date) - new Date(post1.frontmatter.date)
  );
  const postIndex = await getListPage(`content/${blog_folder}`);
  const mdxContent = await parseMDX(postIndex.content);

  return {
    props: {
      pagination: pagination,
      posts: posts,
      currentPage: currentPage,
      postIndex: postIndex,
      mdxContent: mdxContent,
    },
  };
};
