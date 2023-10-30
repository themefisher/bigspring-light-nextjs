import { markdownify } from "@lib/utils/textConverter";
import { MDXRemote } from "next-mdx-remote";
import shortcodes from "./shortcodes/all";
import { useEffect } from "react";
import Router from "next/router";

const Default = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title } = frontmatter;

  useEffect(() => {
    if (window.location.pathname.includes('thank-you')) {
      const timeout = setTimeout(() => {
        Router.push('/');
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "h2 mb-8 text-center")}
        <div className="content">
          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
      </div>
    </section>
  );
};

export default Default;
