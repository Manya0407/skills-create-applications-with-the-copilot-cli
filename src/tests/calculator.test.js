const { add, sub, mul, div, modulo, power, squareRoot, compute } = require('../calculator');

describe('Calculator basic operations', () => {
  describe('addition', () => {
    test('add integers', () => {
      expect(add(2, 3)).toBe(5);
      expect(compute('add', 2, 3)).toBe(5);
      expect(compute('+', 2, 3)).toBe(5);
    });

    test('add with negatives and floats', () => {
      expect(add(-1, 1)).toBe(0);
      expect(add(2.5, 0.5)).toBeCloseTo(3.0);
    });
  });

  describe('subtraction', () => {
    test('subtract integers', () => {
      expect(sub(10, 4)).toBe(6);
      expect(compute('sub', 10, 4)).toBe(6);
      expect(compute('-', 10, 4)).toBe(6);
    });

    test('subtract negatives and floats', () => {
      expect(sub(-5, -5)).toBe(0);
      expect(sub(5.5, 2.2)).toBeCloseTo(3.3, 5);
    });
  });

  describe('multiplication', () => {
    test('multiply integers', () => {
      expect(mul(45, 2)).toBe(90);
      expect(compute('mul', 45, 2)).toBe(90);
      expect(compute('*', 45, 2)).toBe(90);
      expect(compute('x', 45, 2)).toBe(90);
    });

    test('multiply by zero and floats', () => {
      expect(mul(0, 123)).toBe(0);
      expect(mul(2.5, 2)).toBeCloseTo(5.0);
    });
  });

  describe('division', () => {
    test('divide integers', () => {
      expect(div(20, 5)).toBe(4);
      expect(compute('div', 20, 5)).toBe(4);
      expect(compute('/', 20, 5)).toBe(4);
    });

    test('division resulting in float', () => {
      expect(div(7, 2)).toBeCloseTo(3.5);
    });

    test('division by zero should throw', () => {
      expect(() => div(1, 0)).toThrow(/Division by zero/);
      expect(() => compute('div', 1, 0)).toThrow(/Division by zero/);
      expect(() => compute('/', 1, 0)).toThrow(/Division by zero/);
    });
  });

  describe('extended operations', () => {
    describe('modulo', () => {
      test('basic modulo', () => {
        expect(modulo(5, 2)).toBe(1);
        expect(compute('mod', 5, 2)).toBe(1);
        expect(compute('%', 5, 2)).toBe(1);
      });

      test('modulo by zero should throw', () => {
        expect(() => modulo(1, 0)).toThrow(/Modulo by zero/);
        expect(() => compute('mod', 1, 0)).toThrow(/Modulo by zero/);
        expect(() => compute('%', 1, 0)).toThrow(/Modulo by zero/);
      });
    });

    describe('power / exponentiation', () => {
      test('basic power', () => {
        expect(power(2, 3)).toBe(8);
        expect(compute('pow', 2, 3)).toBe(8);
        expect(compute('**', 2, 3)).toBe(8);
        expect(compute('^', 2, 3)).toBe(8);
      });

      test('negative exponent', () => {
        expect(power(2, -1)).toBeCloseTo(0.5);
      });
    });

    describe('square root', () => {
      test('perfect square', () => {
        expect(squareRoot(16)).toBe(4);
        expect(compute('sqrt', 16)).toBe(4);
        expect(compute('√', 16)).toBe(4);
      });

      test('square root of negative should throw', () => {
        expect(() => squareRoot(-1)).toThrow(/Square root of negative number/);
        expect(() => compute('sqrt', -1)).toThrow(/Square root of negative number/);
      });
    });
  });
});
