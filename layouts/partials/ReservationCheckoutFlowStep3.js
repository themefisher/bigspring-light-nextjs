import React from 'react';
import CheckoutButton from '@layouts/components/CheckoutButton';
import Image from 'next/image';

function ReservationCheckoutFlowStep3({ onClose, formData }) {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-4 overflow-y-auto">
      <div className='flex flex-col md:flex-row'>
        <div className='flex-grow bg-[#1C3F60] rounded-md py-10 px-10'>
          <Image
            src="/images/yuzi_checkout_logo.png"
            alt="Logo"
            width={300}
            height={300}
            className='hidden object-contain mt-5 md:block'
          />
          <div className='mt-14 md:mt-5'>
            <h3 className="text-center text-white">Step 3</h3>
            <hr className='w-[80%] mx-auto'></hr>
            <h4 className="text-center text-white">Reservation Payment</h4>
          </div>
        </div>
        <div className="relative w-full max-w-screen-sm p-4 mx-auto bg-white rounded-lg shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            X
          </button>
          <div className='mt-2 md:mt-5'>
            <h2 className="mb-4 text-2xl font-bold text-center">We require a $100 deposit to hold your reservation.</h2>
            <h3 className="mx-auto mb-4 text-base text-center sm:text-2xl">Your deposit is <u className='italic underline decoration-primary'>fully refundable</u> at any time.</h3>
            <div className='text-center'>
              <CheckoutButton formData={formData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationCheckoutFlowStep3;
