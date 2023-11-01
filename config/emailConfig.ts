// Capture user information from Reservation Checkout Step 2; internal email only
export const reservationCheckoutStepTwoEmailConfig: Record<string, string> = {
  emailServiceId: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
  emailTemplateId: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_YUZI_RESERVATION_CHECKOUT_STEP_TWO_ID,
  emailPublicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
  emailPrivateKey: process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
}

// Send email to user after Reservation Completed
export const reservationCheckoutCompletedEmailConfig: Record<string, string> = {
  emailServiceId: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
  emailTemplateId: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_YUZI_RESERVATION_CHECKOUT_COMPLETED_ID,
  emailPublicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
  emailPrivateKey: process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
};

// Send user email after joining mailing list
export const mailingListEmailConfig: Record<string, string> = {
  emailServiceId: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
  emailTemplateId: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_YUZI_MAILINGLIST_JOIN_ID,
  emailPublicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
  emailPrivateKey: process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
}

// Send user email after submitting contact form
export const contactFromEmailConfig: Record<string, string> = {
  emailServiceId: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
  emailTemplateId: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_YUZI_CONTACT_FORM_ID,
  emailPublicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
  emailPrivateKey: process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
};

