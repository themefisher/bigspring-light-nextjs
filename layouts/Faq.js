import { markdownify } from "@lib/utils/textConverter";
import { FaqAccordion } from "./components/faq-accordion";

function Faq({ data }) {
  const { frontmatter } = data;
  const { title, faqs } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="-mt-10 section row">
          <FaqAccordion faq={faqs} />
        </div>
      </div>
    </section>
  );
}

export default Faq;
