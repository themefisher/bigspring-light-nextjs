import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from 'react-multi-date-picker';
import "react-multi-date-picker/styles/colors/teal.css"
import transition from "react-element-popper/animations/transition"


const today = new Date();
const minDate = new Date("2024-05-02");
const maxDate = new Date(today);
maxDate.setFullYear(today.getFullYear() + 2);

const validationSchema = z
  .object({
    isPregnant: z
      .coerce
      .boolean({ message: "We need to know if you are pregnant." }),
    dueDate: z
      .coerce
      .date({
        required_error: "Please enter your due date.",
        invalid_type_error: "Please select a valid date.",
      })
      .optional(),
    desiredVisitDates: z
      .array(
        z
          .coerce
          .date()
          .min(minDate, { message: "Please select a date after May 2024." })
          .max(maxDate, { message: "Please select a date before 2 years from now." })
      )
      .optional(),
  });

function ReservationCheckoutFlowStep2({ onSubmit, onClose, onPrev, formData }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
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

      <div className="mb-4">
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
          <option value="">Select an option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {errors.isPregnant && (
          <p className="mt-2 text-xs italic text-red-500">
            {errors.isPregnant?.message}
          </p>
        )}
      </div>

      <div className="mb-4">
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <DatePicker
                minDate={minDate}
                maxDate={maxDate}
                range
                value={minDate}
                date={value}
                onChange={(dates) => onChange(dates)}
                format="MM/DD/YYYY"
                style={{
                  width: "100%",
                  borderRadius: "0.5rem",
                }}
                inputClass={{
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.25',
                  color: '#4A5568',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.5rem',
                  appearance: 'none',
                  outline: 'none',
                  boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                }}
                containerStyle={{
                  width: "100%",
                }}
                calendarPosition="bottom-start"
                animations={[
                  transition({ duration: 800, from: 35 })
                ]}
              />
              {error && (
                <p className="mt-2 text-xs italic text-red-500">
                  {error.message}
                </p>
              )}
            </>
          )}
        />
        <p className='mt-2 text-center'>Don’t worry, we know babies show up on their own schedule. We’ll do our best to accommodate an earlier / later start date.</p>
      </div>

      <div className="flex justify-between text-center">
        <button
          className="w-[40%] px-4 py-2 font-bold text-white rounded-full bg-blue-500/20 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          onClick={onPrev}
        >
          Previous
        </button>
        <button
          className="w-[40%] px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Next
        </button>
      </div>
      <hr className="mt-6 mb-2 border-t" />
    </form>
  );
}

export default ReservationCheckoutFlowStep2;
