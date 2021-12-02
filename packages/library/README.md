# @ft/library

> Request multiple urls which contain JSON data.

## Installation

```
npm install @ft/library
```

## Example usage

```
import { requestMultipleJSONUrls } from '@ft/library';

const urls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
];

requestMultipleJSONUrls(urls, {
  concurrencyLimit: 2,
  continueOnError: true
}).then(content => {
  console.log(content);
});
```
