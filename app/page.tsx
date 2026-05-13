"use client";

import { useActionState } from "react";
import { FormState, handleSubmit } from "./action";
import Link from "next/link";

const initialState: FormState = {
  success: false,
  message: "",
  data: null,
};

const StarRating = ({ rating, max }: { rating: number; max: number }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <span className="inline-flex gap-0.5">
      {[...Array(max)].map((_, i) => {
        if (i < filledStars) {
          return (
            <span key={i} className="text-lg text-yellow-400">
              ★
            </span>
          );
        } else if (i === filledStars && hasHalfStar) {
          return (
            <span key={i} className="relative inline-block text-lg">
              <span className="text-neutral-600">★</span>
              <span
                className="absolute left-0 top-0 text-yellow-400 overflow-hidden"
                style={{ width: "50%" }}
              >
                ★
              </span>
            </span>
          );
        } else {
          return (
            <span key={i} className="text-lg text-neutral-600">
              ★
            </span>
          );
        }
      })}
    </span>
  );
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
          <p
            className={`${state.success ? `text-emerald-500 bg-emerald-950 font-medium px-4 py-2` : `text-red-500 bg-red-950 font-medium px-4 py-2`}`}
          >
            {state.message}
          </p>
          <textarea
            name="requirements"
            className="border h-24 p-4 font-semibold border-neutral-800 rounded-xl"
            placeholder="I want a luxury blue car..."
          />
          <button
            disabled={isPending}
            type={"submit"}
            className="bg-violet-900 hover:bg-violet-800 cursor-pointer py-2 font-semibold rounded-xl"
          >
            {isPending ? "Finding your cars..." : "Get me my list!"}
          </button>
        </form>
        <section className="grid grid-cols-3 gap-4 my-8">
          {state.data?.map((car) => {
            return (
              <div
                key={car.id}
                className="p-4 font-semibold border rounded-2xl border-neutral-800"
              >
                <p className="text-2xl font-bold">
                  {car.make} {car.model}
                </p>
                <p className="text-neutral-500 text-lg">
                  {car.variant} • {car.color}
                </p>
                <p className="font-semibold text-2xl text-violet-500">
                  ₹{car.price.toLocaleString("en-IN")}
                </p>
                <p className="flex text-sm items-center gap-2">
                  User Rating: <StarRating rating={car.userReviews} max={5} />
                </p>
                <div className="mt-3 text-sm bg-neutral-900 p-4 flex flex-col gap-2 rounded-2xl text-neutral-400 space-y-1">
                  <p>Engine: {car.specs.engine}</p>
                  <p>
                    Fuel Type:{" "}
                    <span
                      className={
                        car.specs.fuelType === "Hybrid" ||
                        car.specs.fuelType === "Electric"
                          ? "text-emerald-500 font-bold"
                          : car.specs.fuelType === "CNG"
                            ? "text-blue-500 font-bold"
                            : "text-orange-400"
                      }
                    >
                      {car.specs.fuelType}
                    </span>
                  </p>
                  <p>Transmission: {car.specs.transmission}</p>
                  <p>Seats: {car.specs.seatingCapacity}</p>
                  <p>
                    Mileage:{" "}
                    <span className="font-bold">{car.specs.mileage} km/l</span>
                  </p>
                  <p>
                    Top Speed:{" "}
                    <span className="font-bold">{car.specs.topSpeed} km/h</span>
                  </p>
                  <p className="flex items-center gap-2">
                    Safety: <StarRating rating={car.safetyRating * 5} max={5} />
                  </p>
                  {car.link ? (
                    <Link
                      href={car.link}
                      target="_blank"
                      className="px-4 py-2 bg-orange-500 text-neutral-50 rounded-lg"
                    >
                      View on CarDekho
                    </Link>
                  ) : (
                    <Link
                      href={"#"}
                      target="_blank"
                      className="px-4 py-2 bg-orange-500 text-neutral-50"
                    >
                      Search in CarDekho
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
