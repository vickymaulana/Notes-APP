# Notes App

## Overview

**Notes App** is a modern note-taking application built with Vite, ReactJS, TypeScript, and Bootstrap. It leverages the power of Vite for fast development, React for building user interfaces, TypeScript for static typing, and Bootstrap for a responsive and sleek design. The backend is supported by an Express API endpoint.

## Features

- **Fast Development**: Utilizes Vite to provide a rapid development environment with Hot Module Replacement (HMR).
- **Type-Safe**: TypeScript ensures a type-safe codebase, catching errors at compile-time.
- **Responsive Design**: Bootstrap is integrated for a mobile-friendly and visually appealing UI.
- **Express API**: The application communicates with an Express API for data storage and retrieval.

## Installation

Follow these steps to set up and run the Notes App locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/vickymaulana/Notes-APP.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Notes-APP
    ```

3. Install dependencies using your package manager (npm or yarn):

    ```bash
    npm install
    # or
    yarn install
    ```

4. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the Notes App.

## ESLint Configuration

For a production-ready application, the ESLint configuration includes type-aware lint rules. Follow these steps:

1. Configure the top-level `parserOptions` property in your ESLint configuration:

    ```javascript
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: ['./tsconfig.json', './tsconfig.node.json'],
      tsconfigRootDir: __dirname,
    },
    ```

2. Replace `plugin:@typescript-eslint/recommended` with either `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`.

3. Optionally, add `plugin:@typescript-eslint/stylistic-type-checked`.

4. Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list.

## Developer

- **Name**: Vicky Maulana
- **GitHub**: [vickymaulana](https://github.com/vickymaulana)

## Repository

Explore the code on GitHub: [Notes App Repository](https://github.com/vickymaulana/Notes-APP)

Feel free to contribute or open issues to improve the Notes App!