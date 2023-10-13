import emailjs from '@emailjs/browser';
import { emailConfig } from "@config/emailConfig";

// pages/api/emails.js

export default async function handler(req, res) {
  const { emailServiceId, emailTemplateId, emailPublicKey } = emailConfig;

  try {
    const event = req.body;
    const { data } = event;
    const { name, email, phone } = data.object.customer_details;

    const templateParams = {
      from_name: name ?? 'No name provided',
      from_email: email ?? 'No email provided',
      from_phone: phone ?? 'No phone provided',
      message: `${name ?? 'Someone new'} has joined the waitlist!`,
    };

    // console.log(templateParams);
    const result = await emailjs.send(emailServiceId, emailTemplateId, templateParams, emailPublicKey)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        return response.status;
      })
      .catch(function (error) {
        console.error('FAILED...', error);
        return error;
      });

    switch (result) {
      case 200:
        console.log('Email successfully sent!');
        res.status(200).json({ message: 'Webhook received' });
        break;
      case 400:
        console.log('Email failed to send!');
        res.status(400).json({ error: 'Invalid event type' });
        break;
      default:
        console.log('Unknown error!');
        res.status(500).json({ error: 'Webhook processing error' });
        break;
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
