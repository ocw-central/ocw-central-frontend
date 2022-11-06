<img align="left" src=https://user-images.githubusercontent.com/44559556/196192159-7684237a-ba00-4ea4-8c37-3395acb19492.png width="100" height="100">

# ocw-central-frontend

[![ESLint](https://github.com/ocw-central/ocw-central-frontend/actions/workflows/ESLint.yml/badge.svg)](https://github.com/ocw-central/ocw-central-frontend/actions/workflows/ESLint.yml)
[![Prettier](https://github.com/ocw-central/ocw-central-frontend/actions/workflows/Prettier.yml/badge.svg)](https://github.com/ocw-central/ocw-central-frontend/actions/workflows/Prettier.yml)
[![Jest](https://github.com/ocw-central/ocw-central-frontend/actions/workflows/Jest.yml/badge.svg)](https://github.com/ocw-central/ocw-central-frontend/actions/workflows/Jest.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://img.shields.io/badge/license-MIT-blue)

## Requirement

### Node

- Install [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager)
- Install Node `16.13.0`
  ```bash
  nvm install 16.13.0
  ```
- Activate
  ```bash
  nvm use 16.13.0
  ```

### yarn

- Install yarn

  ```bash
  npm install --global yarn
  ```

- Install dependencies:

  ```bash
  git clone https://github.com/ocw-central/ocw-central-frontend
  cd ocw-central-frontend
  yarn install
  ```

- Start the server

  ```bash
  yarn dev
  ```

- Use eslint to lint the code

  ```bash
  yarn lint
  ```

- Build

  ```bash
  yarn build
  ```

### GraphQL Client ([Apollo Client](https://www.apollographql.com/docs/react))

- Add schemas for GraphQL queries to `~/src/documents`
- Generate type definitions of queries
  ```bash
  yarn generate
  ```

## Languages & tools

- TypeScript
- [Vite](https://vitejs.dev/) for build tool.
- [React](https://reactjs.org/) for building UI.
- [ESLint](https://eslint.org/) and [Prettier](https://**prettier**.io/) for formatting.
