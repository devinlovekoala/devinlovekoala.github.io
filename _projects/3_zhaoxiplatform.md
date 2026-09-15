---
layout: page
title: Drawsee (昭析)
description: A multimodal AI Agent platform for circuit-design education — closed-loop agent workflow, canary-gated self-improvement, and an in-house evaluation harness
description_zh: 面向电路设计教育的多模态 AI Agent 平台 —— 闭环 Agent 工作流、金丝雀发布驱动的自优化系统，以及自研的评测基座
img: assets/img/drawsee-homepage.png
importance: 1
category: engineering
github: https://github.com/devinlovekoala
---

<h2 class="i18n-en">Overview</h2>
<h2 class="i18n-zh">项目概览</h2>

<div class="i18n-en" markdown="1">

Drawsee is a complete AI Agent platform for electronics education, built from the first commit as a personal project and now deployed to 500+ faculty and students at BUPT. I am the sole backend owner: system architecture, every core backend module, and every piece of infrastructure below trace back to over 330 commits — more than 90% of the repository's history.

**Founder & Backend Lead (Personal Project) · Mar. 2025 – Present · [drawsee.cn](https://drawsee.cn)**

**Tech stack:** Spring Boot 3.4 · LangChain4j · Qdrant · MySQL · Redis · RabbitMQ · MinIO

</div>

<div class="i18n-zh" markdown="1">

昭析是一个面向电子电路教育的完整 AI Agent 平台，作为个人项目从第一次提交开始搭建，目前已服务于北邮 500+ 名师生。我是唯一的后端负责人：系统架构、每一个核心后端模块，以及下文提到的每一处基础设施，都可追溯到我累计提交的 330+ 次代码——占仓库总提交量的 90% 以上。

**创始人 & 后端负责人（个人项目）· 2025 年 3 月至今 · [drawsee.cn](https://drawsee.cn)**

**技术栈：** Spring Boot 3.4 · LangChain4j · Qdrant · MySQL · Redis · RabbitMQ · MinIO

</div>

<div class="row mt-3">
  <div class="col-12">
    {% include figure.liquid path="assets/img/drawsee-homepage.png" class="img-fluid rounded z-depth-1" caption="<span class='i18n-en'>Drawsee — main platform interface</span><span class='i18n-zh'>昭析 —— 平台主界面</span>" %}
  </div>
</div>

---

<h2 class="i18n-en">Circuit-Design Agent Closed-Loop Workflow</h2>
<h2 class="i18n-zh">电路设计 Agent 闭环工作流</h2>

<div class="i18n-en" markdown="1">

Designed from scratch a closed-loop agent architecture — **Plan → Generate → Structured Verification → Repair → Archive** — that turns vague circuit requirements into structured specs and interface contracts. A deterministic simulator, not model self-evaluation, performs functional-level verification, and the loop automatically enters a rule-based repair-and-reverify cycle on failure.

The loop's termination policy is abstracted into stateless pure functions, so the core decisions — when to stop, when to escalate to a human, when to declare failure — can be tested and evolved independently of both the sandbox and the LLM.

</div>

<div class="i18n-zh" markdown="1">

从零设计了一套闭环 Agent 架构——**规划 → 生成 → 结构化验证 → 修复 → 归档**——将模糊的电路需求转化为结构化规格说明与接口契约。功能级验证由确定性仿真器完成，而非依赖模型自评估；一旦验证失败，系统会自动进入基于规则的修复与重验证循环。

该循环的终止策略被抽象为无状态纯函数，因此"何时停止、何时升级至人工介入、何时判定失败"这些核心决策可以脱离沙箱环境和 LLM 本身独立测试与演进。

</div>

<div class="row mt-3">
  <div class="col-12">
    {% include video.liquid path="assets/video/drawsee-circuit-agent-demo.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true caption="<span class='i18n-en'>Circuit-design agent workspace — plan, generate, verify, repair</span><span class='i18n-zh'>电路设计 Agent 工作台 —— 规划、生成、验证、修复</span>" %}
  </div>
</div>

```
Requirement (natural language)
        │
        ▼
     Plan            structured spec + interface contract
        │
        ▼
   Generate          candidate circuit design
        │
        ▼
Structured Verify     deterministic simulator, not self-evaluation
        │
   pass │ fail
        │    └──────► Repair (rule-based) ──► reverify (loop)
        ▼
     Archive
```

---

<h2 class="i18n-en">Drawsee Self-Improvement System</h2>
<h2 class="i18n-zh">昭析自优化系统</h2>

<div class="i18n-en" markdown="1">

Led the design and implementation of a fully automated self-optimization loop: **issue discovery → candidate generation → canary validation → auto-promotion/rollback.** User feedback is auto-clustered into optimization candidates, gated by review, then canary-released. Effectiveness is judged with statistical significance testing — a two-proportion sequential test — instead of manual judgment.

I fixed three statistical/attribution defects in the prior implementation that had been producing incorrect conclusions, giving the product continuous self-iteration without manual case-by-case review.

</div>

<div class="i18n-zh" markdown="1">

主导设计并实现了一套全自动自优化闭环：**问题发现 → 候选生成 → 金丝雀验证 → 自动发布/回滚。** 用户反馈会被自动聚类为优化候选，经审核门禁后进行金丝雀发布；效果判定采用统计显著性检验（双比例序贯检验），而非人工经验判断。

我修复了此前实现中的三个统计/归因缺陷——这些缺陷曾导致结论错误——使产品得以持续自我迭代，而无需逐案人工复核。

</div>

<div class="row mt-3">
  <div class="col-sm-8 offset-sm-2">
    {% include figure.liquid path="assets/img/drawsee-admin-console.png" class="img-fluid rounded z-depth-1" caption="<span class='i18n-en'>Admin console — canary review and rollout controls</span><span class='i18n-zh'>管理后台 —— 金丝雀审核与发布控制</span>" %}
  </div>
</div>

---

<h2 class="i18n-en">In-House Agent Evaluation Harness (TestLab)</h2>
<h2 class="i18n-zh">自研 Agent 评测基座（TestLab）</h2>

<div class="i18n-en" markdown="1">

Designed and built the team's general-purpose Agent evaluation infrastructure from zero: custom orchestration for eval tasks, environment isolation and credential management, and a **deterministic-replay evaluation engine** that lets any Agent decision be replayed step by step, fingerprint-compared, and traced to the exact point of deviation.

This turns "is this eval result trustworthy" into an engineering property that tests can guard long-term. TestLab also runs the structured recording/export pipeline for Agent execution traces, turning live interactions into data assets directly usable for model training.

</div>

<div class="i18n-zh" markdown="1">

从零设计并搭建了团队通用的 Agent 评测基础设施：自定义评测任务编排、环境隔离与凭证管理，以及一套**确定性重放评测引擎**，可将任意 Agent 决策逐步重放、进行指纹比对，并精确定位偏差发生的节点。

这让"这次评测结果是否可信"从一句经验判断变成了可被测试长期守护的工程属性。TestLab 同时运行结构化的 Agent 执行轨迹记录与导出流水线，将线上真实交互转化为可直接用于模型训练的数据资产。

</div>

```
Agent execution
      │
      ├─ trajectory recording   → structured trace log
      ├─ environment isolation  → per-task sandbox + credentials
      │
      ▼
Deterministic replay engine
      │
      ├─ step-by-step replay
      ├─ fingerprint comparison
      └─ deviation point tracing
      │
      ▼
Exported trace data → training-data pipeline
```

---

<h2 class="i18n-en">Backend Foundation Architecture</h2>
<h2 class="i18n-zh">后端基础架构</h2>

<div class="i18n-en" markdown="1">

Independently owned technology selection and platform build-out for the entire backend:

</div>

<div class="i18n-zh" markdown="1">

独立完成了整个后端的技术选型与平台搭建：

</div>

| <span class="i18n-en">Layer</span><span class="i18n-zh">分层</span> | <span class="i18n-en">Technology</span><span class="i18n-zh">技术方案</span> |
|-------|-----------|
| <span class="i18n-en">Model orchestration</span><span class="i18n-zh">模型编排</span> | Unified routing + dynamic context-budget management across Qwen / DeepSeek |
| <span class="i18n-en">RAG pipeline</span><span class="i18n-zh">RAG 检索流水线</span> | Qdrant vector store + hybrid retrieval |
| <span class="i18n-en">Async tasks</span><span class="i18n-zh">异步任务</span> | RabbitMQ, multiple worker types |
| <span class="i18n-en">Streaming</span><span class="i18n-zh">流式传输</span> | Redis Stream + SSE |
| <span class="i18n-en">Object storage</span><span class="i18n-zh">对象存储</span> | MinIO |
| <span class="i18n-en">Migrations</span><span class="i18n-zh">数据库迁移</span> | Flyway (versioned) |
| <span class="i18n-en">Auth</span><span class="i18n-zh">鉴权</span> | Sa-Token |
| CI/CD | <span class="i18n-en">Multi-environment GitHub Actions pipelines</span><span class="i18n-zh">多环境 GitHub Actions 流水线</span> |

<div class="i18n-en" markdown="1">

This foundation is what the self-improvement system and TestLab were later built on top of.

</div>

<div class="i18n-zh" markdown="1">

自优化系统与 TestLab 都是在这套基础架构之上后续搭建起来的。

</div>

<div class="row mt-3">
  <div class="col-sm-6">
    {% include figure.liquid path="assets/img/drawsee-classroom-rag.png" class="img-fluid rounded z-depth-1" caption="<span class='i18n-en'>Classroom RAG — retrieval-grounded Q&A</span><span class='i18n-zh'>课堂 RAG —— 基于检索的问答</span>" %}
  </div>
  <div class="col-sm-6">
    {% include figure.liquid path="assets/img/drawsee-thinking-canvas.png" class="img-fluid rounded z-depth-1" caption="<span class='i18n-en'>Thinking canvas — agent reasoning trace</span><span class='i18n-zh'>思维画布 —— Agent 推理轨迹</span>" %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-12">
    {% include figure.liquid path="assets/img/drawsee-course-center.png" class="img-fluid rounded z-depth-1" caption="<span class='i18n-en'>Course center — student-facing learning space</span><span class='i18n-zh'>课程中心 —— 面向学生的学习空间</span>" %}
  </div>
</div>

---

<h2 class="i18n-en">Product Metrics</h2>
<h2 class="i18n-zh">产品数据</h2>

| <span class="i18n-en">Metric</span><span class="i18n-zh">指标</span> | <span class="i18n-en">Value</span><span class="i18n-zh">数值</span> |
|--------|-------|
| <span class="i18n-en">Active users</span><span class="i18n-zh">活跃用户</span> | <span class="i18n-en">500+ faculty and students</span><span class="i18n-zh">500+ 名师生</span> |
| <span class="i18n-en">Domain QA accuracy improvement</span><span class="i18n-zh">领域问答准确率提升</span> | <span class="i18n-en">+45% over base LLM</span><span class="i18n-zh">相较基座 LLM 提升 45%</span> |
| <span class="i18n-en">End-to-end latency</span><span class="i18n-zh">端到端延迟</span> | ≤ 1.5s |
| <span class="i18n-en">Human-evaluated accuracy</span><span class="i18n-zh">人工评测准确率</span> | 82% |
| <span class="i18n-en">User retention</span><span class="i18n-zh">用户留存率</span> | 73% |

---

<h2 class="i18n-en">Awards</h2>
<h2 class="i18n-zh">获奖情况</h2>

<div class="i18n-en" markdown="1">

- 🥈 **2nd Prize (Beijing)** — China International College Students' Innovation Competition, "Guochuang Cup" · 2025
- 🥇 **1st Prize (Beijing)** — China Collegiate Computer Design Competition · 2024
- 🥈 **2nd Prize** — National University-Industry ICT Education Integration Competition · 2024

</div>

<div class="i18n-zh" markdown="1">

- 🥈 **二等奖（北京赛区）** —— 中国国际大学生创新大赛（"国创杯"）· 2025
- 🥇 **一等奖（北京赛区）** —— 中国大学生计算机设计大赛 · 2024
- 🥈 **二等奖** —— 全国高校产教融合 ICT 教育创新大赛 · 2024

</div>
