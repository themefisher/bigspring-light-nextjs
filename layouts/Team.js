import TeamCard from "./components/TeamCard";
const Team = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title, people } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        <h1 className="mb-8 text-center">{title}</h1>
        <div className="content">
        <div class="grid border rounded-xl shadow-sm divide-y overflow-hidden sm:flex sm:divide-y-0 sm:divide-x">
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

