import React from 'react';
import CheckoutButton from '@layouts/components/CheckoutButton';

function ReservationCheckoutFlowStep3({ onClose, formData }) {
  return (
    <section className="px-8 pt-6 pb-8 mb-4 border border-black shadow-lg max-w-[600px] flex flex-col bg-white mx-auto">
      <button
        onClick={onClose}
        className="flex justify-end text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        X
      </button>
      <h2 className="mx-auto mb-4 text-2xl text-center sm:text-3xl">We require a $100 deposit to hold your reservation.</h2>
      <h3 className="mx-auto mb-4 text-base text-center sm:text-2xl">Your deposit is <u className='italic underline decoration-primary'>fully refundable</u> at any time.</h3>
      <CheckoutButton formData={formData} />
    </section>
  );
}

export default ReservationCheckoutFlowStep3;
