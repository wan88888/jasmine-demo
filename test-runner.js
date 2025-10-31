// 自定义测试运行器，用于生成 HTML 报告
const Jasmine = require('jasmine');
const path = require('path');
const fs = require('fs');

// 创建 Jasmine 实例
const jasmine = new Jasmine();

// 确保报告目录存在
const reportDir = path.resolve(__dirname, 'test-reports');
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

// 加载 Jasmine 配置
jasmine.loadConfigFile(path.resolve(__dirname, 'spec/support/jasmine.json'));

// 自定义 HTML Reporter
const testResults = {
  suites: [],
  specs: [],
  startTime: null,
  endTime: null,
  totalSpecs: 0,
  passedSpecs: 0,
  failedSpecs: 0
};

const htmlReporter = {
  jasmineStarted: function(suiteInfo) {
    testResults.startTime = new Date();
    testResults.totalSpecs = suiteInfo.totalSpecsDefined;
    console.log('Running ' + suiteInfo.totalSpecsDefined + ' specs...\n');
  },
  
  suiteStarted: function(result) {
    testResults.suites.push({
      id: result.id,
      description: result.description,
      fullName: result.fullName,
      specs: []
    });
  },
  
  specDone: function(result) {
    testResults.specs.push(result);
    if (result.status === 'passed') {
      testResults.passedSpecs++;
      process.stdout.write('.');
    } else if (result.status === 'failed') {
      testResults.failedSpecs++;
      process.stdout.write('F');
    } else {
      process.stdout.write('*');
    }
  },
  
  jasmineDone: function() {
    testResults.endTime = new Date();
    const duration = (testResults.endTime - testResults.startTime) / 1000;
    
    console.log('\n\n' + testResults.totalSpecs + ' specs, ' + testResults.failedSpecs + ' failures');
    console.log('Finished in ' + duration + ' seconds\n');
    
    // 生成 HTML 报告
    const htmlContent = generateHtmlReport(testResults, duration);
    const reportPath = path.join(reportDir, 'index.html');
    fs.writeFileSync(reportPath, htmlContent);
    
    console.log('========================================');
    console.log('✅ HTML 测试报告已生成！');
    console.log('📁 位置: ' + reportPath);
    console.log('🌐 打开命令: open test-reports/index.html');
    console.log('========================================\n');
  }
};

function generateHtmlReport(results, duration) {
  const passRate = ((results.passedSpecs / results.totalSpecs) * 100).toFixed(2);
  
  const specRows = results.specs.map(spec => {
    const status = spec.status === 'passed' ? 'passed' : 'failed';
    const statusIcon = spec.status === 'passed' ? '✓' : '✗';
    const failureDetails = spec.status === 'failed' ? 
      `<div class="failure-details">${spec.failedExpectations.map(f => 
        `<div class="error-message">${f.message}</div>
         <pre class="error-stack">${f.stack}</pre>`
      ).join('')}</div>` : '';
    
    return `
      <tr class="${status}">
        <td><span class="status-icon ${status}">${statusIcon}</span></td>
        <td>${spec.fullName}</td>
        <td>${spec.status}</td>
        <td>${spec.duration || 0}ms</td>
      </tr>
      ${failureDetails ? `<tr class="failure-row"><td colspan="4">${failureDetails}</td></tr>` : ''}
    `;
  }).join('');
  
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jasmine 测试报告</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    .header .subtitle {
      font-size: 1.1em;
      opacity: 0.9;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding: 30px;
      background: #f8f9fa;
    }
    .summary-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .summary-card .number {
      font-size: 2.5em;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .summary-card .label {
      color: #666;
      font-size: 0.9em;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .summary-card.total .number { color: #667eea; }
    .summary-card.passed .number { color: #10b981; }
    .summary-card.failed .number { color: #ef4444; }
    .summary-card.rate .number { color: #3b82f6; }
    .summary-card.duration .number { font-size: 2em; }
    .results {
      padding: 30px;
    }
    .results h2 {
      font-size: 1.8em;
      margin-bottom: 20px;
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    thead {
      background: #f8f9fa;
    }
    th {
      padding: 15px;
      text-align: left;
      font-weight: 600;
      color: #555;
      border-bottom: 2px solid #e5e7eb;
    }
    td {
      padding: 15px;
      border-bottom: 1px solid #e5e7eb;
    }
    tr.passed td {
      background: #f0fdf4;
    }
    tr.failed td {
      background: #fef2f2;
    }
    tr:hover td {
      background: #f9fafb;
    }
    .status-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 50%;
      font-weight: bold;
    }
    .status-icon.passed {
      background: #10b981;
      color: white;
    }
    .status-icon.failed {
      background: #ef4444;
      color: white;
    }
    .failure-details {
      margin: 10px 0;
      padding: 15px;
      background: #fff5f5;
      border-left: 4px solid #ef4444;
      border-radius: 4px;
    }
    .error-message {
      color: #dc2626;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .error-stack {
      background: #1f2937;
      color: #f3f4f6;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 0.85em;
      line-height: 1.5;
    }
    .failure-row td {
      padding: 0 15px 15px 15px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background: #f8f9fa;
      color: #666;
      font-size: 0.9em;
    }
    .timestamp {
      margin-top: 10px;
      font-size: 0.85em;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🧪 Jasmine 测试报告</h1>
      <div class="subtitle">完整的测试执行结果</div>
      <div class="timestamp">生成时间: ${results.endTime.toLocaleString('zh-CN')}</div>
    </div>
    
    <div class="summary">
      <div class="summary-card total">
        <div class="number">${results.totalSpecs}</div>
        <div class="label">总测试数</div>
      </div>
      <div class="summary-card passed">
        <div class="number">${results.passedSpecs}</div>
        <div class="label">通过</div>
      </div>
      <div class="summary-card failed">
        <div class="number">${results.failedSpecs}</div>
        <div class="label">失败</div>
      </div>
      <div class="summary-card rate">
        <div class="number">${passRate}%</div>
        <div class="label">通过率</div>
      </div>
      <div class="summary-card duration">
        <div class="number">${duration.toFixed(2)}s</div>
        <div class="label">执行时间</div>
      </div>
    </div>
    
    <div class="results">
      <h2>📋 测试详情</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 50px;">状态</th>
            <th>测试用例</th>
            <th style="width: 100px;">结果</th>
            <th style="width: 100px;">耗时</th>
          </tr>
        </thead>
        <tbody>
          ${specRows}
        </tbody>
      </table>
    </div>
    
    <div class="footer">
      <div>Powered by Jasmine Testing Framework</div>
      <div>测试报告 | Jasmine Demo Project</div>
    </div>
  </div>
</body>
</html>
  `;
}

// 添加 reporter
jasmine.addReporter(htmlReporter);

// 运行测试
jasmine.execute();
