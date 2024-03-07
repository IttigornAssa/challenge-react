import { summaryDonations } from '../src/helpers';

describe('Unittest helpers', () => {
    test('summaryDonations success response', () => {
      const total = summaryDonations([10, 20, 30]);
      expect(total).toBe(60);
    });

    test('summaryDonations error response', () => {
        expect(() =>  summaryDonations([9,9,"9"])).toThrow();
      });
  
    test('summaryDonations error response', () => {
      expect(() =>  summaryDonations([])).toThrow();
    });
  

  });