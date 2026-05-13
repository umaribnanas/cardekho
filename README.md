# Car Shortlister

An intelligent car recommendation system that helps users find their perfect vehicle from a curated list based on their specific requirements.

## Overview

Car Shortlister is a web application that combines AI-powered natural language processing with a structured car database. Users describe what they're looking for in a car, and the application uses an LLM to understand their requirements and intelligently match them with suitable vehicles.

## Features

- **Natural Language Input**: Describe your car requirements in plain English
- **AI-Powered Matching**: Uses Ollama (Gemma-4) to understand requirements and match with cars
- **Rich Car Details**: View comprehensive specs including engine, fuel type, transmission, mileage, top speed, and safety ratings
- **Responsive UI**: Clean, modern interface built with Tailwind CSS
- **Real-time Processing**: Instant feedback with loading states

## Tech Stack

### Frontend

- **Next.js 16**: React framework with server actions
- **React 19**: UI library with hooks
- **Tailwind CSS 4**: Utility-first CSS framework
- **TypeScript**: Type-safe development

### Backend / AI

- **Ollama with Gemma-4**: Local LLM for intelligent car matching
- **Vercel AI SDK**: Unified AI interface for model integration
- **Zod**: Runtime schema validation for AI outputs

### Tooling

- **ESLint**: Code quality and consistency
- **pnpm**: Fast, efficient package manager

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main UI component
│   ├── action.ts           # Server action for AI processing
│   ├── globals.css         # Global styles
│   └── schema.ts           # Data schemas
├── lib/
│   ├── car-list.ts         # Car database
│   └── schema.ts           # Zod validation schemas
├── public/                 # Static assets
└── config files            # Next.js, TypeScript, Tailwind config
```

## How It Works

1. User enters their car requirements (e.g., "I need a budget-friendly SUV with good mileage")
2. The form submits to `handleSubmit` server action
3. Ollama + Gemma-4 parses the requirements and returns matching car IDs
4. The app filters the car list and displays matching vehicles
5. Results show detailed specs: price, engine, transmission, mileage, safety rating, etc.

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000

### CHECK THE REQUIREMENTS SECTION FOR AI MODEL SETUP ###
```

## Requirements

- **Ollama**: Ensure Ollama is running locally with the Gemma-4 model (`ollama pull gemma4:31b-cloud` this is a cloud model, so no need to download)
  [If you have another model/custom ollama server - go to `app/action.ts` `line:38` and change the model there / `line:29` uncomment and do the same]
- **Node.js 18+**: Required for Next.js

---

## Assignment Questions

### 1. What did you build and why? What did you deliberately cut?

**Answer:**
I wanted a `natural language search` like in `Google` for finding cars, not many people would take the time to change filters like in Flipkart/Amazon.

I cut the images(time consuming), OpenAI cloud models(pricing) so I used a local `Ollama` with a free cloud model `gemma4:31b-cloud`. I also cut out making a separate backend(I have to code, link, deploy separately etc...)

### 2. What's your tech stack and why did you pick it?

**Answer:**

- `Next.JS with App Router` with `Server Actions` as backend.
- I also used `TailwindCSS` to reduce styling time.

I picked this stack because it helps setup a project with full frontend/backend capability and also vercel deployment would be faster.

### 3. What did you delegate to AI tools vs. do manually? Where did the tools help most?

**Answer:**
AI tools helped `reduce repetitive tasks` and `edge case error fixing`. The tool would setup what to do, I will proofread and fix errors and make it a little efficient and visually appealing.

For example to generate the seed list of cars - I used `Grok AI by X(Twitter)`, while I created the Car schema based on requirements by the project.

### 4. Where did they get in the way?

**Answer:**
They sometimes halucinate and do something that is not needed or leave out certain important steps.

### 5. If you had another 4 hours, what would you add?

**Answer:**

- I would use `ShadCN UI` components to make the UI industry standard and look more nice.
- I would setup a separate `Backend service API`, Which would help in scaling and a better developer experience.
- I would setup an online `OpenAI / Claude` LLM Model.
- I would setup Jest to verify the Backend API and Frontend UI (But this is only when there is too many endpoints or screens, otherwise it would worth less).
