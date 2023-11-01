export const reservationEmailConfig: Record<string, string> = {
  emailServiceId: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
  emailTemplateId: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_YUZI_RESERVATION_CHECKOUT_ID,
  emailPublicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
  emailPrivateKey: process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
}

export const mailingListEmailConfig: Record<string, string> = {
  emailServiceId: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
  emailTemplateId: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_YUZI_MAILINGLIST_JOIN_ID,
  emailPublicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
  emailPrivateKey: process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
}

export const contactFromEmailConfig: Record<string, string> = {
  emailServiceId: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
  emailTemplateId: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_YUZI_CONTACT_FROM_ID,
  emailPublicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
  emailPrivateKey: process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
};
