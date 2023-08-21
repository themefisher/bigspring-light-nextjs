import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import { useRef } from "react";
import emailjs from '@emailjs/browser'
import { emailConfig } from "@config/emailConfig";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;
  const form = useRef();
  const { emailServiceId, emailTemplateId,  emailPublicKey } = emailConfig;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(emailServiceId, emailTemplateId, form.current, emailPublicKey)
      .then((result) => {
          console.log(result.text);
          form.current.reset();
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="pb-0 section row">
          <div className="col-12 md:col-6 lg:col-7">
            <form
              className="contact-form"
              method="POST"
              action={contact_form_action}
              name="Yuzi Contact"
              ref={form}
              onSubmit={sendEmail}
            >
              <div className="mb-3">
                <input
                  className="w-full rounded form-input"
                  name="from_name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="w-full rounded form-input"
                  name="from_email"
                  type="email"
                  placeholder="healing@yuzi.com"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="w-full rounded form-input"
                  name="from_phone"
                  type="tel"
                  placeholder="(360) 538-7802"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                />
              </div>
              <div className="mb-3">
                <input
                  className="w-full rounded form-input"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="w-full rounded-md form-textarea"
                  rows="7"
                  name="message"
                  placeholder="Your message..."
                  required
                  spellCheck
                  autoComplete="on"
                  autoCorrect="on"
                  maxLength={1024}
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
            <ul className="mt-5 contact-list">
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
