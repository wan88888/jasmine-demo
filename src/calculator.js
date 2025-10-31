// 简单的计算器类
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }

  power(base, exponent) {
    return Math.pow(base, exponent);
  }

  percentage(value, percent) {
    return (value * percent) / 100;
  }
}

module.exports = Calculator;

