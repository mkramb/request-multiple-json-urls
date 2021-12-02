import fetch from 'isomorphic-unfetch';
import fetchRetry from 'fetch-retry';

import { requestMultipleJSONUrls } from '@ft/library';

const urls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws-invalid.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
];

const fetchWithRetry: typeof fetch = (url) =>
  fetchRetry(fetch)(url, {
    retries: 10,
    retryDelay: 1000,
  });

requestMultipleJSONUrls(urls, {
  continueOnError: true,
  fetch: fetchWithRetry,
}).then((content) => {
  console.log(content);
});
