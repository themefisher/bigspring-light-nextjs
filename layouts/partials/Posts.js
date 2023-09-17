import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Posts = ({ posts }) => {
  const { blog_folder, summary_length } = config.settings;
  return (
    <div className="pb-0 section row">
      <div className="pb-12 col-12 lg:pb-24">
        <div className="items-center row">
          <div className="col-12 md:col-6">
            {posts[0].frontmatter.image && (
              <Link
                href={`/${blog_folder}/${posts[0].slug}`}
              >
                <Image
                  className="w-full h-auto rounded-lg"
                  src={posts[0].frontmatter.image}
                  alt={posts[0].frontmatter.title}
                  width={540}
                  height={227}
                  priority={true}
                />
              </Link>
            )}
          </div>
          <div className="col-12 md:col-6">
            <h2 className="mt-4 mb-2 h3">
              <Link
                href={`/${blog_folder}/${posts[0].slug}`}
                className="block hover:text-primary"
              >
                {posts[0].frontmatter.title}
              </Link>
            </h2>
            <p className="text-text">
              {plainify(
                posts[0].frontmatter.description ?? posts[0].content?.slice(0, Number(summary_length)),
                "div"
              )}
            </p>
            <Link
              className="mt-4 btn btn-primary"
              href={`/${blog_folder}/${posts[0].slug}`}
              rel=""
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
      {posts.slice(1).map((post, i) => (
        <div key={`key-${i}`} className="mb-8 col-12 sm:col-6 lg:col-4">
          {post.frontmatter.image && (
            <Link
              href={`/${blog_folder}/${post.slug}`}
            >
              <Image
                className="rounded-lg"
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                width={i === 0 ? "925" : "445"}
                height={i === 0 ? "475" : "230"}
              />
            </Link>
          )}
          <h2 className="mt-4 mb-2 h3">
            <Link
              href={`/${blog_folder}/${post.slug}`}
              className="block hover:text-primary"
            >
              {post.frontmatter.title}
            </Link>
          </h2>
          <p className="text-text">{post.frontmatter.desc}</p>
          <Link
            className="mt-4 btn btn-primary"
            href={`/${blog_folder}/${post.slug}`}
            rel=""
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
