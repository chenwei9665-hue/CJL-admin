# 电商老板 AI CFO - Web MVP

一个面向电商老板的极简 SaaS 演示版：每天主动汇报经营状态、发现异常、给出建议并跟踪动作闭环。

## 技术栈

- Next.js 14 (App Router) + React + TypeScript
- Tailwind CSS
- Recharts（异常趋势小图）
- 本地 Mock 数据 + 前端规则引擎 + Mock API Route

## 安装与启动

```bash
npm install
npm run dev
```

默认访问：
- `http://localhost:3000/dashboard` 今日经营简报
- `http://localhost:3000/issues/[id]` 异常详情
- `http://localhost:3000/insights` 经营透视
- `http://localhost:3000/actions` 动作中心

## 本轮产品化打磨重点

- 首页重构为“晨报 + 决策摘要”优先结构（结论 > 问题 > 建议 > 指标 > 进展）
- 晨报模块升级为首页主角，强化阅读节奏与高管摘要感
- 今日建议卡片强化为可执行决策（原因、影响、优先级、负责人、状态）
- 指标卡降噪处理，作为辅助判断区
- 异常卡、动作卡、经营透视页统一文案语气与高信任感视觉


## 第三轮 Final Polish（视觉与演示完成度）

- 统一全站视觉语言：卡片、边框、阴影、按钮、标题、辅助文案采用统一风格
- 首页进一步打磨为“成熟产品化”观感，强化留白节奏与晨报可读性
- 关键卡片（晨报/建议/异常/动作/指标）统一质感，降低模板化后台感
- 文案细节继续精修，提升汇报语气的专业度与自然度
- 交互细节轻量优化：hover/active 反馈更清晰、状态表达更直观


## SWC 启动故障排查（macOS 常见）

如果遇到类似报错：

`Failed to load SWC binary for darwin/x64`
或
`segment '__TEXT' load command content extends beyond end of file`

通常是本地 `@next/swc-*` 二进制包损坏。项目已内置 `postinstall` 自动修复脚本（`scripts/repair-swc.mjs`），会在安装依赖时检测并重装当前平台的 SWC 包。

如仍失败，可手动执行：

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

如果是 Intel Mac（darwin/x64），也可显式重装：

```bash
npm install --no-save @next/swc-darwin-x64@14.2.5
```

## 页面说明

### 1) `/dashboard` 今日经营简报
- 第一屏以晨报为中心，突出结论、重点问题和今日建议
- 右侧为经营状态与今日优先风险，便于快速决策
- 第二屏展示核心指标（辅助判断）、关键异常、最近动作进展

### 2) `/issues/[id]` 异常详情页
- 问题定义、严重程度、影响范围
- 主要原因、不处理后果、建议动作
- 趋势图 + 跳转动作中心

### 3) `/insights` 经营透视页
四个板块：
- 赚钱能力
- 现金安全
- 库存效率
- 增长质量

用于解释首页结论，不扩展为复杂 BI。

### 4) `/actions` 动作中心
- 按状态查看动作（待处理 / 处理中 / 已完成 / 已忽略）
- 每条动作展示来源异常、建议原因、预估影响、负责人、截止时间、结果备注
- 支持“开始处理 / 标记完成 / 标记暂缓”状态流转（mock API）

## Mock 数据与逻辑

### 数据模型
- `BusinessSummary`
- `Issue`
- `ActionItem`
- `DailyBrief`

定义文件：`types/business.ts`

### 种子数据
- 经营总览、经营输入、默认晨报、动作种子：`data/seed.ts`

### 异常规则引擎
`lib/rules.ts` 内实现 8 条规则：
1. 毛利率连续下降
2. 某渠道亏损/利润偏低
3. 广告花费增加但利润未增长
4. 平台待结算金额偏高
5. 未来 7 天现金压力偏大
6. 热销 SKU 即将断货
7. 滞销库存占比过高
8. 退款率异常上升

规则命中后统一生成 `Issue`，并按严重程度和影响排序。

### 晨报生成
`lib/brief.ts`
- 以默认晨报模板为基础
- 自动优先展示当前 Top 问题与优先动作

## 目录结构

```text
app/
  dashboard/
  issues/[id]/
  insights/
  actions/
  api/actions/[id]/status/
components/
lib/
data/
types/
```

## 说明

- 不接真实电商平台 API
- 不接真实数据库
- 不做登录与权限系统
- 目标是高可信、可演示、面向老板每日阅读的 MVP
