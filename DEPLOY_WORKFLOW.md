# Deployment Workflow

本仓库托管于 GitHub Pages，承载个人技术主页 [https://commingling.github.io](https://commingling.github.io)。

## 架构与部署模式

- **架构选型**：现代化纯静态架构（Modern Vanilla HTML5 + CSS3 + ES6），零外部庞杂构建依赖。
- **发布方式**：直接提交至 `main` 分支，GitHub Pages 自动检测并即时发布（通常 15~30 秒内生效）。
- **隐私合规**：全站内容遵循隐私保护规范，不含未经脱敏的真实个人与机构标识，不设第三方数据追踪。

## 日常更新步骤

1. **修改代码或样式**：
   - 首页内容：直接编辑 `index.html`
   - 全局样式与主题：直接编辑 `assets/style.css`
   - 交互与主题引擎：直接编辑 `assets/script.js`
   - 图标与资源：存放在 `assets/`

2. **本地预览测试**：
   ```bash
   python3 -m http.server 8000
   # 打开 http://localhost:8000 即可实时体验与验证
   ```

3. **提交并推送至 GitHub**：
   ```bash
   git add .
   git commit -m "docs: update profile and architecture highlights"
   git push origin main
   ```
