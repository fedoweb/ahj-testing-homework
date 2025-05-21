import Validator from '../validator';

describe('validator', () => {
  test.each([
    ['4539-9906-3781-8133', true],
    ['$5432913036411255', true],
    ['g345153693649122', true],
    ['3538-1265-7486-6627 945', true],
    ['<36428377257317>', true],
    ['"30449135233420', true],
    [' 6011894285604249240', true],
    ['6440 0000 0000 0005', true],
    ['1220-2906-3781-813', false],
    ['03437369364', false],
    ['0343 7369 3644 1223 123456789', false],
    ['', false]
  ])('should', (cardNumber, expected) => {
    const validator = new Validator();

    expect(validator.check(cardNumber)).toBe(expected);
  });
});