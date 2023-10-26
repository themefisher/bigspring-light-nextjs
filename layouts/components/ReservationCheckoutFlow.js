import { useState, useEffect } from "react";
import ReservationCheckoutFlowStep1 from "@layouts/partials/ReservationCheckoutFlowStep1";
import ReservationCheckoutFlowStep2 from "@layouts/partials/ReservationCheckoutFlowStep2";
import ReservationCheckoutFlowStep3 from "@layouts/partials/ReservationCheckoutFlowStep3";
import emailjs from '@emailjs/browser';
import { emailConfig } from '@config/emailConfig';

const Form = ({ closeReservationCheckout }) => {

  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { emailServiceId, emailTemplateId, emailPublicKey } = emailConfig;

  useEffect(() => {

    if (step === 3) {
      const templateParams = {
        from_name: formData.firstName + ' ' + formData.lastName,
        from_email: formData.email,
        from_phone: formData.phone,
        message: `${formData.firstName} ${formData.lastName} has joined the waitlist! They are ${formData.isPregnant ? 'currently pregnant' : 'not currently pregnant'}. Their due date is ${formData.dueDate}. They would like to visit from ${formData.desiredVisitDates[0]} to ${formData.desiredVisitDates[1]}. They ${formData.joinMailingList ? 'would' : 'would not'} like to join the mailing list.`,
      };

      emailjs.send(emailServiceId, emailTemplateId, templateParams, emailPublicKey)
        .then((result) => {
          console.log(result.text);
        })
        .catch((error) => {
          console.log(error.text);
        });
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
