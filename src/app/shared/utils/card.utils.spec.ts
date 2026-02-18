import {
  detectCardBrand,
} from './card.utils';

describe('Card Utilities', () => {

  describe('detectCardBrand()', () => {
    it('should detect Visa cards (starting with 4)', () => {
      expect(detectCardBrand('4111111111111111')).toBe('visa');
    });

    it('should detect Mastercard (starting with 51-55)', () => {
      expect(detectCardBrand('5500005555555559')).toBe('mastercard');
    });

    it('should return unknown for unrecognized prefix', () => {
      expect(detectCardBrand('6011111111111117')).toBe('unknown');
    });

    it('should handle formatted input with spaces', () => {
      expect(detectCardBrand('4111 1111 1111 1111')).toBe('visa');
    });
  });

});
