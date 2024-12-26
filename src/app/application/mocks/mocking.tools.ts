export function generateMock<T>(...methodNames: (keyof T)[]): jest.Mocked<T> {
  const mock: Partial<jest.Mocked<T>> = {};
  methodNames.forEach((methodName) => {
    mock[methodName] = jest.fn() as jest.Mocked<T>[keyof T];
  });

  return mock as jest.Mocked<T>;
}
