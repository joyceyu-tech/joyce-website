#!/usr/bin/env node
/**
 * 构建脚本：单一数据源 → 生成 index.html 和 translations.js
 *
 * 数据源：content.json（文案 + portfolioProjects 项目列表）
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

const GITEE_ICON_SVG = `<svg viewBox="0 0 1024 1024" width="16" height="16" aria-hidden="true">
                                <path fill="#C71D23" d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z"/>
                            </svg>`;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function assertPortfolioProject(project, index, categoryIds = null) {
  const prefix = `portfolioProjects[${index}]`;
  if (!project.slug || !/^[a-z0-9-]+$/.test(project.slug)) {
    throw new Error(`${prefix}: slug 必填，且只能包含小写字母、数字、连字符`);
  }
  if (categoryIds && (!project.category || !categoryIds.has(project.category))) {
    throw new Error(`${prefix}: category 必须匹配 portfolioProjectCategories 中的 id`);
  }
  ['image', 'giteeUrl'].forEach((k) => {
    if (!project[k]) throw new Error(`${prefix}: 缺少 ${k}`);
  });
  ['en', 'zh'].forEach((lang) => {
    if (!project.title?.[lang] || !project.description?.[lang]) {
      throw new Error(`${prefix}: title.${lang} / description.${lang} 必填`);
    }
    if (!project.featuresHeading?.[lang]) {
      throw new Error(`${prefix}: featuresHeading.${lang} 必填`);
    }
    if (!Array.isArray(project.features?.[lang]) || project.features[lang].length === 0) {
      throw new Error(`${prefix}: features.${lang} 必须为非空数组`);
    }
    if (!project.linkLabel?.[lang]) {
      throw new Error(`${prefix}: linkLabel.${lang} 必填`);
    }
    if (!project.imageAlt?.[lang]) {
      throw new Error(`${prefix}: imageAlt.${lang} 必填`);
    }
  });
  if (!Array.isArray(project.techTags) || project.techTags.length === 0) {
    throw new Error(`${prefix}: techTags 必须为非空数组`);
  }
  if (project.features.en.length !== project.features.zh.length) {
    throw new Error(`${prefix}: features.en 与 features.zh 条数须一致`);
  }
  if (project.video) {
    if (!project.video.src) {
      throw new Error(`${prefix}: video.src 必填`);
    }
    ['label', 'caption'].forEach((key) => {
      if (project.video[key] && (!project.video[key].en || !project.video[key].zh)) {
        throw new Error(`${prefix}: video.${key}.en / video.${key}.zh 必须同时填写`);
      }
    });
  }
  if (project.architecture) {
    ['en', 'zh'].forEach((lang) => {
      if (!project.architecture.heading?.[lang] || !project.architecture.intro?.[lang]) {
        throw new Error(`${prefix}: architecture.heading.${lang} / architecture.intro.${lang} 必填`);
      }
    });
    if (!Array.isArray(project.architecture.diagrams) || project.architecture.diagrams.length === 0) {
      throw new Error(`${prefix}: architecture.diagrams 必须为非空数组`);
    }
    project.architecture.diagrams.forEach((diagram, diagramIndex) => {
      const diagramPrefix = `${prefix}.architecture.diagrams[${diagramIndex}]`;
      if (!diagram.image) throw new Error(`${diagramPrefix}: image 必填`);
      ['en', 'zh'].forEach((lang) => {
        if (!diagram.title?.[lang] || !diagram.caption?.[lang] || !diagram.alt?.[lang]) {
          throw new Error(`${diagramPrefix}: title.${lang} / caption.${lang} / alt.${lang} 必填`);
        }
      });
    });
  }
}

function getVideoType(src) {
  const extension = String(src).split('?')[0].split('#')[0].split('.').pop().toLowerCase();
  const types = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogv: 'video/ogg',
    ogg: 'video/ogg',
    mov: 'video/quicktime'
  };
  return types[extension] || '';
}

/**
 * @returns {{ gridHtmlEn: string, enTextExtra: Record<string,string>, zhTextExtra: Record<string,string> }}
 */
function buildPortfolioOutput(projects, categories) {
  if (!Array.isArray(projects)) {
    projects = [];
  }
  if (!Array.isArray(categories)) {
    categories = [];
  }
  const enTextExtra = {};
  const zhTextExtra = {};
  const categoryHtmlParts = [];
  const categoryIds = new Set(categories.map((category) => category.id));
  const projectCardsByCategory = new Map(categories.map((category) => [category.id, []]));

  projects.forEach((project, index) => {
    assertPortfolioProject(project, index, categoryIds);
    const slug = project.slug;
    const sel = `#projects .project-card[data-project-slug="${slug}"]`;

    enTextExtra[`${sel} .project-content h3`] = project.title.en;
    enTextExtra[`${sel} .project-description`] = project.description.en;
    enTextExtra[`${sel} .project-features h4`] = project.featuresHeading.en;
    project.features.en.forEach((line, i) => {
      enTextExtra[`${sel} .project-features li:nth-child(${i + 1})`] = line;
    });
    enTextExtra[`${sel} .btn-primary .btn-label`] = project.linkLabel.en;

    zhTextExtra[`${sel} .project-content h3`] = project.title.zh;
    zhTextExtra[`${sel} .project-description`] = project.description.zh;
    zhTextExtra[`${sel} .project-features h4`] = project.featuresHeading.zh;
    project.features.zh.forEach((line, i) => {
      zhTextExtra[`${sel} .project-features li:nth-child(${i + 1})`] = line;
    });
    zhTextExtra[`${sel} .btn-primary .btn-label`] = project.linkLabel.zh;
    if (project.architecture) {
      enTextExtra[`${sel} .project-architecture-heading`] = project.architecture.heading.en;
      enTextExtra[`${sel} .project-architecture-intro`] = project.architecture.intro.en;
      zhTextExtra[`${sel} .project-architecture-heading`] = project.architecture.heading.zh;
      zhTextExtra[`${sel} .project-architecture-intro`] = project.architecture.intro.zh;

      project.architecture.diagrams.forEach((diagram, i) => {
        const diagramSel = `${sel} .project-architecture-figure:nth-child(${i + 1})`;
        enTextExtra[`${diagramSel} .project-architecture-title`] = diagram.title.en;
        enTextExtra[`${diagramSel} .project-architecture-caption`] = diagram.caption.en;
        zhTextExtra[`${diagramSel} .project-architecture-title`] = diagram.title.zh;
        zhTextExtra[`${diagramSel} .project-architecture-caption`] = diagram.caption.zh;
      });
    }

    const techStackInner = project.techTags
      .map((t) => `                        <span class="tech-tag">${escapeHtml(t)}</span>`)
      .join('\n');
    const featuresUlInner = project.features.en
      .map((line) => `                            <li>${escapeHtml(line)}</li>`)
      .join('\n');

    const responsiveImageAttrs = project.mobileImage
      ? ` srcset="${escapeHtml(project.mobileImage)} 640w, ${escapeHtml(project.image)} 1280w" sizes="(max-width: 768px) 100vw, 50vw"`
      : '';
    const videoPoster = project.video?.poster || project.image;
    const videoType = project.video ? getVideoType(project.video.src) : '';
    const videoTypeAttr = videoType ? ` type="${escapeHtml(videoType)}"` : '';
    const mediaHtml = project.video
      ? `                <div class="project-image project-media project-media-video">
                    <video class="project-demo-video" controls preload="auto" poster="${escapeHtml(videoPoster)}" aria-label="${escapeHtml(project.title.en)} demo video">
                        <source src="${escapeHtml(project.video.src)}"${videoTypeAttr}>
                        Your browser does not support embedded videos.
                    </video>
                </div>`
      : `                <div class="project-image project-image-ratio-3x2 project-media">
                    <img src="${escapeHtml(project.image)}"${responsiveImageAttrs} alt="${escapeHtml(project.imageAlt.en)}" loading="lazy" decoding="async">
                </div>`;
    const architectureHtml = project.architecture
      ? `                    <div class="project-architecture">
                        <div class="project-architecture-copy">
                            <h4 class="project-architecture-heading">${escapeHtml(project.architecture.heading.en)}</h4>
                            <p class="project-architecture-intro">${escapeHtml(project.architecture.intro.en)}</p>
                        </div>
                        <div class="project-architecture-grid">
${project.architecture.diagrams.map((diagram) => `                            <figure class="project-architecture-figure">
                                <img src="${escapeHtml(diagram.image)}" alt="${escapeHtml(diagram.alt.en)}" loading="lazy" decoding="async">
                                <figcaption>
                                    <strong class="project-architecture-title">${escapeHtml(diagram.title.en)}</strong>
                                    <span class="project-architecture-caption">${escapeHtml(diagram.caption.en)}</span>
                                </figcaption>
                            </figure>`).join('\n')}
                        </div>
                    </div>
`
      : '';

    const cardHtml = `                    <div class="project-card" data-project-slug="${escapeHtml(slug)}">
${mediaHtml}
                <div class="project-content">
                    <h3>${escapeHtml(project.title.en)}</h3>
                    <p class="project-description">${escapeHtml(project.description.en)}</p>
                    <div class="tech-stack">
${techStackInner}
                    </div>
                    <div class="project-features">
                        <h4>${escapeHtml(project.featuresHeading.en)}</h4>
                        <ul>
${featuresUlInner}
                        </ul>
                    </div>
${architectureHtml}                    <div class="project-links">
                        <a href="${escapeHtml(project.giteeUrl)}" class="btn-primary" target="_blank" rel="noopener noreferrer">
                            ${GITEE_ICON_SVG}
                            <span class="btn-label">${escapeHtml(project.linkLabel.en)}</span>
                        </a>
                    </div>
                </div>
            </div>`;
    projectCardsByCategory.get(project.category).push(cardHtml);
  });

  categories.forEach((category) => {
    if (!category.id || !/^[a-z0-9-]+$/.test(category.id)) {
      throw new Error('portfolioProjectCategories: id 必填，且只能包含小写字母、数字、连字符');
    }
    ['en', 'zh'].forEach((lang) => {
      if (!category.title?.[lang] || !category.description?.[lang]) {
        throw new Error(`portfolioProjectCategories[${category.id}]: title.${lang} / description.${lang} 必填`);
      }
    });

    const categorySel = `#projects .project-category[data-project-category="${category.id}"]`;
    enTextExtra[`${categorySel} .project-category-title`] = category.title.en;
    enTextExtra[`${categorySel} .project-category-description`] = category.description.en;
    zhTextExtra[`${categorySel} .project-category-title`] = category.title.zh;
    zhTextExtra[`${categorySel} .project-category-description`] = category.description.zh;

    const cards = projectCardsByCategory.get(category.id) || [];
    if (cards.length === 0) return;

    categoryHtmlParts.push(`        <section class="project-category" data-project-category="${escapeHtml(category.id)}" aria-labelledby="project-category-${escapeHtml(category.id)}">
            <div class="project-category-header">
                <h3 class="project-category-title" id="project-category-${escapeHtml(category.id)}">${escapeHtml(category.title.en)}</h3>
                <p class="project-category-description">${escapeHtml(category.description.en)}</p>
            </div>
            <div class="projects-grid">
${cards.join('\n\n')}
            </div>
        </section>`);
  });

  const gridHtmlEn = categoryHtmlParts.join('\n\n');
  return { gridHtmlEn, enTextExtra, zhTextExtra };
}

const content = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf8'));
const projects = content.portfolioProjects || [];
const categories = content.portfolioProjectCategories || [];
const { gridHtmlEn, enTextExtra, zhTextExtra } = buildPortfolioOutput(projects, categories);

const en = {
  ...content.en,
  text: { ...content.en.text, ...enTextExtra },
};
const zh = {
  ...content.zh,
  text: { ...content.zh.text, ...zhTextExtra },
};

const translationsJs = `/**
 * 多语言翻译文件（由 build.js 从 content.json 自动生成）
 * 请勿直接修改此文件，修改 content.json 后运行 node build.js 重新生成
 */
const TRANSLATIONS = ${JSON.stringify({ en, zh }, null, 4)};
`;

fs.writeFileSync(TRANSLATIONS_PATH, translationsJs, 'utf8');
console.log('✓ 已生成 translations.js');

let html = fs.readFileSync(TEMPLATE_PATH, 'utf8');

const placeholderRe = /\{\{(meta|text|html|inject)\|([^}]+)\}\}/g;
html = html.replace(placeholderRe, (match, type, key) => {
  if (type === 'inject') {
    if (key === 'portfolioProjectsGrid') {
      return gridHtmlEn;
    }
    console.warn(`⚠ 未处理的 inject: ${key}`);
    return match;
  }
  let value;
  if (type === 'meta') {
    value = content.en[key];
  } else {
    value = content.en[type] && content.en[type][key];
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
