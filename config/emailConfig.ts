export const emailConfig: Record<string, string> = {
  emailServiceId: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
  emailTemplateId: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
  emailPublicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
  emailPrivateKey: process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
}
