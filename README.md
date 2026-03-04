# 虚拟 CFO MVP 演示版（零外部依赖）

本版本已重构为 **仅依赖 Python3 标准库** 的可演示应用：
- 不需要 `pip install`
- 不需要 `npm install`
- 不使用 FastAPI / React / Vite
- 一条命令启动后即可在浏览器演示

## 1. 为什么改成零依赖

当前环境无法稳定访问外部包仓库（pip/npm registry 403），为了保证“可运行、可演示、可迭代”，本版改为：
- 后端：`http.server` + `ThreadingHTTPServer`
- 前端：纯静态 `HTML + CSS + Vanilla JS`
- 业务逻辑继续复用第一轮已验证的解析器与服务层

## 2. 项目结构

```bash
.
├── backend/
│   ├── run_demo.py                  # 启动入口（标准库 HTTP 服务）
│   └── app/
│       ├── parsers/
│       │   └── query_parser.py
│       ├── services/
│       │   ├── metrics_service.py
│       │   ├── payroll_service.py
│       │   ├── inventory_service.py
│       │   ├── message_service.py
│       │   └── ai_service.py
│       └── data_loader.py
├── frontend-static/
│   ├── index.html                   # 演示首页
│   ├── styles.css                   # 样式
│   └── app.js                       # 前端交互逻辑
└── mock-data/
    ├── metrics.json
    ├── payroll.json
    ├── inventory.json
    └── tasks.json
```

## 3. 启动命令（无需安装依赖）

```bash
PYTHONPATH=backend python3 backend/run_demo.py
```

启动后访问：
- 首页：`http://127.0.0.1:8000`
- 健康检查：`http://127.0.0.1:8000/api/health`

## 4. 已完成功能

### 4.1 系统主动推送
页面加载后会自动展示：
- 晨报
- 周报
- 月报
- 异常预警
- 事项进度

以上消息来自后端 `GET /api/messages`，不是前端写死。

### 4.2 结构化受控问答
`POST /api/query` 支持：
- 收入、利润、成本、费用
- 工资条
- 库存可售天数

超范围问题统一返回：
> 该问题暂不支持。请改问收入、利润、成本、费用、工资条或库存相关问题。

### 4.3 AI 增强（规则驱动）
- 库存可售天数：按当前库存 / 近7天均销计算
- 周报经营摘要：按本周 vs 上周数据规则生成

## 5. API 说明

### `GET /api/health`
返回示例：
```json
{"status":"ok","service":"virtual-cfo-demo"}
```

### `GET /api/messages`
返回示例：
```json
{
  "success": true,
  "data": [
    {"type":"晨报","title":"...","body":"...","timestamp":"08:30"}
  ]
}
```

### `POST /api/query`
请求示例：
```json
{"question":"上周天猫店收入是多少？"}
```

## 6. 测试步骤（可直接复制）

### 6.1 健康检查
```bash
curl -s http://127.0.0.1:8000/api/health
```

### 6.2 消息流接口
```bash
curl -s http://127.0.0.1:8000/api/messages
```

### 6.3 问答接口
```bash
curl -s -X POST http://127.0.0.1:8000/api/query \
  -H 'Content-Type: application/json' \
  -d '{"question":"上周天猫店收入是多少？"}'
```

## 7. 演示问题样例（至少 5 条）

- 上周天猫店收入是多少？
- 2月抖音店利润是多少？
- SKU-2002 本月成本是多少？
- 李强 2月工资条
- 张三 2月工资条
- SKU-1001 库存还能卖几天？
- 请预测下季度融资环境（应拒答）

## 8. 第二轮重构说明

- 已新增 `backend/run_demo.py`，替代 FastAPI 运行入口。
- 已新增 `frontend-static/`，替代 React/Vite 前端构建流程。
- 复用第一轮已验证的解析器与业务服务（指标/工资条/库存/拒答逻辑）。
- 保留原有代码目录供后续扩展对照；当前演示路径以零依赖入口为准。

> 请优先把“能跑起来的版本”做完，再做样式优化。不要为了前端美化影响可运行性。
