---
layout: page
title: "FORGE: Verifier as Teacher"
title_zh: "FORGE：以验证器为师"
description: A post-training method that distills a deterministic verifier's counterfactual search into a student model's weights — targeting IJCAI-27 / AAAI-28
description_zh: 一种将确定性验证器的反事实搜索能力蒸馏进学生模型参数的后训练方法 —— 目标投稿 IJCAI-27 / AAAI-28
importance: 1
category: research
---

<h2 class="i18n-en">Overview</h2>
<h2 class="i18n-zh">项目概览</h2>

<div class="i18n-en" markdown="1">

**In progress — 2025 – Present**, working with my advisor.

Incubated from [Drawsee](/projects/3_zhaoxiplatform/)'s circuit-design agent scenario: in engineering-verification environments that support counterfactual queries — EDA design, GPU kernel optimization — a deterministic verifier acts as a **"counterfactual teacher."**

The method constructs **Verified Counterfactual Pairs (VCP)** for model-proposed design edits, then distills verifier-guided search and effect knowledge into a small model's weights. The goal: a student model that achieves higher task success and better effect-prediction calibration on unseen tasks and circuit families — **without** needing extensive, high-latency tool calls at deployment.

</div>

<div class="i18n-zh" markdown="1">

**进行中 —— 2025 年至今**，与导师合作推进。

该研究孵化自 [昭析（Drawsee）](/projects/3_zhaoxiplatform/) 的电路设计 Agent 场景：在支持反事实查询的工程验证环境中（如 EDA 设计、GPU 算子优化），一个确定性验证器扮演**"反事实教师"**的角色。

该方法针对模型提出的设计修改构造**已验证反事实对（Verified Counterfactual Pairs, VCP）**，并将验证器引导的搜索过程与效果知识蒸馏进小模型的参数中。目标是让学生模型在未见过的任务与电路族上取得更高的任务成功率与更准确的效果预测校准——且在部署阶段**无需**依赖大量高延迟的工具调用。

</div>

```
Model-proposed design edit
        │
        ▼
Deterministic verifier (counterfactual teacher)
        │
        ├─ evaluates edit under counterfactual query
        └─ constructs Verified Counterfactual Pair (VCP)
        │
        ▼
Distillation into student model weights
        │
        ▼
Student model: higher task success,
better effect-prediction calibration,
no high-latency tool calls at deployment
```

<div class="i18n-en" markdown="1">

Currently in mid-stage experimental validation.

</div>

<div class="i18n-zh" markdown="1">

目前处于实验验证的中期阶段。

</div>

---

<h2 class="i18n-en">Why This Matters</h2>
<h2 class="i18n-zh">研究动机</h2>

<div class="i18n-en" markdown="1">

Drawsee's circuit-design agent already uses a deterministic simulator instead of model self-evaluation for verification — this project asks whether that same verifier can teach a smaller model to internalize verified cause-and-effect knowledge directly, rather than re-deriving it through tool calls at every inference step.

</div>

<div class="i18n-zh" markdown="1">

昭析的电路设计 Agent 已经在用确定性仿真器替代模型自评估来做验证——这个研究进一步追问：同一个验证器能否直接教会一个更小的模型内化"已验证的因果知识"，而不是在每一次推理时都重新通过工具调用去推导它。

</div>
