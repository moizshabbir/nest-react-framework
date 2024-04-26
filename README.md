# Vite React + Nestjs

## Description

A modern React application built with Vite for blazing-fast development experience, utilizing React Toolkit for streamlined state management, and generate-react-cli for efficient component generation.

## Setup

### Prerequisites:

Node.js (version 20.12.2 or higher) installed: https://nodejs.org/en/download
npm (bundled with Node.js) or yarn (package manager): https://classic.yarnpkg.com/lang/en/docs/install/
Clone or Download the Repository

```
git clone https://github.com/your-username/your-project-name.git
```
or download the ZIP archive.

### Install Dependencies

```
cd your-project-name
yarn
```
## Development

### Start the Development Server

```
yarn dev
```
This will launch the development server at http://localhost:3000/ by default.

### Hot Module Replacement (HMR)
Vite offers HMR for a seamless development experience. Changes to your components will be reflected in the browser without the need for manual refreshes.

## Component Generation

This project utilizes generate-react-cli to expedite component creation. For More detail check the documentation: https://www.npmjs.com/package/generate-react-cli

```
npx generate-react-cli component MyComponentName
```
This will create a new directory named MyComponentName with appropriate component files (e.g., MyComponentName.tsx, MyComponentName.css, MyComponentName.stories.tsx, and MyComponentName.test.tsx).

## Building for Production

Create a Production Build
```
yarn build
```
This will generate optimized production-ready files in the dist folder.

## Deployment

Deploy the contents of the dist folder to your preferred web hosting platform.

## Testing

Unit tests are encouraged for robust component validation. You can choose a testing framework like Jest or React Testing Library.

## Features

Vite for blazing-fast development and build times
React Toolkit for efficient state management
generate-react-cli for streamlined component generation