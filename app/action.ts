"use server";

import { carsList } from "@/lib/car-list";
import { Car } from "@/lib/schema";
import { generateText, Output } from "ai";
import { createOllama, ollama } from "ai-sdk-ollama";
import z from "zod";

export type FormState = {
  success: boolean;
  message: string;
  data: Car[] | null;
};

export async function handleSubmit(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { requirements } = Object.fromEntries(formData);

  if (!requirements) {
    return {
      success: false,
      message: "No Requirements",
      data: null,
    };
  }

  //   const ollama = createOllama({
  //   baseURL: 'http://my-ollama-server:11434',
  //   headers: {
  //     'Custom-Header': 'value',
  //   },
  // });

  try {
    const result = await generateText({
      model: ollama("gemma4:31b-cloud"),
      system: `You are a car recommendation expert. IMPORTANT: Always respond with ONLY valid JSON. DO NOT use markdown code blocks, backticks, or any formatting. Output raw JSON only.`,
      prompt: `Available cars: ${JSON.stringify(carsList)}. \n User requirements: ${requirements}. \n Return ONLY this JSON format with no markdown: {"car_ids": [1,2,15]}`,
      output: Output.object({
        schema: z.object({
          car_ids: z.array(z.number().int()).max(5),
        }),
      }),
      maxRetries: 3,
    });

    console.log(`Result: `, result);

    const shortlistedCars = carsList.filter((car) =>
      result.output.car_ids.includes(car.id),
    );

    if (shortlistedCars.length === 0) {
      return {
        success: true,
        message: "No cars found",
        data: null,
      };
    }

    console.log(shortlistedCars);

    return {
      success: true,
      message: "Shortlisted cars below",
      data: shortlistedCars,
    };
  } catch (error) {
    console.error(`Error: `, error);
    return {
      success: false,
      message: "Shortlisting failed. Try again later.",
      data: null,
    };
  }
}
