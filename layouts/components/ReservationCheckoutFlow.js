import { useState, useEffect } from "react";
import ReservationCheckoutFlowStep1 from "@layouts/partials/ReservationCheckoutFlowStep1";
import ReservationCheckoutFlowStep2 from "@layouts/partials/ReservationCheckoutFlowStep2";

const Form = ({ closeReservationCheckout }) => {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log(formData); // This will log the updated formData
  }, [formData]);

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
    <section className="shadow">
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
    </section>
  );
};

export default Form;
