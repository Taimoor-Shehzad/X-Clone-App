# X-Clone App

A modern social media application inspired by X (formerly Twitter), built with Expo and React Native. The app combines a polished mobile-first UI, Clerk-powered authentication, and a Convex backend to support a social networking experience.

## Overview

X-Clone App is designed to mimic the core flow of a social platform:

- User sign-in and onboarding
- Home feed and content browsing
- Search and discovery
- Notifications center
- Direct message experience
- Profile management and user information

The project uses a modular structure and Expo Router for screen-based navigation, making it easy to extend with additional features like posting, following, comments, and richer media interactions.

## Tech Stack

- Expo / React Native
- TypeScript
- Expo Router
- NativeWind for styling
- Clerk for authentication
- Convex for backend data and real-time logic
- TanStack React Query for client-side data handling
- React Navigation and Expo UI components

## Features

- Secure authentication flow with Clerk
- Tab-based app navigation
- Social app screens for home, messages, notifications, profile, and search
- Structured app layout using file-based routing
- Responsive design suitable for mobile and web
- Type-safe frontend architecture with TypeScript

## Project Structure

```text
X-Clone-App/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (screens)/
│   │   └── (tabs)/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   └── types/
├── convex/
├── assets/
├── app.json
├── package.json
├── tsconfig.json
├── global.css
├── metro.config.js
├── README.md
└── LICENSE
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- A Clerk project
- A Convex project

### 1. Clone the repository

```bash
git clone https://github.com/Taimoor-Shehzad/X-Clone-App.git
cd X-Clone-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file or configure your Expo environment with the required Clerk and Convex values used by the app.

Example:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EXPO_PUBLIC_CONVEX_URL=your_convex_url
```

Update the values to match your own project configuration.

### 4. Start the app

```bash
npm start
```

Then run one of the following:

```bash
npm run android
npm run ios
npm run web
```

## Available Scripts

```bash
npm start       # Start Expo development server
npm run android # Start Android app
npm run ios     # Start iOS app
npm run web     # Start web app
npm run lint    # Run lint checks
```

## Notes

This app is a full-stack social media starter built for experimentation and extension. It is structured to support features such as post creation, feeds, user profiles, and interactions while keeping the codebase easy to navigate.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing

Contributions are welcome. If you want to improve the app, add features, or fix issues, feel free to open a pull request with a clear description of your changes.
