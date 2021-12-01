interface IOptions {
  readonly concurrency: number;
  readonly onErrorContinue: boolean;
  readonly onErrorCallback: (error: Error) => void;
}

const defaultOptions: IOptions = {
  concurrency: 2,
  onErrorContinue: false,
  onErrorCallback: () => {},
};

function requestMultipleUrls(urls: string[], options: IOptions): Promise<string> {
  const currentOptions = {
    ...defaultOptions,
    options,
  };

  console.log({
    urls,
    currentOptions,
  });

  return Promise.resolve('content');
}

export { requestMultipleUrls };
