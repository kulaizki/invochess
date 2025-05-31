# Invochess

Invochess is an AI-powered web platform to help chess players improve their game. It uses Stockfish and Gemini for insightful analysis and personalized learning.

**The name "Invochess" blends "invoke" and "chess," symbolizing powerfully invoking chess understanding and improvement.**

## Project Status

**⚠️ This project is currently under active development.** The web application is not yet feature-complete. We appreciate your understanding as we work towards the full release.

## Tech Stack

*   SvelteKit
*   Tailwind CSS
*   Supabase (PostgreSQL, Drizzle ORM, Auth)
*   Stockfish (via Edge Functions)
*   Gemini API (via Edge Functions)
*   Vercel (planned for deployment)

## Key Features (Planned/In Development)

*   In-depth Game Analysis (PGN upload/manual input)
*   AI-Generated Explanations for complex positions
*   Key Moment Identification
*   Personalized Feedback & Common Mistake Analysis
*   Interactive Learning Modules

## Getting Started (Development)

This project was scaffolded using the standard SvelteKit CLI.

1.  **Clone the repository (if you haven't already):**
    ```bash
    # (Instructions for cloning will be added once the repository is public)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd invochess
    ```
3.  **Install dependencies:**
    Make sure you have Node.js and npm (or pnpm/yarn) installed.
    ```bash
    npm install
    # or
    # pnpm install
    # or
    # yarn
    ```
4.  **Set up Environment Variables:**
    Create a `.env` file in the root (see `.env.example` if available - to be created) for Supabase credentials and API keys.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Or to open in a browser automatically:
    ```bash
    npm run dev -- --open
    ```
    App available at `http://localhost:5173`.

## Building for Production

To create a production version of the app:

```bash
npm run build
```

You can preview the production build locally with `npm run preview`.

## Deployment

Deployment is planned for Vercel using the SvelteKit Vercel adapter.

## Contributing

(Contribution guidelines will be added once the project is more mature.)
