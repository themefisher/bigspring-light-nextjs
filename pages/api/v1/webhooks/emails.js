import Stripe from 'stripe';
import { text } from 'micro';
import { reservationCheckoutCompletedEmailConfig } from "@config/emailConfig";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

export default async function handler(req, res) {
  const { emailServiceId, emailTemplateId, emailPublicKey } = reservationCheckoutCompletedEmailConfig;

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
      console.log("Checkout session completed!");
      const { email, name, phone } = customerDetails;
      const fromName = name ?? 'Someone New';

      const templateParams = {
        from_name: fromName,
        from_email: email ?? 'No email provided',
        from_phone: phone ?? 'No phone provided',
        message: 'New reservation payment!',
      };

      const emailData = {
        service_id: emailServiceId,
        template_id: emailTemplateId,
        user_id: emailPublicKey,
        template_params: templateParams,
        accessToken: process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
      };

      const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
        timeout: 10000,
      });

      console.log('Status: ', emailResponse.status);
      switch (emailResponse.status) {
        case 200:
          console.log('Email successfully sent!');
          return res.status(200).json({ received: true, message: 'Webhook received' });
        case 400:
          console.log('Email failed to send!');
          return res.status(400).json({ received: false, error: 'Invalid event type' });
        case 403:
          console.log('Email failed to send! with 403 error');
          return res.status(403).json({ received: false, error: 'Invalid email service' });
        default:
          console.log('Unknown error!');
          return res.status(500).json({ received: false, error: 'Webhook processing error' });
      };

    } else {
      console.warn(`Unhandled event type ${event.type}`);
    }
  } else {
    res.status(405).end("Method Not Allowed");
  };
};
