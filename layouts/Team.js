import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import Image from "next/image";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row pb-0">
          <div className="featured developers">
            <h3>Developers</h3>
            <div className="bios">
              <div className="individual">
                <Link href="https://www.linkedin.com/in/shay-sheller/"><h5>Shay Sheller</h5></Link>
                <Image alt="Shay" src='/images/linkedinshay.jpeg' width="200" height="200"/>
              </div>
              <div className="individual">
              <Link href="https://www.linkedin.com/in/jeffreycplee/"><h5>Jeffrey Lee</h5></Link>
                <Image alt="Jeffrey" src='/images/linkedinjeff.jpeg' width="200" height="200"/>
              </div>
              <div className="individual">
              <Link href="https://www.linkedin.com/in/kelvinvan/"><h5>Kelvin Van</h5></Link>
                <Image alt="Kelvin" src='/images/linkedinkelvin.jpeg' width="200" height="200"/>
              </div>
              <div className="individual">
              <Link href="https://www.linkedin.com/in/kevinjtseng/"><h5>Kevin Tseng</h5></Link>
                <Image alt="Kevin" src='/images/linkedinkevin.jpeg' width="200" height="200"/>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-7">
            <form
              className="contact-form"
              method="POST"
              action={contact_form_action}
            >
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-textarea w-full rounded-md"
                  rows="7"
                  placeholder="Your message"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Send Now
              </button>
            </form>
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
// export default Team