# OCW-CENTRAL-FRONTEND

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

- Add schemas for GraphQL queries to `~/src/document`
- Generate type definitions of queries
  ```bash
  yarn generate
  ```

## Languages & tools

- TypeScript
- [Vite](https://vitejs.dev/) for build tool.
- [React](https://reactjs.org/) for building UI.
- [ESLint](https://eslint.org/) and [Prettier](https://**prettier**.io/) for formatting.

### Lisence

MIT License
