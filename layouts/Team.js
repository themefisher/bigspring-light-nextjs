import { markdownify } from "@lib/utils/textConverter";
import { MDXRemote } from "next-mdx-remote";
import shortcodes from "./shortcodes/all";
import TeamCard from "./components/TeamCard";
const Team = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title, people } = frontmatter;
  return (
    <section className="section">
      <p>Hello</p>
      <div className="container">
        {markdownify(title, "h1", "mb-8 text-center")}
        {people.map((person, i) => (
          <TeamCard key={i} person={person} />
        ))}
      </div>
    </section>
  );
};

export default Team;
    // <section className="section">
    //   <h1>hi</h1>
    //   <div className="container">
    //     {markdownify(title, "h1", "mb-8 text-center")}
    //     <h1 className="mb-8 text-center">My Title</h1>
    //     <div className="content">
    //       <div className="grid border rounded-xl shadow-sm divide-y overflow-hidden sm:flex sm:divide-y-0 sm:divide-x dark:border-gray-700 dark:shadow-slate-700/[.7] dark:divide-gray-600">
    //         {people.map((person, i) => (
    //           <div key={i} className="flex flex-col flex-[1_0_0%] bg-white dark:bg-gray-800">
    //             <Image className="w-full h-auto" width={500} height={500} src={person.image} alt={person.name} />
    //             <div className="flex-1 p-4 md:p-5">
    //               <h4 className="text-gray-800 text-md dark:text-white">
    //                 {markdownify(person.title, 'h4', "text-gray-800 text-md")}
    //               </h4>
    //               <h3 className="text-lg font-bold text-gray-800">
    //                 {person.name}
    //               </h3>
    //               <p className="mt-1 text-gray-800 dark:text-gray-400">
    //                 {person.bio}
    //               </p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>
