import { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from 'react-multi-date-picker';
import { DateObject } from 'react-multi-date-picker';

const today = new Date();
const minDate = new Date("2024-05-01");
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
      }),
    desiredVisitDates: z
      .array(
        z
          .coerce
          .date()
          .min(minDate, { message: "Please select a date after May 2024." })
          .max(maxDate, { message: "Please select a date before 2 years from now." })
      ),
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

  const [selectedDates, setSelectedDates] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);

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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <DatePicker
                minDate={minDate}
                maxDate={maxDate}
                range
                date={value}
                onChange={(dates) => onChange(dates)}
                format="MM/DD/YYYY"
                inputClass={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${error ? "border-red-500" : ""} rounded appearance-none focus:outline-none focus:shadow-outline`}
              />
              {error && (
                <p className="mt-2 text-xs italic text-red-500">
                  {error.message}
                </p>
              )}
            </>
          )}
        />

      </div>
      <div className="flex justify-between mb-6 text-center">
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
      <hr className="mb-6 border-t" />
    </form>

  )
}

export default ReservationCheckoutFlowStep2;
