// Spy 和 Mock 测试示例
describe("Spy 和 Mock 测试套件", function() {
  
  describe("基本 Spy 用法", function() {
    it("应该跟踪函数调用", function() {
      const obj = {
        method: function() {
          return "original value";
        }
      };

      spyOn(obj, 'method');
      obj.method('参数1', '参数2');

      expect(obj.method).toHaveBeenCalled();
      expect(obj.method).toHaveBeenCalledTimes(1);
      expect(obj.method).toHaveBeenCalledWith('参数1', '参数2');
    });

    it("应该跟踪多次调用", function() {
      const calculator = {
        add: function(a, b) { return a + b; }
      };

      spyOn(calculator, 'add');
      
      calculator.add(1, 2);
      calculator.add(3, 4);
      calculator.add(5, 6);

      expect(calculator.add).toHaveBeenCalledTimes(3);
      expect(calculator.add.calls.count()).toBe(3);
    });

    it("应该获取调用参数", function() {
      const obj = {
        log: function(message) {}
      };

      spyOn(obj, 'log');
      
      obj.log('第一条消息');
      obj.log('第二条消息');

      expect(obj.log.calls.argsFor(0)).toEqual(['第一条消息']);
      expect(obj.log.calls.argsFor(1)).toEqual(['第二条消息']);
    });
  });

  describe("Spy 返回值控制", function() {
    it("应该返回指定值", function() {
      const service = {
        getData: function() { return "original"; }
      };

      spyOn(service, 'getData').and.returnValue('mocked data');

      expect(service.getData()).toBe('mocked data');
      expect(service.getData).toHaveBeenCalled();
    });

    it("应该返回多个不同的值", function() {
      const service = {
        getValue: function() {}
      };

      spyOn(service, 'getValue').and.returnValues('first', 'second', 'third');

      expect(service.getValue()).toBe('first');
      expect(service.getValue()).toBe('second');
      expect(service.getValue()).toBe('third');
    });

    it("应该调用伪造的实现", function() {
      const calculator = {
        multiply: function(a, b) { return a * b; }
      };

      spyOn(calculator, 'multiply').and.callFake(function(a, b) {
        return a + b; // 改为加法
      });

      expect(calculator.multiply(2, 3)).toBe(5); // 2+3=5 而不是 2*3=6
    });

    it("应该调用原始实现", function() {
      const obj = {
        method: function() { return "original"; }
      };

      spyOn(obj, 'method').and.callThrough();

      expect(obj.method()).toBe("original");
      expect(obj.method).toHaveBeenCalled();
    });
  });

  describe("Spy 错误处理", function() {
    it("应该抛出错误", function() {
      const service = {
        riskyOperation: function() {}
      };

      spyOn(service, 'riskyOperation').and.throwError('Operation failed');

      expect(function() {
        service.riskyOperation();
      }).toThrowError('Operation failed');
    });
  });

  describe("独立 Spy（createSpy）", function() {
    it("应该创建独立的 spy 函数", function() {
      const mySpy = jasmine.createSpy('mySpy');

      mySpy('arg1', 'arg2');

      expect(mySpy).toHaveBeenCalled();
      expect(mySpy).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it("独立 spy 应该有返回值", function() {
      const mySpy = jasmine.createSpy('mySpy').and.returnValue('spy result');

      expect(mySpy()).toBe('spy result');
    });
  });

  describe("Spy 对象（createSpyObj）", function() {
    it("应该创建具有多个 spy 方法的对象", function() {
      const mockService = jasmine.createSpyObj('UserService', [
        'getUser',
        'saveUser',
        'deleteUser'
      ]);

      mockService.getUser.and.returnValue({ id: 1, name: 'Test User' });
      mockService.saveUser.and.returnValue(true);

      const user = mockService.getUser(1);
      const saved = mockService.saveUser(user);

      expect(user.name).toBe('Test User');
      expect(saved).toBe(true);
      expect(mockService.getUser).toHaveBeenCalledWith(1);
      expect(mockService.saveUser).toHaveBeenCalledWith(user);
    });

    it("应该创建带属性的 spy 对象", function() {
      const mockConfig = jasmine.createSpyObj(
        'Config',
        ['get', 'set'],
        { apiUrl: 'https://api.example.com' }
      );

      mockConfig.get.and.returnValue('some-value');

      expect(mockConfig.apiUrl).toBe('https://api.example.com');
      expect(mockConfig.get()).toBe('some-value');
    });
  });

  describe("Spy 重置", function() {
    it("应该重置所有调用", function() {
      const obj = {
        method: function() {}
      };

      spyOn(obj, 'method');
      
      obj.method();
      obj.method();
      expect(obj.method).toHaveBeenCalledTimes(2);

      obj.method.calls.reset();
      expect(obj.method).not.toHaveBeenCalled();

      obj.method();
      expect(obj.method).toHaveBeenCalledTimes(1);
    });
  });

  describe("实际使用场景 - 模拟 HTTP 请求", function() {
    it("应该模拟成功的 API 调用", function() {
      const httpClient = {
        get: function(url) {
          // 实际会发送 HTTP 请求
          return Promise.resolve({ data: 'real data' });
        }
      };

      spyOn(httpClient, 'get').and.returnValue(
        Promise.resolve({ data: 'mocked data', status: 200 })
      );

      return httpClient.get('/api/users').then(function(response) {
        expect(response.data).toBe('mocked data');
        expect(response.status).toBe(200);
        expect(httpClient.get).toHaveBeenCalledWith('/api/users');
      });
    });

    it("应该模拟失败的 API 调用", function(done) {
      const httpClient = {
        get: function(url) {}
      };

      spyOn(httpClient, 'get').and.returnValue(
        Promise.reject(new Error('Network error'))
      );

      httpClient.get('/api/users')
        .then(function() {
          done.fail('应该失败');
        })
        .catch(function(error) {
          expect(error.message).toBe('Network error');
          expect(httpClient.get).toHaveBeenCalled();
          done();
        });
    });
  });

  describe("实际使用场景 - 依赖注入", function() {
    function UserController(userService) {
      this.userService = userService;
      
      this.getUserName = function(id) {
        const user = this.userService.getUser(id);
        return user ? user.name : 'Unknown';
      };
    }

    it("应该使用 mock 服务测试控制器", function() {
      const mockUserService = jasmine.createSpyObj('UserService', ['getUser']);
      mockUserService.getUser.and.returnValue({ id: 1, name: '张三' });

      const controller = new UserController(mockUserService);
      const name = controller.getUserName(1);

      expect(name).toBe('张三');
      expect(mockUserService.getUser).toHaveBeenCalledWith(1);
    });

    it("应该处理用户不存在的情况", function() {
      const mockUserService = jasmine.createSpyObj('UserService', ['getUser']);
      mockUserService.getUser.and.returnValue(null);

      const controller = new UserController(mockUserService);
      const name = controller.getUserName(999);

      expect(name).toBe('Unknown');
      expect(mockUserService.getUser).toHaveBeenCalledWith(999);
    });
  });
});

