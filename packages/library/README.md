# @ft/library

> Request multiple urls as doing a single request.

## Installation

```
npm install @ft/library
```

## Example usage

```
import { requestMultipleUrls } from '@ft/library';

const urls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
];

requestMultipleUrls(urls, {
  concurrency: 2,
  onErrorContinue: true
  onErrorCallback: (error) => {
    console.error(error);
  })
}).then(content => {
  console.log(content);
});
```

## Default options

- `concurrency` - 2
- `onErrorContinue` - false
- `onErrorCallback` - () => {}
