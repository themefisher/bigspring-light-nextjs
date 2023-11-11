import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import { useRef, useState } from "react";
import Toast from "./components/Toast";
import sendEmail from "@lib/utils/sendEmail";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;
  const form = useRef();
  const [showToast, setShowToast] = useState(false);
  const [fromName, setFromName] = useState('');
  const [isPregnant, setIsPregnant] = useState(false);

  const sendEmails = async (e) => {
    e.preventDefault();

    const enteredFromName = form.current.elements.from_name.value;
    const honeyPotEntry = form.current.elements.url.value;
    const emailTemplateParams = {
      from_name: form.current.elements.from_name.value,
      from_email: form.current.elements.from_email.value,
      is_pregnant: form.current.elements.is_pregnant.value ? 'Yes' : 'No',
      due_date: form.current.elements.due_date ? form.current.elements.due_date.value : '',
      message: form.current.elements.message.value,
      attribution_source: form.current.elements.attribution_source.value,
      subject: form.current.elements.subject.value,
    };

    const toClientMessageConfig = {
      sendingEmailAddress: "contact@yuzicare.com",
      receivingEmailAddress: emailTemplateParams.from_email,
      subject: "Thank You from Yuzi",
      bcc: ["harper@yuzicare.com", "steph@yuzicare.com", "michelle@yuzicare.com"],
    };

    const toYuziMessageConfig = {
      sendingEmailAddress: "contact@yuzicare.com",
      receivingEmailAddress: ["steph@yuzicare.com", "harper@yuzicare.com", "michelle@yuzicare.com"],
      replyTo: emailTemplateParams.from_email,
      subject: emailTemplateParams.subject,
    };

    const toYuziEmailTemplate = `
    <p><strong>From:</strong> ${emailTemplateParams.from_name}:</p>
<p><strong>Subject:</strong> ${emailTemplateParams.subject}</p>
<p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">${emailTemplateParams.message}</p>
<p><strong>Is Pregnant:</strong> ${emailTemplateParams.is_pregnant}</p>
<p><strong>Due Date:</strong> ${emailTemplateParams.due_date}</p>
<p><strong>Attribution Source:</strong> ${emailTemplateParams.attribution_source}</p>
<p>&nbsp;</p>
<p>Best wishes,</p>
<p>&nbsp;</p>
<p>Yuzi Care Customer Support</p>
`;

    const toClientEmailTemplate = `
    <div class="wrapper" style="background-color: #edf6f5;">
<div class="header" style="text-align: center; margin: 10px; padding:10px"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/images/logos/yuzi_lower_logo_600x200.png" alt="Yuzi Care" width="300" height="100"></div>
<div class="content" style="margin: 0 auto; max-width: 600px; max-height: 200px; padding: 20px; background-color: #ffffff; border-radius: 25px;">
<p>Dear ${emailTemplateParams.from_name},</p>
<p>Thank you for contacting Yuzi Care.</p>
<p>We received your message and a staff member will be contacting you shortly.</p>
<p>If you need anything else in the meantime, please feel free to contact us again at <a href="mailto:contact@yuzicare.com">contact@yuzicare.com</a> or call us directly at <a href="tel:2062226295">(206) 222-6295</a>.</p>
<p>We look forward to speaking with you soon.</p>

<p>With our heartfelt gratitude,</p>
<p class="signature" style="font-style: italic; text-align: left; font-size: 20px;margin-bottom:0px">The Yuzi Team</p>
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial; width: 103.333%; height: 126.215px;" cellspacing="0" cellpadding="0">
<tbody>
<tr style="height: 99.0278px;">
<td style="width: 100%; height: 99.0278px;">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial; width: 100.707%; height: 65px;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="vertical-align: middle; width: 13.2454%;"><a href="https://yuzicare.com" target="_blank" rel="noopener"><img style="width: 150px; height: 50px;" src="${process.env.NEXT_PUBLIC_BASE_URL}/images/logos/yuzi_lower_logo_600x200.png" alt="Yuzi Care Logo"> </a>
<div style="width: 20px;">&nbsp;</div>
</td>
<td style="width: 0.86571%; border-bottom: none; border-left: 1px solid rgb(138, 136, 134);" width="1" height="auto">&nbsp;</td>
<td style="vertical-align: middle; width: 85.8784%;">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial; width: 99.5497%; height: 80px;" cellspacing="0" cellpadding="0">
<tbody>
<tr style="vertical-align: middle; height: 20px;">
<td style="vertical-align: middle; width: 3.52442%; height: 20px;" width="20">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="vertical-align: bottom;"><span style="display: inline-block; background-color: #0aa8a7;"><img style="display: block; background-color: #0aa8a7;" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/phone-icon-2x.png" alt="mobilePhone" width="13"></span></td>
</tr>
</tbody>
</table>
</td>
<td style="padding: 0px; color: rgb(0, 0, 0); width: 96.4809%; height: 20px;">&nbsp;<a style="text-decoration: none; color: rgb(0,0,0); font-size: 12px;" href="tel:2062226295" target="_blank" rel="noopener">(206) 222-6295</a></td>
</tr>
<tr style="vertical-align: middle; height: 20px;">
<td style="vertical-align: middle; width: 3.52442%; height: 20px;" width="30">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="vertical-align: bottom;"><span style="display: inline-block; background-color: rgb(138,136,134);"><img style="display: block; background-color: #0aa8a7;" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png" alt="emailAddress" width="13"></span></td>
</tr>
</tbody>
</table>
</td>
<td style="padding: 0px; width: 96.4809%; height: 20px;">&nbsp;<a style="text-decoration: none; color: rgb(0,0,0); font-size: 12px;" href="mailto:contact@yuzicare.com" target="_blank" rel="noopener">contact@yuzicare.com</a></td>
</tr>
<tr style="vertical-align: middle; height: 20px;">
<td style="vertical-align: middle; width: 3.52442%; height: 20px;" width="30">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="vertical-align: bottom;"><span style="display: inline-block; background-color: rgb(138,136,134);"><img style="display: block; background-color: #0aa8a7;" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png" alt="website" width="13"></span></td>
</tr>
</tbody>
</table>
</td>
<td style="padding: 0px; width: 96.4809%; height: 20px;">&nbsp;<a style="text-decoration: none; color: rgb(0,0,0); font-size: 12px;" href="//www.yuzicare.com" target="_blank" rel="noopener">www.yuzicare.com</a></td>
</tr>
<tr style="vertical-align: middle; height: 20px;">
<td style="vertical-align: middle; width: 3.52442%; height: 20px;" width="30">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="vertical-align: bottom;"><span style="display: inline-block; background-color: rgb(138,136,134);"><img style="display: block; background-color: #0aa8a7;" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/address-icon-2x.png" alt="address" width="13"></span></td>
</tr>
</tbody>
</table>
</td>
<td style="padding: 0px; width: 96.4809%; height: 20px;"><span style="font-size: 12px; color: rgb(0,0,0);">&nbsp; Seattle, WA</span></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial; width: 50.3333%; height: 23.9931px;" cellspacing="0" cellpadding="0">
<tbody>
<tr style="height: 23.9931px;">
<td style="width: 100%; height: 23.9931px;">
<div style="display: flex; vertical-align: middle; justify-content: space-between; align-items: center; padding-left: 50%;"><a href="https://www.linkedin.com/company/yuzi-care" target="_blank" rel="noopener"><img style="vertical-align: middle; height: 24px;" src="https://yuzi-assets.s3.us-west-2.amazonaws.com/linkedin.png" alt="Yuzi LinkedIn"> </a> <a href="https://twitter.com/Yuzicare" target="_blank" rel="noopener"> <img style="height: 24px; vertical-align: middle;" src="https://yuzi-assets.s3.us-west-2.amazonaws.com/twitter.png" alt="Yuzi Twitter"> </a> <a href="https://www.instagram.com/yuzicare" target="_blank" rel="noopener"> <img style="vertical-align: middle; height: 24px;" src="https://yuzi-assets.s3.us-west-2.amazonaws.com/instagram.png" alt="Yuzi Instagram"> </a></div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
`;



    if (honeyPotEntry) {
      setFromName('for your submission');
      setShowToast(true);
    } else {
      setFromName(enteredFromName);
      try {
        const resultSendYuzi = await sendEmail(emailTemplateParams, toYuziEmailTemplate, toYuziMessageConfig);
        console.log(resultSendYuzi);
        const resultSendClient = await sendEmail(emailTemplateParams, toClientEmailTemplate, toClientMessageConfig);
        console.log(resultSendClient);
        form.current.reset();
      } catch (error) {
        console.log(error);
      };
    }

    setTimeout(() => {
      setShowToast(false);
      setFromName('');
    }, 3000);
  };

  return (
    <section className="section">
      {showToast && <Toast fromName={fromName} />}
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
              onSubmit={sendEmails}
            >
              <div className="mb-3">
                <div className="absolute ml-[-9999px]">
                  <label htmlFor="website-url">Your Website Url</label>
                  <input type="text" id="website-url" name="url" tabIndex={-1} autoComplete="false" />
                </div>
                <label htmlFor="from_name" className="font-bold text-black">Name</label>
                <input
                  className="w-full rounded form-input"
                  name="from_name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="from_email" className="font-bold text-black">Email</label>
                <input
                  className="w-full rounded form-input"
                  name="from_email"
                  type="email"
                  placeholder="healing@yuzi.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="is_pregnant" className="font-bold text-black">Are you pregnant?</label>
                <input
                  className="mx-2"
                  name="is_pregnant"
                  type="checkbox"
                  onClick={() => setIsPregnant(!isPregnant)}
                />
              </div>
              {isPregnant &&
                <div className="mb-3">
                  <label htmlFor="due_date" className="font-bold text-black">Due Date</label>
                  <input
                    className="w-full rounded form-input"
                    name="due_date"
                    type="date"
                    placeholder="Due Date"
                    required
                  />
                </div>
              }
              <div className="mb-3">
                <label htmlFor="attribution-source" className="font-bold text-black">How Did You Hear About Us?</label>
                <select
                  className="w-full rounded form-input"
                  name="attribution_source"
                  id="attribution-source"
                >
                  <option value="" disabled selected>==SELECT AN OPTION==</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Email">Email</option>
                  <option value="Referral">Referral</option>
                  <option value="Other">Other</option>
                </select>
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
              <button
                type="submit"
                className="btn btn-primary"
                id="submit-contact-form-button"
              >
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
