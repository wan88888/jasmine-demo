const UserService = require('../src/userService');

describe("UserService 测试套件", function() {
  let userService;

  beforeEach(function() {
    userService = new UserService();
  });

  afterEach(function() {
    userService.clear();
  });

  describe("添加用户", function() {
    it("应该成功添加用户", function() {
      const user = {
        name: "张三",
        email: "zhangsan@example.com",
        age: 25
      };

      const result = userService.addUser(user);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.name).toBe("张三");
      expect(result.email).toBe("zhangsan@example.com");
      expect(result.createdAt).toEqual(jasmine.any(Date));
    });

    it("缺少必填字段时应该抛出错误", function() {
      expect(function() {
        userService.addUser({ name: "张三" });
      }).toThrowError('Name and email are required');

      expect(function() {
        userService.addUser({ email: "test@example.com" });
      }).toThrowError('Name and email are required');
    });

    it("应该为每个用户分配唯一 ID", function() {
      const user1 = userService.addUser({
        name: "用户1",
        email: "user1@example.com"
      });
      const user2 = userService.addUser({
        name: "用户2",
        email: "user2@example.com"
      });

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
      expect(user1.id).not.toBe(user2.id);
    });
  });

  describe("获取用户", function() {
    beforeEach(function() {
      userService.addUser({ name: "测试用户1", email: "test1@example.com" });
      userService.addUser({ name: "测试用户2", email: "test2@example.com" });
    });

    it("应该根据 ID 获取用户", function() {
      const user = userService.getUser(1);
      
      expect(user).toBeDefined();
      expect(user.name).toBe("测试用户1");
      expect(user.email).toBe("test1@example.com");
    });

    it("获取不存在的用户应该返回 undefined", function() {
      const user = userService.getUser(999);
      expect(user).toBeUndefined();
    });

    it("应该获取所有用户", function() {
      const users = userService.getAllUsers();
      
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBe(2);
      expect(users[0].name).toBe("测试用户1");
      expect(users[1].name).toBe("测试用户2");
    });
  });

  describe("更新用户", function() {
    beforeEach(function() {
      userService.addUser({ name: "原始名称", email: "original@example.com" });
    });

    it("应该成功更新用户信息", function() {
      const updated = userService.updateUser(1, {
        name: "新名称",
        email: "new@example.com"
      });

      expect(updated.name).toBe("新名称");
      expect(updated.email).toBe("new@example.com");
      expect(updated.id).toBe(1); // ID 不应该改变
    });

    it("更新不存在的用户应该抛出错误", function() {
      expect(function() {
        userService.updateUser(999, { name: "新名称" });
      }).toThrowError('User not found');
    });

    it("应该支持部分更新", function() {
      const updated = userService.updateUser(1, { name: "只改名称" });
      
      expect(updated.name).toBe("只改名称");
      expect(updated.email).toBe("original@example.com"); // 邮箱保持不变
    });
  });

  describe("删除用户", function() {
    beforeEach(function() {
      userService.addUser({ name: "用户1", email: "user1@example.com" });
      userService.addUser({ name: "用户2", email: "user2@example.com" });
    });

    it("应该成功删除用户", function() {
      const result = userService.deleteUser(1);
      
      expect(result).toBe(true);
      expect(userService.getAllUsers().length).toBe(1);
      expect(userService.getUser(1)).toBeUndefined();
    });

    it("删除不存在的用户应该返回 false", function() {
      const result = userService.deleteUser(999);
      expect(result).toBe(false);
    });

    it("删除后列表应该更新", function() {
      userService.deleteUser(1);
      const users = userService.getAllUsers();
      
      expect(users.length).toBe(1);
      expect(users[0].id).toBe(2);
    });
  });

  describe("边界条件测试", function() {
    it("空服务应该返回空数组", function() {
      expect(userService.getAllUsers()).toEqual([]);
      expect(userService.getAllUsers().length).toBe(0);
    });

    it("清空操作应该移除所有用户", function() {
      userService.addUser({ name: "用户1", email: "user1@example.com" });
      userService.addUser({ name: "用户2", email: "user2@example.com" });
      
      userService.clear();
      
      expect(userService.getAllUsers().length).toBe(0);
    });
  });
});

