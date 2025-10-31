// 模拟异步服务
class AsyncService {
  // 模拟异步获取数据
  fetchData(delay = 100) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: 'Success', timestamp: Date.now() });
      }, delay);
    });
  }

  // 模拟异步失败
  fetchWithError(shouldFail = true) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('Failed to fetch data'));
        } else {
          resolve({ data: 'Success' });
        }
      }, 50);
    });
  }

  // 模拟 API 调用
  async getUserData(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 50));
    
    return {
      id: userId,
      name: `User ${userId}`,
      email: `user${userId}@example.com`
    };
  }

  // 模拟批量操作
  async batchProcess(items) {
    const results = [];
    for (const item of items) {
      await new Promise(resolve => setTimeout(resolve, 10));
      results.push(item * 2);
    }
    return results;
  }
}

module.exports = AsyncService;

