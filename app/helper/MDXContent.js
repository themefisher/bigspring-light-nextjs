import shortcodes from "@layouts/shortcodes/all";
import "highlight.js/styles/paraiso-light.min.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const MDXContent = ({ content }) => {
  const mdxOptions = {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  };

  return (
    <>
      {/* @ts-ignore */}
      <MDXRemote
        source={content}
        components={shortcodes}
        options={{ mdxOptions }}
      />
    </>
  );
};

export default MDXContent;
