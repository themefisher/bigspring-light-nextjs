import { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    phone: z
      .string()
      .min(10, { message: "Must be a valid phone number" }),
    city: z
      .string()
      .min(1, { message: "Please enter your current city" }),
    state: z
      .string()
      .min(1, { message: "Please enter your current state" }),
    joinMailingList: z
      .boolean()
      .default(true)
      .optional()
  });

function ReservationCheckoutFlowStep1({ onSubmit, onClose, formData }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (formData) {
      setValue("firstName", formData.firstName);
      setValue("lastName", formData.lastName);
      setValue("email", formData.email);
      setValue("phone", formData.phone);
      setValue("city", formData.city);
      setValue("state", formData.state);
      setValue("joinMailingList", formData.joinMailingList);
    }
  });

  const handleFormSubmit = (data) => {
    onSubmit(data); // Pass the form data to the parent component
  };

  return (
    <form className="px-8 pt-6 pb-8 mb-4 border border-black shadow-lg max-w-[600px] flex flex-col bg-white mx-auto" onSubmit={handleSubmit(handleFormSubmit)}>
      <button
        onClick={onClose}
        className="flex justify-end text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        X
      </button>
      <h2 className="mx-auto mb-2">Tell us a little more about yourself</h2>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${errors.firstName && "border-red-500"
              } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="firstName"
            type="text"
            placeholder="First Name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.firstName?.message}
            </p>
          )}
        </div>
        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${errors.lastName && "border-red-500"
              } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="lastName"
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.lastName?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${errors.email && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-2 text-xs italic text-red-500">
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="phone"
            placeholder="425 555 5555"
          >
            Phone Number
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${errors.phone && "border-red-500"
              } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="phone"
            type="tel"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.phone?.message}
            </p>
          )}
        </div>
        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="city"
          >
            City
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${errors.city && "border-red-500"
              } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="city"
            type="text"
            {...register("city")}
          />
          {errors.city && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.city?.message}
            </p>
          )}
        </div>
        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="state"
          >
            State
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${errors.state && "border-red-500"
              } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="state"
            type="text"
            {...register("state")}
          />
          {errors.state && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.state?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <input type="checkbox" id="joinMailingList" checked {...register("joinMailingList")} />
        <label
          htmlFor="joinMailingList"
          className={`ml-2 mb-2 text-sm font-bold ${errors.joinMailingList ? "text-red-500" : "text-gray-700"
            }`}
        >
          Please send me updates and information about the program.
        </label>
      </div>
      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Next
        </button>
      </div>
      <hr className="mb-6 border-t" />
    </form>

  )
}

export default ReservationCheckoutFlowStep1
