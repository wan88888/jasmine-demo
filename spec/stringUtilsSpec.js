const StringUtils = require('../src/stringUtils');

describe("StringUtils 字符串工具测试套件", function() {
  
  describe("reverse() - 反转字符串", function() {
    it("应该正确反转字符串", function() {
      expect(StringUtils.reverse("hello")).toBe("olleh");
      expect(StringUtils.reverse("abc")).toBe("cba");
    });

    it("应该处理空字符串", function() {
      expect(StringUtils.reverse("")).toBe("");
    });

    it("应该处理单字符", function() {
      expect(StringUtils.reverse("a")).toBe("a");
    });

    it("应该处理包含特殊字符的字符串", function() {
      expect(StringUtils.reverse("hello!")).toBe("!olleh");
      expect(StringUtils.reverse("你好世界")).toBe("界世好你");
    });
  });

  describe("capitalize() - 首字母大写", function() {
    it("应该将首字母大写", function() {
      expect(StringUtils.capitalize("hello")).toBe("Hello");
      expect(StringUtils.capitalize("world")).toBe("World");
    });

    it("应该将其余字母转为小写", function() {
      expect(StringUtils.capitalize("HELLO")).toBe("Hello");
      expect(StringUtils.capitalize("hELLO")).toBe("Hello");
    });

    it("应该处理空字符串", function() {
      expect(StringUtils.capitalize("")).toBe("");
    });

    it("应该处理单字符", function() {
      expect(StringUtils.capitalize("a")).toBe("A");
      expect(StringUtils.capitalize("A")).toBe("A");
    });
  });

  describe("wordCount() - 统计单词数", function() {
    it("应该正确统计单词数", function() {
      expect(StringUtils.wordCount("hello world")).toBe(2);
      expect(StringUtils.wordCount("one two three four")).toBe(4);
    });

    it("应该处理多余的空格", function() {
      expect(StringUtils.wordCount("  hello   world  ")).toBe(2);
      expect(StringUtils.wordCount("   one    ")).toBe(1);
    });

    it("应该处理空字符串", function() {
      expect(StringUtils.wordCount("")).toBe(0);
      expect(StringUtils.wordCount("   ")).toBe(0);
    });

    it("应该处理单个单词", function() {
      expect(StringUtils.wordCount("hello")).toBe(1);
    });

    it("应该处理非字符串输入", function() {
      expect(StringUtils.wordCount(null)).toBe(0);
      expect(StringUtils.wordCount(undefined)).toBe(0);
    });
  });

  describe("truncate() - 截断字符串", function() {
    it("应该在超过最大长度时截断", function() {
      const result = StringUtils.truncate("Hello World", 8);
      expect(result).toBe("Hello...");
    });

    it("不超过最大长度时不应该截断", function() {
      const result = StringUtils.truncate("Hello", 10);
      expect(result).toBe("Hello");
    });

    it("应该支持自定义后缀", function() {
      const result = StringUtils.truncate("Hello World", 8, "...");
      expect(result).toBe("Hello...");
      
      const result2 = StringUtils.truncate("Hello World", 8, " [more]");
      expect(result2).toBe("H [more]");
    });

    it("应该正确处理边界情况", function() {
      const result = StringUtils.truncate("Hello", 5);
      expect(result).toBe("Hello");
    });
  });

  describe("isPalindrome() - 判断回文", function() {
    it("应该识别简单回文", function() {
      expect(StringUtils.isPalindrome("racecar")).toBe(true);
      expect(StringUtils.isPalindrome("madam")).toBe(true);
      expect(StringUtils.isPalindrome("level")).toBe(true);
    });

    it("应该识别非回文", function() {
      expect(StringUtils.isPalindrome("hello")).toBe(false);
      expect(StringUtils.isPalindrome("world")).toBe(false);
    });

    it("应该忽略大小写", function() {
      expect(StringUtils.isPalindrome("Racecar")).toBe(true);
      expect(StringUtils.isPalindrome("RaceCar")).toBe(true);
    });

    it("应该忽略空格和标点符号", function() {
      expect(StringUtils.isPalindrome("A man a plan a canal Panama")).toBe(true);
      expect(StringUtils.isPalindrome("race a car")).toBe(false);
    });

    it("应该处理单字符和空字符串", function() {
      expect(StringUtils.isPalindrome("a")).toBe(true);
      expect(StringUtils.isPalindrome("")).toBe(true);
    });
  });

  describe("camelToSnake() - 驼峰转下划线", function() {
    it("应该将驼峰命名转换为下划线", function() {
      expect(StringUtils.camelToSnake("helloWorld")).toBe("hello_world");
      expect(StringUtils.camelToSnake("firstName")).toBe("first_name");
    });

    it("应该处理多个大写字母", function() {
      expect(StringUtils.camelToSnake("myHTMLParser")).toBe("my_h_t_m_l_parser");
    });

    it("应该处理全小写字符串", function() {
      expect(StringUtils.camelToSnake("hello")).toBe("hello");
    });

    it("应该处理空字符串", function() {
      expect(StringUtils.camelToSnake("")).toBe("");
    });
  });

  describe("组合测试", function() {
    it("应该能够链式处理字符串", function() {
      // 首先大写，然后反转
      const capitalized = StringUtils.capitalize("hello");
      const reversed = StringUtils.reverse(capitalized);
      
      expect(reversed).toBe("olleH");
    });

    it("应该正确处理复杂的字符串操作", function() {
      const text = "  Hello World  ";
      const wordCount = StringUtils.wordCount(text);
      const truncated = StringUtils.truncate(text.trim(), 8);
      
      expect(wordCount).toBe(2);
      expect(truncated).toBe("Hello...");
    });
  });

  describe("性能测试", function() {
    it("应该能处理长字符串", function() {
      const longString = "a".repeat(10000);
      const result = StringUtils.reverse(longString);
      
      expect(result.length).toBe(10000);
      expect(result[0]).toBe("a");
    });

    it("应该能处理大量单词", function() {
      const manyWords = "word ".repeat(1000).trim();
      const count = StringUtils.wordCount(manyWords);
      
      expect(count).toBe(1000);
    });
  });
});

