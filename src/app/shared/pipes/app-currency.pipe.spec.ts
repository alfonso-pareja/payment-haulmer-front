import { AppCurrencyPipe } from './app-currency.pipe';

describe('AppCurrencyPipe', () => {
  let pipe: AppCurrencyPipe;

  beforeEach(() => {
    pipe = new AppCurrencyPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format USD correctly', () => {
    const result = pipe.transform(1234.56, 'USD');
    expect(result).toContain('1,234.56');
    expect(result).toContain('$');
  });

  it('should format CLP with no decimal places', () => {
    const result = pipe.transform(5000, 'CLP');
    expect(result).toContain('5.000');
    expect(result).toContain('$');
  });

  it('should default to USD if no currency is provided', () => {
    const result = pipe.transform(100);
    expect(result).toContain('$');
    expect(result).toContain('100');
  });

  it('should format zero correctly', () => {
    const result = pipe.transform(0, 'USD');
    expect(result).toContain('0');
  });
});
