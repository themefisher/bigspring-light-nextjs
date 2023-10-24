import emailjs from '@emailjs/browser';
import Stripe from 'stripe';
// import { text } from 'micro';
import { emailConfig } from "@config/emailConfig";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;


// pages/api/emails.js

export default async function handler(req, res) {
  const { emailServiceId, emailTemplateId, emailPublicKey } = emailConfig;

  if (req.method === "POST") {

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        await (await req.text()),
        req.headers["stripe-signature"],
        webhookSecret
      );
    } catch (err) {
      console.log(err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const customerDetails = event.data.object.customer_details;
      const customNameField = event.data.object.custom_fields[0].text.value;
      console.log("Checkout session completed!");
      const { email, name, phone } = customerDetails;
      const fromName = name ?? customNameField ?? 'Someone New';
      const templateParams = {
        from_name: fromName,
        from_email: email ?? 'No email provided',
        from_phone: phone ?? 'No phone provided',
        message: `${fromName} has joined the waitlist!`,
      };

      const emailStatus = await emailjs.send(emailServiceId, emailTemplateId, templateParams, emailPublicKey)
        .then(function (response) {
          console.log('SUCCESS!', response.status, response.text);
          return response.status;
        })
        .catch(function (error) {
          console.error('FAILED...', error);
          return error;
        });

      switch (emailStatus) {
        case 200:
          console.log('Email successfully sent!');
          res.status(200).json({ received: true, message: 'Webhook received' });
          break;
        case 400:
          console.log('Email failed to send!');
          res.status(400).json({ received: false, error: 'Invalid event type' });
          break;
        default:
          console.log('Unknown error!');
          res.status(500).json({ received: false, error: 'Webhook processing error' });
          break;
      }

    } else {
      console.warn(`Unhandled event type ${event.type}`);
    }

  } else {
    res.status(405).end("Method Not Allowed");
  }
};
