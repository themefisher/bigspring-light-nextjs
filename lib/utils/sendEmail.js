export default async function sendEmail(emailTemplateParams, emailTemplate, messageConfig) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/actions/send-emails`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailTemplateParams,
        emailTemplate,
        messageConfig,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      // Handle error here
      const errorData = await response.json();
      throw new Error(`Email sending failed: ${errorData.error}`);
    }
  } catch (error) {
    throw error;
  }
}

