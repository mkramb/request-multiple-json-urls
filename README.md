# request-multiple-json-urls

This is monorepo which contains multiple `packages`:

- [@ft/library](./packages/library/README.md)
- [@ft/examples](./packages/examples/README.md)

## Prerequisite

- [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md)
- [Yarn2](https://yarnpkg.com/)

## Install dependencies

```
nvm install
yarn install
```

## Local Development

To build everything:

```
yarn build
```

Then follow `library` & `examples` README.
For example:

```
cd packages/examples
yarn start:simple
```
