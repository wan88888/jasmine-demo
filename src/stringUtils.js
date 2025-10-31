// 字符串工具函数
const StringUtils = {
  // 反转字符串
  reverse(str) {
    return str.split('').reverse().join('');
  },

  // 首字母大写
  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  // 统计单词数
  wordCount(str) {
    if (!str || typeof str !== 'string') return 0;
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
  },

  // 截断字符串
  truncate(str, maxLength, suffix = '...') {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - suffix.length) + suffix;
  },

  // 判断是否为回文
  isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
  },

  // 驼峰转下划线
  camelToSnake(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
};

module.exports = StringUtils;

