import fetch from 'isomorphic-unfetch';
import { parallelLimit, AsyncFunction } from 'async';

interface RequestOptions {
  readonly concurrencyLimit: number;
  readonly continueOnError: boolean;
  readonly fetch: typeof fetch;
}

type ResponseJSON = Record<string, unknown>;
type ResponseResults = {
  readonly data: { items: ResponseJSON[] };
  readonly timeGenerated: string;
};

const defaultOptions: RequestOptions = {
  concurrencyLimit: 1,
  continueOnError: false,
  fetch,
};

async function requestMultipleUrls(
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
        const response = await fetch(url);
        const content: ResponseJSON = await response.json();

        callback(null, content);
      } catch (error) {
        if (currentOptions.continueOnError) {
          callback(null);
        } else {
          callback(error as Error);
        }
      }
    };
  });

  const results = await parallelLimit<ResponseJSON, ResponseResults[], Error>(
    tasks,
    currentOptions.concurrencyLimit
  );

  return results.map((result) => {
    return result?.data?.items?.[0] ?? null;
  });
}

export { requestMultipleUrls, ResponseResults };
