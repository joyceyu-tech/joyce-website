#!/usr/bin/env node
/**
 * 安装 Git 提交前钩子：每次 git commit 前自动执行 npm run build，
 * 并把生成的 index.html、translations.js 加入本次提交，这样不用再手动跑构建。
 *
 * 用法：npm run hook:install（只需执行一次）
 */

const fs = require('fs');
const path = require('path');

const gitDir = path.join(__dirname, '..', '.git');
const hooksDir = path.join(gitDir, 'hooks');
const hookPath = path.join(hooksDir, 'pre-commit');

const hookContent = `#!/bin/sh
# 由 npm run hook:install 安装，修改 content.json 后提交时会自动构建并纳入生成文件
npm run build
git add index.html translations.js
`;

if (!fs.existsSync(gitDir)) {
  console.log('当前目录不是 Git 仓库，跳过安装。');
  process.exit(0);
}

if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir, { recursive: true });
}

fs.writeFileSync(hookPath, hookContent, 'utf8');
try {
  fs.chmodSync(hookPath, 0o755);
} catch (_) {}

console.log('✓ 已安装 Git 提交前钩子：之后每次 git commit 会自动执行 npm run build 并把生成文件加入提交。');
console.log('  若不需要，可删除 .git/hooks/pre-commit');
