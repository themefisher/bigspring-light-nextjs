import Stripe from 'stripe';
import { text } from 'micro';
import { reservationCheckoutCompletedEmailConfig } from "@config/emailConfig";
import sendEmail from '@lib/utils/sendEmail';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

export default async function handler(req, res) {

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

      const emailTemplateParams = {
        from_name: name ?? 'No name provided',
        from_email: email ?? 'No email provided',
        from_phone: phone ?? 'No phone provided',
        message: `A new reservation has been made by ${name}.\n Email: ${email}\n Phone: ${phone}`,
        to_yuzi_subject: 'New Reservation',
        to_client_subject: 'Reservation Confirmation: Thank you for your reservation!',
      };

      const toYuziEmailTemplate = `
      <p><strong>Name:</strong> ${emailTemplateParams.from_name}</p>
<p><strong>Email:</strong> ${emailTemplateParams.from_email}</p>
<p><strong>Phone Number:</strong> ${emailTemplateParams.from_phone}</p>
<blockquote>
<p>${emailTemplateParams.message}</p>
</blockquote>
<p>&nbsp;</p>
<p>Best,</p>
<p>&nbsp;</p>
<p>Yuzi Care Customer Support (Reservations)</p>
`;

      const toYuziMessageConfig = {
        sendingEmailAddress: "contact@yuzicare.com",
        receivingEmailAddress: ["steph@yuzicare.com", "harper@yuzicare.com", "michelle@yuzicare.com"],
        replyTo: emailTemplateParams.from_email,
        subject: emailTemplateParams.to_yuzi_subject,
      };

      const toClientEmailTemplate = `
      <div class="wrapper" style="background-color: #edf6f5;">
<div class="header" style="text-align: center; margin: 10px; padding:10px;"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/images/logos/yuzi_lower_logo_600x200.svg" alt="Yuzi Care" width="246" height="82"></div>
<div class="content" style="margin: 0 auto; max-width: 600px; padding: 20px; background-color: #ffffff; border-radius: 25px;">
<p>Dear ${emailTemplateParams.from_name},</p>
<p>Congratulations! You’ve taken the first step towards preparing for your postpartum wellness. Whether this is your first or fifth child, motherhood is an extraordinary journey filled with joys and challenges.</p>
<p>We are honored to have the opportunity to care for you and your baby during this important time. A member of our care team will reach out shortly to discuss your postpartum goals and begin planning for your visit.</p>

<p>With our heartflet gratitude,</p>
<p class="signature" style="font-style: italic; text-align: left; font-size: 20px;margin-bottom:0px">The Yuzi Team</p>
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial; width: 103.333%; height: 126.215px;" cellspacing="0" cellpadding="0">
<tbody>
<tr style="height: 99.0278px;">
<td style="width: 100%; height: 99.0278px;">
<table style="vertical-align: -webkit-baseline-middle; font-size: medium; font-family: Arial; width: 100.707%; height: 65px;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="vertical-align: middle; width: 13.2454%;"><a href="https://yuzicare.com" target="_blank" rel="noopener"><img style="width: 150px; height: 50px;" src="${process.env.NEXT_PUBLIC_BASE_URL}/images/logos/email_signature_logo.svg" alt="Yuzi Care Logo"> </a>
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

      const toClientMessageConfig = {
        sendingEmailAddress: "contact@yuzicare.com",
        receivingEmailAddress: emailTemplateParams.from_email,
        subject: emailTemplateParams.to_client_subject,
      };

      const toYuziEmailResposne = await sendEmail(emailTemplateParams, toYuziEmailTemplate, toYuziMessageConfig);

      const toClientEmailResponse = await sendEmail(emailTemplateParams, toClientEmailTemplate, toClientMessageConfig);

      console.log('Status: ', toClientEmailResponse.status);
      switch (toClientEmailResponse.status) {
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
