import generateRandomId from './generate-random-id';

describe(`Test the ${generateRandomId.name} function`, () => {
  it('should generate a random ID when the function is called', () => {
    const id = generateRandomId();
    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
});