import emailjs from '@emailjs/browser';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { emailConfig } from "@config/emailConfig";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});
const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;


// pages/api/emails.js

export default async function handler(req, res) {
  const { emailServiceId, emailTemplateId, emailPublicKey } = emailConfig;

  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    res.json({ received: true });

    if (event.type === "checkout.session.completed") {
      const customerDetails = event.data.object.customer_details;
      console.log("Checkout session completed!");
      const { email, name, phone } = customerDetails;
      const templateParams = {
        from_name: name ?? 'No name provided',
        from_email: email ?? 'No email provided',
        from_phone: phone ?? 'No phone provided',
        message: `${name ?? 'Someone new'} has joined the waitlist!`,
      };

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

    } else {
      console.warn(`Unhandled event type ${event.type}`);
    }

  } else {
    res.status(405).end("Method Not Allowed");
  }
};
