//import { test, expect } from '@jest/globals';
import Payment from '../payment';

describe('payment', () => {
  
  test.each([
    ['4539-9906-3781-8133', 'Visa'],
    ['5432913036411255 ', 'Mastercard'],
    [' 345153693649122', 'American Express'],
    ['3538-1265-7486-6627 945', 'JCB'],
    ['$36428377257317', 'Diners Club'],
    ['<30449135233420>', 'Diners Club'],
    ['g6011894285604249240', 'Discover'],
    ['6221 2612 3456 7892', 'Discover'],
    ['6440 0000 0000 0005', 'Discover'],
    ['6221 2345 6789 0123', 'UnionPay'],
    ['"2200 1234 5678 9012', 'МИР'],
    ['1220-2906-3781-813', 'Unknown'],
    ['034373693649122', 'Unknown'],
    ['', undefined]
  ])('should correctly identify the payment system', (cardNumber, expected) => {
    const payment = new Payment();

    expect(payment.check(cardNumber)).toBe(expected);
  });
});