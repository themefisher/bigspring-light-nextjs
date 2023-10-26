import { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from 'react-multi-date-picker';
import { set } from 'date-fns';

const today = new Date();
const minDate = new Date("2024-05-01");
const maxDate = new Date(today);
maxDate.setFullYear(today.getFullYear() + 2);

const validationSchema = z
  .object({
    isPregnant: z
      .boolean({ message: "We need to know if you are pregnant." }),
    dueDate: z
      .date({
        required_error: "Please enter your due date.",
        invalid_type_error: "Please select a valid date.",
      }),
    desiredVisitDates: z
      .array(
        z
          .date()
          .min(minDate, { message: "Please select a date after May 2024." })
          .max(maxDate, { message: "Please select a date before 2 years from now." })
      ),
    city: z
      .string()
      .min(1, { message: "Please enter your current city" }),
    state: z
      .string()
      .min(1, { message: "Please enter your current state" }),
  });

function ReservationCheckoutFlowStep2({ onSubmit, onClose, onPrev }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const [selectedDates, setSelectedDates] = useState([]);

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
            htmlFor="isPregnant"
          >
            Are you currently pregnant?
          </label>
          <select
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${errors.isPregnant && "border-red-500"
              } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="isPregnant"
            type="text"
            {...register("isPregnant")}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.isPregnant && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.isPregnant?.message}
            </p>
          )}
        </div>
        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="dueDate"
          >
            When is your due date?
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${errors.dueDate && "border-red-500"
              } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="dueDate"
            type="date"
            {...register("dueDate")}
          />
          {errors.dueDate && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.dueDate?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="desiredVisitDates"
        >
          Please select your desired dates of visit.
        </label>
        <p className="text-xs">Please note, at this time we are only able to take reservations for May 2024 or later.</p>
        <Controller
          control={control}
          name="desiredVisitDates"
          render={({
            field: { onChange, name, value },
            formState: { errors }, //optional, but necessary if you want to show an error message
          }) => (
            <>
              <DatePicker
                minDate={minDate}
                maxDate={maxDate}
                range
                value={value || ""}
                onChange={setSelectedDates}
                format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
              />
              {errors.desiredVisitDates && (
                <p className="mt-2 text-xs italic text-red-500">
                  {errors.desiredVisitDates?.message}
                </p>
              )}
            </>
          )}
        />
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

export default ReservationCheckoutFlowStep2;
