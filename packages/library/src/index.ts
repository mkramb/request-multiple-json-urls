import fetch from 'isomorphic-unfetch';
import { parallelLimit, AsyncFunction } from 'async';

type FetchAPI = typeof fetch;
type ResponseJSON = Record<string, unknown>;

interface RequestOptions {
  readonly concurrencyLimit: number;
  readonly continueOnError: boolean;
  readonly fetch: FetchAPI;
}

const defaultOptions: RequestOptions = {
  concurrencyLimit: 1,
  continueOnError: false,
  fetch,
};

/**
 * Request multiple urls which respond with JSON data.
 *
 * @param urls List of valid URLs, it's responsibility of the user to validate them.
 * @param options Option object [[`RequestOptions`]] which controls behavior.
 *
 * @returns List of JSON contents, in the same order as they were provided.
 */
async function requestMultipleJSONUrls(
  urls: string[],
  options: Partial<RequestOptions> = {}
): Promise<ResponseJSON[]> {
  const currentOptions = {
    ...defaultOptions,
    ...options,
  };

  const tasks = urls.map((url): AsyncFunction<ResponseJSON, Error> => {
    return async (callback) => {
      try {
        const response = await currentOptions.fetch(url);
        const content: ResponseJSON = await response.json();

        callback(null, content);
      } catch (error) {
        const emptyResponse = {};

        if (currentOptions.continueOnError) {
          callback(null, emptyResponse);
        } else {
          callback(error as Error);
        }
      }
    };
  });

  return parallelLimit<ResponseJSON, ResponseJSON[], Error>(tasks, currentOptions.concurrencyLimit);
}

export { requestMultipleJSONUrls, FetchAPI, RequestOptions, ResponseJSON };
