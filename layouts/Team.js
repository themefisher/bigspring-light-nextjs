import { markdownify } from "@lib/utils/textConverter";
import { MDXRemote } from "next-mdx-remote";
import shortcodes from "./shortcodes/all";
import TeamCard from "./components/TeamCard";

const Team = ({ data }) => {
  const { frontmatter } = data;
  const { title, people } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "h2 mb-8 text-center")}
        <div className="grid border rounded-xl shadow-sm divide-y overflow-hidden sm:flex sm:divide-y-0 sm:divide-x dark:border-gray-700 dark:shadow-slate-700/[.7] dark:divide-gray-600">
          {people.map((person, i) => (
            <TeamCard person={person} key={i} />
          ))}
          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
      </div>
    </section>
  );
};

export default Team;
