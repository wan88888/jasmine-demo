const AsyncService = require('../src/asyncService');

describe("AsyncService 异步测试套件", function() {
  let asyncService;

  beforeEach(function() {
    asyncService = new AsyncService();
  });

  describe("Promise 测试", function() {
    it("应该成功获取数据 - Promise 方式", function(done) {
      asyncService.fetchData().then(function(result) {
        expect(result).toBeDefined();
        expect(result.data).toBe('Success');
        expect(result.timestamp).toEqual(jasmine.any(Number));
        done();
      }).catch(function(error) {
        done.fail(error);
      });
    });

    it("应该处理异步错误", function(done) {
      asyncService.fetchWithError(true).then(function() {
        done.fail('应该抛出错误');
      }).catch(function(error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Failed to fetch data');
        done();
      });
    });

    it("成功时不应该抛出错误", function(done) {
      asyncService.fetchWithError(false).then(function(result) {
        expect(result.data).toBe('Success');
        done();
      }).catch(function(error) {
        done.fail(error);
      });
    });
  });

  describe("Async/Await 测试", function() {
    it("应该使用 async/await 获取用户数据", async function() {
      const userData = await asyncService.getUserData(1);
      
      expect(userData).toBeDefined();
      expect(userData.id).toBe(1);
      expect(userData.name).toBe('User 1');
      expect(userData.email).toContain('@example.com');
    });

    it("缺少用户 ID 应该抛出错误", async function() {
      try {
        await asyncService.getUserData();
        fail('应该抛出错误');
      } catch (error) {
        expect(error.message).toBe('User ID is required');
      }
    });

    it("应该处理批量异步操作", async function() {
      const items = [1, 2, 3, 4, 5];
      const results = await asyncService.batchProcess(items);
      
      expect(results).toEqual([2, 4, 6, 8, 10]);
      expect(results.length).toBe(5);
    });
  });

  describe("超时测试", function() {
    beforeEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    });

    it("应该在合理时间内完成", async function() {
      const startTime = Date.now();
      await asyncService.fetchData(100);
      const duration = Date.now() - startTime;
      
      expect(duration).toBeGreaterThanOrEqual(100);
      expect(duration).toBeLessThan(200); // 允许一些误差
    });
  });

  describe("并发测试", function() {
    it("应该处理多个并发请求", async function() {
      const promises = [
        asyncService.getUserData(1),
        asyncService.getUserData(2),
        asyncService.getUserData(3)
      ];
      
      const results = await Promise.all(promises);
      
      expect(results.length).toBe(3);
      expect(results[0].id).toBe(1);
      expect(results[1].id).toBe(2);
      expect(results[2].id).toBe(3);
    });

    it("应该处理部分失败的情况", async function() {
      const promises = [
        asyncService.fetchWithError(false),
        asyncService.fetchWithError(true),
        asyncService.fetchWithError(false)
      ];
      
      try {
        await Promise.all(promises);
        fail('应该有一个 Promise 失败');
      } catch (error) {
        expect(error.message).toBe('Failed to fetch data');
      }
    });
  });
});

