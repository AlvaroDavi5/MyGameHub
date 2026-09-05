# My Game Hub :video_game:

## Description

A game hub for managing and playing your favorite games.

Built with React Router and server-side rendering (SSR) for a fast, SEO-friendly application, styled with Chakra UI.

## Overview

### Main technologies

- **TypeScript**: JavaScript superset for typing;
- **Node.js**: JavaScript runtime;
- **React**: Front-End library for building user interfaces;
- **React Router**: Routing library and full-stack framework, with Server-Side Rendering (SSR), loaders and actions;
- **@react-router/serve**: HTTP server used to serve the React Router SSR build;
- **Vite**: Build tool and development server;
- **Chakra UI**: Component library and design system, with design tokens and color mode;
- **Emotion**: CSS-in-JS engine used by Chakra UI;
- **Vitest**: Testing framework and test runner;
- **Testing Library**: Rendering and interaction utilities used by the tests;
- **Oxlint**: Rust-based JavaScript/TypeScript linter;
- **Oxfmt**: Rust-based formatter for TypeScript, JSX, stylesheets, JSON, YAML and Markdown;
- **Docker**: Containerization tool;

---

### Install dependencies

1. Install project dependencies

```shell
npm install
```

The `postinstall` hook runs `react-router typegen`, generating the route types under `.react-router/types`.

#### What to do if the service goes down

- Check the logs;
- Test the dependencies and execution locally;
- Run automated tests;
- If necessary, merge with a hotfix on git;
- Rebuild the project and restart the service;

## Running Locally

```shell
cp .env.local ./.env # copy development local example
source ./.env # load envs on shell session
npm run start:dev # start application in development mode
```

## Building

```shell
npm run typecheck # generate the route types and check the whole project
npm run build # production build (client and server bundles)
npm run start # serve the SSR build, on the port read from the environment
```

## Testing

```shell
npm test # unit and rendering tests
npm run test:unit # component state, logic and flows only
npm run test:render # component and page rendering only
npm run test:coverage # tests with coverage report
```

## Interface

- [localhost:3001](http://localhost:3001/) - Application Interface

---

### Project structure

- `app` - Application root layout, route configuration and entry point;
- `app/routes` - Route modules;
- `app/components` - Reusable UI components;
- `app/configs` - Library configuration (Chakra UI theme and color mode);
- `app/welcome` - Welcome page component and its assets;
- `public` - Static assets served as they are;
- `tests` - Unit tests (state, logic and flows) and rendering tests;
- `scripts` - Support scripts (e.g. security check);

---

### TO DO

- [ ] Update Launch Settings
- **Concepts**
  - Application State
    - [ ] Redux
    - [ ] Context API
    - [ ] Fetch API
  - [ ] UseState, UseEffect, UseContext
  - Rendering
    - [ ] Static Site Generation (prerender)
    - [ ] Client-Side Rendering
      - clientLoader
    - [x] Server-Side Rendering
      - loader
      - action
  - Components
    - [ ] Form
    - [ ] NavBar
    - [ ] Toast
    - [ ] DropDown
    - [ ] Modal
    - [ ] Image
    - [ ] Header
    - [ ] Scroller
  - Actions
    - [ ] Validations
    - [ ] Requests (Http)
    - [ ] Connections (WebSockets)
    - [ ] Hooks
- **Tests**
  - [x] Component Render Test
  - [x] Page Render Test
