# Jasmine Demo

这是一个使用 Jasmine 测试框架的 JavaScript 单元测试示例项目。

## 📋 目录

- [项目简介](#项目简介)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [运行测试](#运行测试)
- [编写测试](#编写测试)
- [CI/CD](#cicd)
- [配置说明](#配置说明)
- [常见问题](#常见问题)

## 项目简介

本项目演示了如何使用 Jasmine 进行 JavaScript 单元测试，包括：
- ✅ **80+ 测试用例** 涵盖各种测试场景
- 🧮 **数学运算测试** - 基本运算、浮点数精度、异常处理
- 👥 **CRUD 操作测试** - 用户服务的增删改查
- ⚡ **异步测试** - Promise、async/await、并发处理
- 📝 **字符串处理测试** - 边界条件、性能测试
- 🎭 **Spy 和 Mock** - 函数跟踪、依赖注入、API 模拟
- 🔄 **CI/CD 自动化** - GitHub Actions 多版本测试
- 📖 **最佳实践** - 完整的测试套件结构示例

## 技术栈

- **测试框架**: Jasmine 5.12.0
- **运行环境**: Node.js (18.x, 20.x, 22.x)
- **CI/CD**: GitHub Actions

## 快速开始

### 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 运行测试

```bash
npm test
```

## 项目结构

```
jasmine-demo/
├── .github/
│   └── workflows/
│       └── test.yml              # GitHub Actions 工作流配置
├── src/                          # 源代码目录
│   ├── calculator.js             # 计算器类
│   ├── userService.js            # 用户服务类
│   ├── asyncService.js           # 异步服务类
│   └── stringUtils.js            # 字符串工具函数
├── spec/                         # 测试目录
│   ├── support/
│   │   └── jasmine.mjs           # Jasmine 配置文件
│   ├── sampleSpec.js             # 基础示例测试
│   ├── calculatorSpec.js         # 计算器测试（数学运算、异常处理）
│   ├── userServiceSpec.js        # 用户服务测试（CRUD 操作）
│   ├── asyncServiceSpec.js       # 异步测试（Promise、async/await）
│   ├── stringUtilsSpec.js        # 字符串工具测试（边界条件、性能）
│   └── spyMockSpec.js            # Spy 和 Mock 测试
├── package.json                  # 项目依赖配置
└── README.md                     # 项目说明文档
```

## 运行测试

### 本地运行

```bash
# 运行所有测试（80+ 测试用例）
npm test

# 使用 Jasmine CLI 运行特定测试文件
npx jasmine spec/calculatorSpec.js
npx jasmine spec/userServiceSpec.js
npx jasmine spec/asyncServiceSpec.js
npx jasmine spec/stringUtilsSpec.js
npx jasmine spec/spyMockSpec.js

# 运行测试并显示详细输出
npx jasmine --reporter=verbose

# 使用特定随机种子运行测试（用于重现问题）
npx jasmine --random=true --seed=06335
```

### 测试覆盖范围

本项目包含 **80+ 个测试用例**，涵盖以下类型：

| 测试文件 | 测试数量 | 测试内容 |
|---------|---------|----------|
| `calculatorSpec.js` | 12 | 数学运算、浮点数精度、异常处理 |
| `userServiceSpec.js` | 20 | CRUD 操作、边界条件、数据验证 |
| `asyncServiceSpec.js` | 13 | Promise、async/await、并发、超时 |
| `stringUtilsSpec.js` | 25 | 字符串操作、边界条件、性能测试 |
| `spyMockSpec.js` | 19 | Spy 跟踪、Mock 对象、依赖注入 |
| `sampleSpec.js` | 1 | 基础示例 |

### 测试结果示例

```
Randomized with seed 06335
Started
................................................................................

80 specs, 0 failures
Finished in 0.531 seconds
```

### 监视模式

虽然 Jasmine 本身不提供 watch 模式，但您可以使用 nodemon：

```bash
# 安装 nodemon
npm install --save-dev nodemon

# 监视文件变化并自动运行测试
npx nodemon --exec "npm test"
```

## 编写测试

### 基本测试结构

Jasmine 使用 BDD（行为驱动开发）风格的语法：

```javascript
describe("测试套件名称", function() {
  // 在每个测试之前执行
  beforeEach(function() {
    // 设置代码
  });

  // 在每个测试之后执行
  afterEach(function() {
    // 清理代码
  });

  it("测试用例描述", function() {
    // 准备 (Arrange)
    const value = 1 + 1;
    
    // 断言 (Assert)
    expect(value).toBe(2);
  });
});
```

### 常用匹配器

```javascript
// 相等性
expect(value).toBe(expected);           // 严格相等 (===)
expect(value).toEqual(expected);        // 深度相等
expect(value).not.toBe(unexpected);     // 取反

// 真值
expect(value).toBeTruthy();             // 真值
expect(value).toBeFalsy();              // 假值
expect(value).toBeNull();               // null
expect(value).toBeUndefined();          // undefined
expect(value).toBeDefined();            // 已定义

// 数字比较
expect(value).toBeGreaterThan(3);       // 大于
expect(value).toBeLessThan(5);          // 小于
expect(value).toBeCloseTo(4.2, 1);      // 接近（浮点数）

// 字符串
expect(string).toContain("substring");   // 包含子串
expect(string).toMatch(/pattern/);       // 正则匹配

// 数组和集合
expect(array).toContain(element);        // 包含元素
expect(array.length).toBe(3);            // 长度检查

// 异常
expect(function() {
  throw new Error("错误");
}).toThrow();
expect(function() {
  throw new Error("特定错误");
}).toThrowError("特定错误");
```

### 异步测试

```javascript
// 使用 done 回调
it("异步测试 - 回调方式", function(done) {
  setTimeout(function() {
    expect(true).toBe(true);
    done();
  }, 100);
});

// 使用 Promise
it("异步测试 - Promise", function() {
  return fetchData().then(function(data) {
    expect(data).toBeDefined();
  });
});

// 使用 async/await
it("异步测试 - async/await", async function() {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

### Spy 和 Mock

```javascript
describe("Spy 示例", function() {
  it("跟踪函数调用", function() {
    const obj = {
      method: function() {}
    };
    
    spyOn(obj, 'method');
    obj.method('参数');
    
    expect(obj.method).toHaveBeenCalled();
    expect(obj.method).toHaveBeenCalledWith('参数');
  });

  it("伪造返回值", function() {
    const obj = {
      getValue: function() { return 42; }
    };
    
    spyOn(obj, 'getValue').and.returnValue(100);
    
    expect(obj.getValue()).toBe(100);
  });
});
```

## CI/CD

### GitHub Actions 工作流

项目配置了自动化测试工作流 (`.github/workflows/test.yml`)，会在以下情况下触发：

- **Push**: 推送到 `main`、`master` 或 `develop` 分支
- **Pull Request**: 针对上述分支的 PR
- **手动触发**: 通过 GitHub Actions 界面手动运行

工作流会在多个 Node.js 版本上运行测试：
- Node.js 18.x
- Node.js 20.x
- Node.js 22.x

### 查看测试结果

1. 进入 GitHub 仓库
2. 点击 "Actions" 标签
3. 选择相应的工作流运行记录
4. 查看测试结果和日志

## 配置说明

### Jasmine 配置 (`spec/support/jasmine.mjs`)

```javascript
export default {
  // 测试文件所在目录
  spec_dir: "spec",
  
  // 测试文件匹配模式
  spec_files: [
    "**/*[sS]pec.?(m)js"
  ],
  
  // 辅助文件
  helpers: [
    "helpers/**/*.?(m)js"
  ],
  
  // 环境配置
  env: {
    stopSpecOnExpectationFailure: false,  // 失败后继续运行
    random: true,                         // 随机顺序运行测试
    forbidDuplicateNames: true            // 禁止重复的测试名称
  }
}
```

### Package.json 脚本

```json
{
  "scripts": {
    "test": "jasmine"
  }
}
```

## 常见问题

### Q: 如何跳过某个测试？

```javascript
// 临时禁用测试
xit("这个测试会被跳过", function() {
  // 测试代码
});

// 禁用整个测试套件
xdescribe("这个套件会被跳过", function() {
  // 测试代码
});
```

### Q: 如何只运行特定的测试？

```javascript
// 只运行这个测试
fit("只运行这个测试", function() {
  // 测试代码
});

// 只运行这个套件
fdescribe("只运行这个套件", function() {
  // 测试代码
});
```

### Q: 如何设置测试超时时间？

```javascript
// 全局配置（在 jasmine.mjs 中）
export default {
  defaultTimeoutInterval: 10000  // 10 秒
}

// 单个测试
it("长时间运行的测试", function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  // 测试代码
}, 10000);
```

### Q: 测试失败时如何调试？

1. 使用 `console.log()` 输出调试信息
2. 在测试代码中设置断点（使用调试器）
3. 使用 `--reporter=verbose` 查看详细输出
4. 检查 Jasmine 的错误消息和堆栈跟踪

## 📚 资源链接

- [Jasmine 官方文档](https://jasmine.github.io/)
- [Jasmine API 参考](https://jasmine.github.io/api/edge/global)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

## 📝 许可证

ISC

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Happy Testing! 🎉**

