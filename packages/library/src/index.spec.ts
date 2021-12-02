import { requestMultipleJSONUrls, FetchAPI } from './index';
import * as async from 'async';

describe('requestMultipleJSONUrls', () => {
  let parallelLimitSpy: jest.SpyInstance;

  const exampleUrls = [
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
  ];

  const mockFetchJSONResponse = jest.fn();
  const mockFetchAPI = async () => {
    return {
      json: await mockFetchJSONResponse,
    };
  };

  beforeEach(() => {
    parallelLimitSpy = jest.spyOn(async, 'parallelLimit');
    mockFetchJSONResponse.mockReset();
  });

  it('should fetch multiple urls and retrieve them in order', async () => {
    mockFetchJSONResponse
      .mockReturnValueOnce({ data: 0 })
      .mockReturnValueOnce({ data: 1 })
      .mockReturnValueOnce({ data: 2 });

    const results = await requestMultipleJSONUrls(exampleUrls, {
      fetch: mockFetchAPI as unknown as FetchAPI,
    });

    expect(results.length).toEqual(exampleUrls.length);

    expect(results[0]).toEqual({ data: 0 });
    expect(results[1]).toEqual({ data: 1 });
    expect(results[2]).toEqual({ data: 2 });
  });

  it('should throw an error in case of an error', async () => {
    mockFetchJSONResponse
      .mockReturnValueOnce({ data: 0 })
      .mockImplementationOnce(() => {
        throw 'Error';
      })
      .mockReturnValueOnce({ data: 2 });

    expect.assertions(1);

    try {
      await requestMultipleJSONUrls(exampleUrls, {
        fetch: mockFetchAPI as unknown as FetchAPI,
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should be able to continue on error when enabled', async () => {
    mockFetchJSONResponse
      .mockImplementationOnce(() => {
        throw 'Error';
      })
      .mockReturnValueOnce({ data: 1 })
      .mockReturnValueOnce({ data: 2 });

    const result = await requestMultipleJSONUrls(exampleUrls, {
      continueOnError: true,
      fetch: mockFetchAPI as unknown as FetchAPI,
    });

    expect(result[0]).toEqual({});
    expect(result[1]).toEqual({ data: 1 });
    expect(result[2]).toEqual({ data: 2 });
  });

  it('should be able to use concurrencyLimit with parallel execution', async () => {
    mockFetchJSONResponse
      .mockReturnValueOnce({ data: 0 })
      .mockReturnValueOnce({ data: 1 })
      .mockReturnValueOnce({ data: 2 });

    const result = await requestMultipleJSONUrls(exampleUrls, {
      concurrencyLimit: 3,
      fetch: mockFetchAPI as unknown as FetchAPI,
    });

    expect(parallelLimitSpy).toBeCalledWith(expect.anything(), 3);
  });
});
