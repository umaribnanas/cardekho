"use client";

import { useActionState } from "react";
import { FormState, handleSubmit } from "./action";

const initialState: FormState = {
  success: false,
  message: "",
  data: null,
};

export default function Home() {
  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialState,
  );

  return (
    <div className="p-8 container mx-auto">
      <header className="text-center my-8">
        <p className="font-bold text-3xl">Car Shortlister</p>
        <p className="text-neutral-500">
          Shortlists cars from a list as per user requirements.
        </p>
      </header>
      <main>
        {/* Form with textarea and submit button */}
        <form action={formAction} className="flex flex-col gap-4">
          <p className={`${state.success ? `text-green-400` : `text-red-500`}`}>
            {state.message}
          </p>
          <textarea
            name="requirements"
            className="border h-24 border-neutral-800 rounded-xl"
          />
          <button
            disabled={isPending}
            type={"submit"}
            className="bg-violet-900 cursor-pointer py-2 rounded-xl"
          >
            {isPending ? "Finding your cars..." : "Get me my list!"}
          </button>
        </form>
        <section className="grid grid-cols-3 gap-4 my-8">
          {state.data?.map((car) => {
            return (
              <div
                key={car.id}
                className="p-4 border rounded-xl border-neutral-800"
              >
                <p className="text-lg font-bold">
                  {car.make} {car.model}
                </p>
                <p className="text-neutral-500">
                  {car.variant} • {car.color}
                </p>
                <p className="font-semibold text-lg text-violet-500">
                  ₹{car.price.toLocaleString("en-IN")}
                </p>
                <p>
                  User Rating:{" "}
                  <span className="font-bold text-lg">{car.userReviews}/5</span>
                </p>
                <div className="mt-3 text-sm text-neutral-400 space-y-1">
                  <p>
                    {car.specs.engine} • {car.specs.fuelType}
                  </p>
                  <p>
                    {car.specs.transmission} • {car.specs.seatingCapacity} Seats
                  </p>
                  <p>Mileage: {car.specs.mileage} km/l</p>
                  <p>Top Speed: {car.specs.topSpeed} km/h</p>
                  <p>Safety: {(car.safetyRating * 5).toFixed(1)}/5 ⭐</p>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
