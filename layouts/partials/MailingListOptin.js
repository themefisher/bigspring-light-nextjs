'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from 'next/image';
import { z } from "zod";
import { mailingListEmailConfig } from '@config/emailConfig';
import emailjs from '@emailjs/browser';

const validationSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
  });

const { emailServiceId, emailTemplateId, emailPublicKey } = mailingListEmailConfig;

function MailingListOptin({ onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const handleMailingListSubmit = async (formData) => {
    try {
      const templateParams = {
        from_name: formData.firstName + ' ' + formData.lastName,
        from_email: formData.email,
        message: `${formData.firstName} ${formData.lastName} has joined the mailinglist!`,
      };

      await emailjs.send(emailServiceId, emailTemplateId, templateParams, emailPublicKey);

      console.log("Email sent successfully.");
      onClose(); // Close the modal after successful form submission
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle any form submission errors here
    }
  };
  return (
    <section className="fixed inset-0 z-50 items-center justify-center p-4 mt-4 overflow-y-auto md:flex">
      <div className='flex flex-col md:flex-row'>
        <div className='flex-grow rounded-md bg-secondary'>
          <Image
            src="/images/yuzi_ring_logo.svg"
            alt="Logo"
            width={500}
            height={500}
            className='hidden object-contain mt-5 md:block'
          />
          <div className='py-5 my-auto'>
            <h3 className="text-center text-dark">Join the Mailing List</h3>
          </div>
        </div>
        <div className="relative w-full max-w-screen-sm p-4 mx-auto bg-white rounded-lg shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            X
          </button>
          <h2 className="mb-4 text-2xl font-bold text-center">Access to Exclusive Offers and Community Insights</h2>
          <form className="space-y-4" onSubmit={handleSubmit((formData) => {
            handleMailingListSubmit(formData)
              .then(() => {
                onClose();
              })
              .catch((err) => {
                console.error('Error submitting form: ', err);
              });
          })}>
            <div>
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="firstName"
                type="text"
                placeholder="First Name"
                autoComplete="given-name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="lastName"
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <p
                className={`ml-2 text-sm text-center text-gray-700`}
              >
                By signing up you agree to receive emails from Yuzi.
              </p>
            </div>

            <div className="w-full text-center">
              <button
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
                id="join-mailing-list-button"
              >
                Send Me Updates!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default MailingListOptin;
