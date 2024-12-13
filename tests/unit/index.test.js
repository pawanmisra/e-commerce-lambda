import { jest } from '@jest/globals';

// Mock resolvePath dynamically
const mockedResolvePath = jest.fn();
jest.unstable_mockModule('../../routes/apiRoutes.mjs', () => ({
  resolvePath: mockedResolvePath,
}));


describe('Handler Tests', () => {
  let handler;
  beforeAll(async () => {
    // Dynamically import the handler after mocking
    ({ handler } = await import('../../index.mjs'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return the result from the resolver if resolver exists', async () => {
    const mockResolver = jest.fn(() => ({ success: true }));
    mockedResolvePath.mockReturnValue(mockResolver);

    const mockEvent = { typeName: 'Query', fieldName: 'getProductsById', arguments: { id: 1 } };

    const result = await handler(mockEvent);

    expect(mockedResolvePath).toHaveBeenCalledWith('Query', 'getProductsById');
    expect(mockResolver).toHaveBeenCalledWith(mockEvent);
    expect(result).toEqual({ success: true });
  });

  test('should return 404 when no resolver is found', async () => {
    mockedResolvePath.mockReturnValue(null);

    const mockEvent = { typeName: 'Query', fieldName: 'unknownOperation' };

    const result = await handler(mockEvent);

    expect(mockedResolvePath).toHaveBeenCalledWith('Query', 'unknownOperation');
    expect(result).toEqual({
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'No handler found for the given request.' }),
    });
  });

  test('should handle resolver errors gracefully', async () => {
    const mockResolver = jest.fn().mockRejectedValue(new Error('Resolver Error'));
    mockedResolvePath.mockReturnValue(mockResolver);

    const mockEvent = { typeName: 'Mutation', fieldName: 'createProduct' };

    await expect(handler(mockEvent)).rejects.toThrow('Resolver Error');
    expect(mockedResolvePath).toHaveBeenCalledWith('Mutation', 'createProduct');
  });
});
