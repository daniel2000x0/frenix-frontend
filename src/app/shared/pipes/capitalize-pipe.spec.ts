import { CapitalizePipe } from './capitalize-pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize a lowercase string', () => {
    expect(pipe.transform('hello')).toBe('Hello');
  });

  it('should capitalize an uppercase string and lowercase the rest', () => {
    expect(pipe.transform('HELLO')).toBe('Hello');
  });

  it('should capitalize a mixed case string', () => {
    expect(pipe.transform('hElLo')).toBe('Hello');
  });

  it('should return non-string values unchanged', () => {
    expect(pipe.transform(123)).toBe(123);
    expect(pipe.transform(null)).toBe(null);
    expect(pipe.transform(undefined)).toBe(undefined);
    expect(pipe.transform({})).toEqual({});
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle single character', () => {
    expect(pipe.transform('a')).toBe('A');
    expect(pipe.transform('A')).toBe('A');
  });
});
