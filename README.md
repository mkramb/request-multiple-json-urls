# request-multiple-json-urls

This is monorepo which contains multiple `packages`:

- [@ft/library](./packages/library/README.md)
- [@ft/examples](./packages/examples/README.md)

## Prerequisite

- [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md)
- [Yarn2](https://yarnpkg.com/)

## Installation

Node & Yarn2 setup:
```
nvm install
npm install -g yarn@berry
```
Install dependencies:

```
yarn install
```

## Local Development

To build everything and execute tests:

```
yarn build
yarn test
```

Then follow `library` & `examples` README.
