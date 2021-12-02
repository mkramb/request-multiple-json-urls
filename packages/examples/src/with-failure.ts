import { requestMultipleJSONUrls } from '@ft/library';

const urls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://invalid-ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
];

requestMultipleJSONUrls(urls, {
  continueOnError: true,
}).then((content) => {
  console.log(JSON.stringify(content, null, 2));
});
