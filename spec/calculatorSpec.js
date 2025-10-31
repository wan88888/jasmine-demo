const Calculator = require('../src/calculator');

describe("Calculator 测试套件", function() {
  let calculator;

  // 在每个测试之前创建新的实例
  beforeEach(function() {
    calculator = new Calculator();
  });

  describe("基本运算", function() {
    it("应该正确执行加法", function() {
      expect(calculator.add(2, 3)).toBe(5);
      expect(calculator.add(-1, 1)).toBe(0);
      expect(calculator.add(0, 0)).toBe(0);
    });

    it("应该正确执行减法", function() {
      expect(calculator.subtract(5, 3)).toBe(2);
      expect(calculator.subtract(0, 5)).toBe(-5);
      expect(calculator.subtract(10, 10)).toBe(0);
    });

    it("应该正确执行乘法", function() {
      expect(calculator.multiply(3, 4)).toBe(12);
      expect(calculator.multiply(-2, 3)).toBe(-6);
      expect(calculator.multiply(0, 100)).toBe(0);
    });

    it("应该正确执行除法", function() {
      expect(calculator.divide(10, 2)).toBe(5);
      expect(calculator.divide(9, 3)).toBe(3);
      expect(calculator.divide(7, 2)).toBeCloseTo(3.5, 2);
    });

    it("除以零时应该抛出错误", function() {
      expect(function() {
        calculator.divide(10, 0);
      }).toThrowError('Cannot divide by zero');
    });
  });

  describe("高级运算", function() {
    it("应该正确计算幂运算", function() {
      expect(calculator.power(2, 3)).toBe(8);
      expect(calculator.power(5, 2)).toBe(25);
      expect(calculator.power(10, 0)).toBe(1);
    });

    it("应该正确计算百分比", function() {
      expect(calculator.percentage(200, 50)).toBe(100);
      expect(calculator.percentage(150, 20)).toBe(30);
      expect(calculator.percentage(1000, 5)).toBe(50);
    });
  });

  describe("浮点数精度测试", function() {
    it("应该处理浮点数计算", function() {
      const result = calculator.add(0.1, 0.2);
      expect(result).toBeCloseTo(0.3, 5);
    });

    it("应该处理小数除法", function() {
      const result = calculator.divide(1, 3);
      expect(result).toBeCloseTo(0.333, 2);
    });
  });
});

