// 模拟用户服务
class UserService {
  constructor() {
    this.users = [];
  }

  // 添加用户
  addUser(user) {
    if (!user.name || !user.email) {
      throw new Error('Name and email are required');
    }
    const newUser = {
      id: this.users.length + 1,
      ...user,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  // 获取用户
  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  // 获取所有用户
  getAllUsers() {
    return [...this.users];
  }

  // 更新用户
  updateUser(id, updates) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }

  // 删除用户
  deleteUser(id) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.users.splice(userIndex, 1);
    return true;
  }

  // 清空所有用户
  clear() {
    this.users = [];
  }
}

module.exports = UserService;

