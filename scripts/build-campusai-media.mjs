/** CampusAI artwork source. Run with node scripts/build-campusai-media.mjs. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'images');
const W = 1600, H = 1000;
const c = { bg: '#edf3f3', ink: '#152f33', muted: '#5f7679', line: '#d6e2e2', teal: '#0f5257', mint: '#a3edd5', dark: '#102d31', white: '#ffffff' };
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const txt = (x,y,s,size=22,fill=c.ink,weight=400,extra='') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" ${extra}>${esc(s)}</text>`;
const rect = (x,y,w,h,fill='white',r=20,stroke='none') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const line = (x1,y1,x2,y2,color=c.line,width=1,extra='') => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${color}" stroke-width="${width}" fill="none" ${extra}/>`;
const pathLine = (d,color=c.teal,width=2,extra='') => `<path d="${d}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const dot = (x,y,r=4,fill=c.teal) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const mono = (x,y,s,size=15,fill=c.muted) => txt(x,y,s,size,fill,400,'font-family="SFMono-Regular, Menlo, monospace" letter-spacing="1"');
const chip = (x,y,label,w,fill='#e6f2ee',color=c.teal) => rect(x,y,w,34,fill,17)+txt(x+w/2,y+23,label,15,color,500,'text-anchor="middle"');
const arrow = (x1,y1,x2,y2,color=c.teal) => pathLine(`M${x1} ${y1}L${x2} ${y2}`,color,2,'marker-end="url(#arrow)"');
const brand = (x,y,size=34,dark=false) => `<g transform="translate(${x} ${y})">${rect(0,0,size,size,dark?c.mint:c.teal,size*.3)}${pathLine(`M${size*.69} ${size*.29}H${size*.43}Q${size*.26} ${size*.29} ${size*.26} ${size*.49}Q${size*.26} ${size*.71} ${size*.43} ${size*.71}H${size*.69}`,dark?c.dark:'white',size*.07)}${dot(size*.7,size*.51,size*.047,dark?c.dark:c.mint)}</g>`;
function icon(kind,x,y,color=c.teal,size=24){
  const icons={chat:'M3 4H21V17H10L5 21V17H3Z',doc:'M6 2H15L20 7V22H6ZM14 2V8H20M9 12H17M9 16H16',db:'M3 6C3 1 21 1 21 6V18C21 23 3 23 3 18ZM3 6C3 11 21 11 21 6M3 12C3 17 21 17 21 12',tool:'M8 4H4V8M16 4H20V8M4 16V20H8M20 16V20H16M9 9L6 12L9 15M15 9L18 12L15 15',search:'M17 17L22 22M19 10A8 8 0 1 1 3 10A8 8 0 1 1 19 10',layers:'M2 7L12 2L22 7L12 12ZM2 12L12 17L22 12M2 17L12 22L22 17',check:'M5 12L10 17L20 6',user:'M8 6A4 4 0 1 0 8 5.9M2 22V19Q2 13 8 13H12Q18 13 18 19V22',arrow:'M4 12H20M14 6L20 12L14 18',spark:'M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z'};
  return `<g transform="translate(${x} ${y}) scale(${size/24})" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${icons[kind]||icons.doc}"/></g>`;
}
const layer = (name,inner,at=0,style='up') => `<g data-layer="${name}" data-at="${at}" data-style="${style}">${inner}</g>`;
const defs = `<defs><linearGradient id="wash" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dcebe8"/><stop offset=".6" stop-color="#e9f1f2"/><stop offset="1" stop-color="#c3d7e5"/></linearGradient><radialGradient id="glow"><stop stop-color="#a3edd5" stop-opacity=".19"/><stop offset="1" stop-color="#a3edd5" stop-opacity="0"/></radialGradient><filter id="shadow" x="-20%" y="-20%" width="150%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#163c43" flood-opacity=".1"/></filter><marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto-start-reverse"><path d="M2 2L7 5L2 8" fill="none" stroke="#0f5257" stroke-width="1.3"/></marker></defs>`;
function svg(title,desc,body){return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>${defs}<g font-family="Geist, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif">${body}</g></svg>`;}
function header(no,kicker,title,sub){return layer('background',rect(0,0,W,H,c.bg,0)+rect(0,0,W,208,c.dark,0)+brand(58,35,34,true)+mono(108,59,'CAMPUSAI / '+kicker,17,c.mint)+txt(58,124,title,43,'white',500)+txt(60,172,sub,21,'#b2cbcd')+line(58,941,1542,941)+mono(58,973,'JOYCE YU  /  CAMPUSAI',14)+mono(1542,973,'SPRING AI · RAG · TOOL CALLING',14).replace('font-family=', 'text-anchor="end" font-family='),0,'none');}
function node(x,y,w,h,kicker,title,detail,kind='doc',dark=false){return rect(x,y,w,h,dark?c.dark:'white',18,dark?c.dark:c.line)+rect(x+22,y+22,40,40,dark?'#21454a':'#edf5f2',12)+icon(kind,x+30,y+30,dark?c.mint:c.teal,24)+mono(x+76,y+40,kicker,13,dark?'#acd4cc':c.muted)+txt(x+22,y+100,title,25,dark?'white':c.ink,500)+txt(x+22,y+133,detail,17,dark?'#b9d1d0':c.muted);}

// 01 — Product composition. The redesigned interface is illustrative, not a live-service capture.
function product(){
  // Keep the upper-right corner clear for the gallery expand control.
  let s=layer('base',rect(0,0,W,H,c.dark,0)+`<ellipse cx="1300" cy="450" rx="650" ry="650" fill="url(#glow)"/>`+brand(64,56,42,true)+txt(122,87,'CampusAI',28,'white',500),0,'none');
  s+=layer('headline',mono(64,249,'AI FOR CAMPUS LIFE',16,c.mint)+txt(61,355,'园区服务，',72,'white',500)+txt(61,449,'对话即入口。',72,'white',500)+txt(65,514,'公告、资料与业务办理，',25,'#c0d5d5')+txt(65,553,'在同一个智能助手中完成。',25,'#c0d5d5')+chip(64,607,'Spring AI',112,'#20484a',c.mint)+chip(188,607,'RAG',72,'#20484a',c.mint)+chip(272,607,'Tool Calling',126,'#20484a',c.mint),.25);
  let ui=rect(628,192,908,620,'#f8fbfa',22)+rect(628,192,205,620,'#e8efed',22)+rect(812,192,21,620,'#e8efed',0)+line(833,192,833,812)+txt(657,236,'工作空间',15,c.muted,500)+rect(647,261,166,43,c.teal,10)+icon('chat',660,272,'white',20)+txt(691,289,'智能客服',18,'white',500)+icon('doc',661,326,c.muted,20)+txt(691,342,'文档问答',17,c.muted)+icon('layers',661,376,c.muted,20)+txt(691,392,'公告知识库',17,c.muted)+line(649,430,812,430)+mono(660,463,'RECENT',12)+txt(660,502,'社团报名咨询',17,c.teal,500)+txt(660,542,'园区公告查询',17,c.muted)+txt(660,582,'资料阅读与总结',17,c.muted)+brand(654,748,28)+txt(695,768,'CampusAI',17,c.teal,500)+txt(865,235,'园区智能助手',20,c.ink,500)+dot(1452,228,4,'#23765f')+txt(1466,235,'会话中',14,c.muted)+line(833,260,1536,260)+txt(866,784,'界面设计演示',12,c.muted)+rect(866,714,639,47,'white',12,c.line)+txt(886,744,'继续提问，或描述你想办理的事情…',16,c.muted)+rect(1458,721,32,32,c.teal,8)+icon('arrow',1464,727,'white',20);
  s+=layer('workspace',ui,.65);
  s+=layer('question',rect(1016,289,484,52,'#e2efea',13)+txt(1038,322,'我想了解社团报名，需要提交哪些信息？',18,c.ink),1.35);
  s+=layer('answer',brand(865,365,30)+txt(908,389,'CampusAI',17,c.teal,500)+txt(907,429,'我可以协助你查询社团信息并完成报名。',18,c.ink)+txt(907,467,'请告诉我你的姓名、意向社团和报名信息。',18,c.ink)+rect(907,490,562,48,'#edf4f1',10)+icon('tool',921,504,c.teal,20)+txt(952,520,'工具调用 · 采集信息 → 执行业务 → 返回结果',15,c.teal),2.4);
  s+=layer('memory',rect(907,558,562,105,'white',12,c.line)+icon('db',925,577,c.teal,20)+txt(958,593,'对话记忆',17,c.ink,500)+txt(928,633,'历史消息随会话保留，后续追问承接上下文。',16,c.muted),3.6);
  s+=layer('bottom',line(64,876,1536,876,'#345357')+mono(64,922,'01  智能对话',16,'#c0d5d5')+mono(432,922,'02  业务工具',16,'#c0d5d5')+mono(800,922,'03  知识检索',16,'#c0d5d5')+mono(1168,922,'04  会话记忆',16,'#c0d5d5'),.9);
  return svg('CampusAI 园区智能助手产品设计','园区智能客服界面设计，展示社团报名咨询、业务工具调用和会话记忆。此图是基于项目功能重新设计的界面演示。',s);
}

// 02 — System architecture, with a clear split between business and AI services.
function system(){
  let s=header('01','ARCHITECTURE','一个园区平台，两条服务链路。','业务管理与 AI 服务分工，借助消息队列连接公告、资料与知识检索。');
  s+=layer('entry',rect(58,240,1484,83,'white',17,c.line)+mono(82,273,'ENTRY',13)+icon('chat',236,266,c.teal,24)+txt(274,288,'Vue 用户端',23,c.ink,500)+txt(490,287,'智能客服 / AI 对话 / PDF 问答',20,c.muted)+line(954,261,954,303)+icon('layers',1000,266,c.teal,24)+txt(1038,288,'若依管理端',23,c.ink,500)+txt(1240,287,'公告 / 资料 / 报名',20,c.muted),.3);
  s+=layer('connections',pathLine('M430 323V364M1170 323V364',c.teal,2,'marker-end="url(#arrow)"'),.65);
  s+=layer('ai',rect(58,364,714,326,'white',20,c.line)+mono(88,405,'AI SERVICE',14)+chip(599,383,'Spring AI',143)+txt(88,454,'前台 AI 服务',31,c.ink,500)+txt(88,491,'对话上下文与模型能力编排',20,c.muted)+node(88,520,198,142,'CONVERSATION','会话记忆','MySQL 持久化','chat').replace('y="653"','y="642"')+node(308,520,198,142,'ACTION','工具调用','信息采集与业务办理','tool').replace('font-size="25"','font-size="24"')+node(528,520,214,142,'RETRIEVAL','RAG 检索','向量召回与回答生成','search'),.9);
  s+=layer('business',rect(800,364,742,326,'white',20,c.line)+mono(830,405,'BUSINESS SERVICE',14)+chip(1352,383,'RuoYi',160)+txt(830,454,'园区业务管理',31,c.ink,500)+txt(830,491,'权限、数据与内容维护',20,c.muted)+node(830,520,208,142,'CONTENT','公告与资料','新增 / 修改 / 删除','doc')+node(1060,520,206,142,'BOOKING','社团报名','报名信息维护','user')+node(1288,520,224,142,'ACCESS','权限与监控','Shiro / 操作日志','layers'),1.25);
  // A distinct message band makes the asynchronous boundary explicit.
  s+=layer('event',pathLine('M1170 690V726H430V690',c.teal,2)+rect(570,705,456,44,c.teal,22)+txt(798,734,'RabbitMQ · 公告 / 资料变更消息',18,'white',500,'text-anchor="middle"'),1.8);
  s+=layer('storage',rect(58,779,1484,125,c.dark,18)+mono(87,810,'DATA & MODEL',13,'#a3c1c0')+txt(88,857,'基础能力',25,'white',500)+line(301,805,301,877,'#35575a')+txt(335,828,'MySQL',24,'white',500)+txt(335,863,'业务数据 · 会话记录',17,'#b8d0cf')+line(601,805,601,877,'#35575a')+txt(636,828,'Redis Stack',24,'white',500)+txt(636,863,'向量索引 · 语义检索',17,'#b8d0cf')+line(939,805,939,877,'#35575a')+txt(972,828,'MinIO',24,'white',500)+txt(972,863,'资料文件存储',17,'#b8d0cf')+line(1234,805,1234,877,'#35575a')+txt(1268,828,'LLM / Embedding',23,'white',500)+txt(1268,863,'回答生成 · 文本向量化',17,'#b8d0cf'),2.3);
  return svg('CampusAI · 系统架构总览','Vue 用户端和若依管理端分别连接 AI 服务与业务管理服务。公告与资料变更通过 RabbitMQ 发送。基础能力包括 MySQL、Redis Stack、MinIO 与模型服务。',s);
}

// 03 — Tool calling: the application executes tools, never the model directly.
function tools(){
  let s=header('02','TOOL CALLING','从一句话，到一次业务执行。','模型负责判断意图，Spring AI 应用执行工具，再将结果交还给模型组织回答。');
  s+=layer('request',rect(58,242,1484,88,'white',18,c.line)+icon('chat',85,270,c.teal,27)+mono(138,272,'USER REQUEST',13)+txt(138,309,'“我想报名社团，可以帮我登记吗？”',24,c.ink,500)+chip(1314,268,'自然语言输入',198),.3);
  const xs=[58,438,818,1198];
  s+=layer('lanes',xs.map((x,i)=>rect(x,364,344,48,i===1?c.teal:'#dde9e7',12)+txt(x+172,395,['用户与会话','Spring AI 应用','大语言模型','业务工具'][i],20,i===1?'white':c.teal,500,'text-anchor="middle"')).join(''),.6);
  s+=layer('prompt',node(58,456,344,166,'01 · INPUT','带入会话上下文','自然语言 + 历史消息','chat')+node(438,456,344,166,'02 · PREPARE','构造模型请求','系统提示词 + 工具定义','layers'),1.0);
  s+=layer('intent',arrow(402,539,438,539)+arrow(782,539,818,539)+node(818,456,344,166,'03 · DECIDE','判断意图与参数','返回工具名称与调用参数','spark')+arrow(1162,539,1198,539)+node(1198,456,344,166,'04 · EXECUTE','应用执行业务工具','采集信息 / 调用业务 / 写库','tool',true),1.8);
  s+=layer('return',pathLine('M1370 622V694H990V654',c.teal,2,'marker-end="url(#arrow)"')+chip(1123,677,'业务结果回填',158)+pathLine('M990 622V654',c.teal,2)+rect(818,654,344,46,'#e1efea',12)+txt(990,684,'模型接收工具执行结果',18,c.teal,500,'text-anchor="middle"')+pathLine('M818 676H610V715',c.teal,2,'marker-end="url(#arrow)"'),2.8);
  s+=layer('complete',rect(58,734,714,147,c.dark,18)+brand(84,760,34,true)+txt(136,785,'05 · 生成自然语言答复',24,'white',500)+txt(88,833,'将实际业务结果返回用户，并更新当前会话上下文。',20,'#c1d8d6')+pathLine('M610 715V734',c.teal,2,'marker-end="url(#arrow)"')+rect(818,734,724,147,'white',18,c.line)+mono(846,772,'EXECUTION BOUNDARY',13)+txt(846,814,'工具由应用调用，模型只提出调用请求。',23,c.ink,500)+txt(846,852,'信息采集、业务入库与上下文更新形成完整闭环。',18,c.muted),3.4);
  return svg('CampusAI · Tool Calling 业务闭环','用户请求携带会话上下文，Spring AI 构造提示词与工具定义，模型判断工具与参数，由应用执行业务工具，回填实际执行结果后生成回答。',s);
}

// 04 — Indexing and retrieval, with arrows laid out on separate lanes.
function rag(){
  let s=header('03','KNOWLEDGE LIFECYCLE','让每一次检索，找到相关知识。','公告维护进入异步索引链路；用户提问通过语义检索，为模型补充相关内容。');
  s+=layer('indexLabel',mono(58,260,'A / KNOWLEDGE INDEXING',15)+txt(58,301,'公告与资料的知识化',27,c.ink,500)+chip(1350,267,'异步索引链路',192),.3);
  const xs=[58,362,666,970,1274], w=268;
  s+=layer('content',node(xs[0],335,w,164,'01 · MANAGE','内容维护','管理端新增 / 修改 / 删除','doc')+arrow(326,418,362,418)+node(xs[1],335,w,164,'02 · PERSIST','MySQL','保存公告与资料信息','db'),.7);
  s+=layer('queue',arrow(630,418,666,418)+node(xs[2],335,w,164,'03 · NOTIFY','RabbitMQ','发送变更类型与业务 ID','layers',true),1.3);
  s+=layer('vectors',arrow(934,418,970,418)+node(xs[3],335,w,164,'04 · PROCESS','索引变更','新增更新编码 / 删除移除','doc')+arrow(1238,418,1274,418)+node(xs[4],335,w,164,'05 · INDEX','Redis Stack','维护向量与内容元数据','db'),1.9);
  s+=layer('queryLabel',line(58,541,1542,541)+mono(58,583,'B / RETRIEVAL AUGMENTED GENERATION',15)+txt(58,624,'从自然语言到知识回答',27,c.ink,500)+chip(1350,590,'在线问答链路',192),.6);
  s+=layer('query',node(xs[0],658,w,164,'01 · ASK','用户提问','查询公告 / 阅读资料','chat')+arrow(326,741,362,741)+node(xs[1],658,w,164,'02 · SEARCH','Spring AI','将问题转换为检索请求','search'),2.7);
  s+=layer('retrieval',arrow(630,741,666,741)+node(xs[2],658,w,164,'03 · RETRIEVE','Redis Stack','召回相关知识片段','db')+arrow(934,741,970,741)+node(xs[3],658,w,164,'04 · GENERATE','大语言模型','问题 + 召回内容 → 回答','spark',true),3.4);
  s+=layer('answer',arrow(1238,741,1274,741)+node(xs[4],658,w,164,'05 · RESPOND','回答用户','自然语言答复 / 连续追问','chat')+rect(58,852,1484,54,'#dfece7',13)+icon('layers',79,869,c.teal,21)+txt(114,886,'同一知识索引连接内容维护与在线问答；更新、删除事件进入索引维护流程。',19,c.teal),4.2);
  return svg('CampusAI · 公告与资料 RAG 检索链路','上方为内容维护、MySQL 持久化、RabbitMQ 变更通知、索引变更处理（新增更新编码、删除移除）、Redis Stack 索引；下方为用户问题、Spring AI 检索、Redis Stack 知识召回、模型生成与回答用户。',s);
}

const artwork = [
  ['campusai-product-showcase.svg',product()],
  ['campusai-system-architecture.svg',system()],
  ['campusai-tool-calling-flow.svg',tools()],
  ['campusai-notice-rag-flow.svg',rag()]
];
for(const [name,data] of artwork) fs.writeFileSync(path.join(out,name),data+'\n');
console.log('Generated '+artwork.length+' CampusAI SVG artworks.');
