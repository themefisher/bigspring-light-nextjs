import { useState, useEffect } from "react";
import ReservationCheckoutFlowStep1 from "@layouts/partials/ReservationCheckoutFlowStep1";
import ReservationCheckoutFlowStep2 from "@layouts/partials/ReservationCheckoutFlowStep2";
import ReservationCheckoutFlowStep3 from "@layouts/partials/ReservationCheckoutFlowStep3";
import sendEmail from "@lib/utils/sendEmail.js";

const Form = ({ closeReservationCheckout }) => {

  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  async function sendEmailOnStep2Completion() {
    const emailTemplateParams = {
      from_name: formData.firstName + ' ' + formData.lastName,
      from_email: formData.email,
      from_phone: formData.phone,
      is_pregnant: formData.isPregnant ? 'Yes' : 'No',
      due_date: formData.dueDate,
      desired_visit_dates: `${formData.desiredVisitDates[0]} to ${formData.desiredVisitDates[1]}`,
      joined_mailing_list: formData.joinMailingList ? 'Yes' : 'No',
      message: `${formData.firstName} ${formData.lastName} has reserved a spot! They are ${formData.isPregnant ? 'currently pregnant' : 'not currently pregnant'}. Their due date is ${formData.dueDate}. They would like to visit from ${formData.desiredVisitDates[0]} to ${formData.desiredVisitDates[1]}. They ${formData.joinMailingList ? 'would' : 'would not'} like to join the mailing list.`,
    };

    const emailTemplate = `
        <!DOCTYPE html>
          <html>
            <head>
            </head>
            <body>
              <p>Name: ${emailTemplateParams.from_name}</p>
              <p>Email: ${emailTemplateParams.from_email}</p>
              <p>Phone: ${emailTemplateParams.from_phone}</p>
              <p>Are they pregnant? ${emailTemplateParams.is_pregnant ? 'Yes' : 'No'}</p>
              <p>Due Date: ${emailTemplateParams.due_date}</p>
              <p>Desired Visit Dates: ${emailTemplateParams.desired_visit_dates}</p>
              <p>Joined Mailing List? ${emailTemplateParams.joined_mailing_list}</p>
              <p>Message: ${emailTemplateParams.message}</p>
            </body>
          </html>
          `;

    const messageConfig = {
      sendingEmailAddress: 'contact@yuzicare.com',
      receivingEmailAddress: emailTemplateParams.from_email,
      subject: `${emailTemplateParams.from_name} completed Step 2 of Reservation Checkout`,
    };

    try {
      const result = await sendEmail(emailTemplateParams, emailTemplate, messageConfig);
      console.log(result);
      setFormData({}); // reset formData
    } catch (error) {
      console.log(error);
    };
  }

  useEffect(() => {

    if (step === 3) {
      sendEmailOnStep2Completion();
    }
  });


  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    console.log(formData);
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const onClose = () => {
    closeReservationCheckout();
  };

  return (
    <section className="p-2">
      {step === 1 && (
        <ReservationCheckoutFlowStep1
          onSubmit={handleNextStep}
          formData={formData}
          onClose={onClose}
        />
      )}
      {step === 2 && (
        <ReservationCheckoutFlowStep2
          onSubmit={handleNextStep}
          onPrev={handlePrevStep}
          onClose={onClose}
          formData={formData}
        />
      )}
      {step === 3 && (
        <ReservationCheckoutFlowStep3
          onSubmit={handleNextStep}
          onPrev={handlePrevStep}
          onClose={onClose}
          formData={formData}
        />
      )}
    </section>
  );
};

export default Form;
