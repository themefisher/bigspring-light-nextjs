import emailjs from '@emailjs/browser';
import Stripe from 'stripe';
import { text } from 'micro';
import { emailConfig } from "@config/emailConfig";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});



// pages/api/emails.js

export default async function handler(req, res) {
  const { emailServiceId, emailTemplateId, emailPublicKey } = emailConfig;

  if (req.method === "POST") {
    const body = await text(req);
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        webhookSecret,
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
          return res.status(200).json({ received: true, message: 'Webhook received' });
        case 400:
          console.log('Email failed to send!');
          return res.status(400).json({ received: false, error: 'Invalid event type' });
        default:
          console.log('Unknown error!');
          return res.status(500).json({ received: false, error: 'Webhook processing error' });
      }

    } else {
      console.warn(`Unhandled event type ${event.type}`);
    }

  } else {
    res.status(405).end("Method Not Allowed");
  }
};
