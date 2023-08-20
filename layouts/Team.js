import TeamCard from "./components/TeamCard";
const Team = ({ data }) => {
  const { frontmatter } = data;
  const { title, people } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        <h1 className="mb-8 text-center">{title}</h1>
        <div className="content">
        <div className="grid overflow-hidden border divide-y shadow-sm divide-slate-800 rounded-xl sm:divide-none sm:border-none sm:rounded-none sm:grid-cols-2 sm:divide-y-0 sm:gap-1 sm:divide-x">
        {/* <div className="grid overflow-hidden border divide-y shadow-sm rounded-xl sm:grid-cols-2"> */}
            {people.map((person, i) => (
              <TeamCard key={i} person={person}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;

