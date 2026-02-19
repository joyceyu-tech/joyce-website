#!/usr/bin/env node
/**
 * 构建脚本：单一数据源 → 生成 index.html 和 translations.js
 * 
 * 数据源：content.json（唯一需要修改文案的地方）
 * 输出：index.html（内含英文内容，用于 SEO 和首屏）、translations.js（供运行时中英切换）
 * 
 * 用法：node build.js
 */

const fs = require('fs');
const path = require('path');

const CONTENT_PATH = path.join(__dirname, 'content.json');
const TEMPLATE_PATH = path.join(__dirname, 'index.template.html');
const INDEX_PATH = path.join(__dirname, 'index.html');
const TRANSLATIONS_PATH = path.join(__dirname, 'translations.js');

// 读取数据源
const content = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf8'));
const en = content.en;
const zh = content.zh;

// 1. 生成 translations.js
const translationsJs = `/**
 * 多语言翻译文件（由 build.js 从 content.json 自动生成）
 * 请勿直接修改此文件，修改 content.json 后运行 node build.js 重新生成
 */
const TRANSLATIONS = ${JSON.stringify({ en, zh }, null, 4)};
`;

fs.writeFileSync(TRANSLATIONS_PATH, translationsJs, 'utf8');
console.log('✓ 已生成 translations.js');

// 2. 生成 index.html（将英文内容注入模板）
let html = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// 替换占位符 {{meta|key}}、{{text|selector}}、{{html|selector}}
const placeholderRe = /\{\{(meta|text|html)\|([^}]+)\}\}/g;
html = html.replace(placeholderRe, (match, type, key) => {
  let value;
  if (type === 'meta') {
    value = en[key];
  } else {
    value = en[type] && en[type][key];
  }
  if (value === undefined) {
    console.warn(`⚠ 未找到内容: ${type}|${key}`);
    return match;
  }
  return value;
});

fs.writeFileSync(INDEX_PATH, html, 'utf8');
console.log('✓ 已生成 index.html');
console.log('');
console.log('构建完成！index.html 和 translations.js 已从 content.json 生成。');
