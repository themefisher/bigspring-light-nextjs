const nodemailer = require('nodemailer');

export default function handler(req, res) {
  const message = {
    from: req.body.messageConfig.sendingEmailAddress ?? '',
    to: req.body.messageConfig.receivingEmailAddress ?? '',
    cc: req.body.messageConfig.cc ?? '',
    bcc: req.body.messageConfig.bcc ?? '',
    replyTo: req.body.messageConfig.replyTo ?? 'contact@yuzicare.com',
    subject: req.body.messageConfig.subject ?? 'No subject',
    html: req.body.emailTemplate,
  };

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_GMAIL_EMAIL_ADDRESS,
      pass: process.env.NEXT_PUBLIC_GMAIL_SECRET_KEY,
    },
  });

  if (req.method === 'POST') {
    console.log('req.body', req.body);
    transporter.sendMail(message, (err, info) => {
      if (err) {
        res.status(400).json({
          error: `Connection refused at ${err.address}`
        });
      } else {
        res.status(200).json({
          success: `Message delivered to ${info.accepted}`
        });
      }
    });
  }
}
