---
layout: page
title: "FORGE: Verifier as Teacher"
description: A post-training method that distills a deterministic verifier's counterfactual search into a student model's weights — targeting IJCAI-27 / AAAI-28
importance: 1
category: research
---

## Overview

**In progress — 2025 – Present**, working with my advisor.

Incubated from [Drawsee](/projects/3_zhaoxiplatform/)'s circuit-design agent scenario: in engineering-verification environments that support counterfactual queries — EDA design, GPU kernel optimization — a deterministic verifier acts as a **"counterfactual teacher."**

The method constructs **Verified Counterfactual Pairs (VCP)** for model-proposed design edits, then distills verifier-guided search and effect knowledge into a small model's weights. The goal: a student model that achieves higher task success and better effect-prediction calibration on unseen tasks and circuit families — **without** needing extensive, high-latency tool calls at deployment.

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

Currently in mid-stage experimental validation.

---

## Why This Matters

Drawsee's circuit-design agent already uses a deterministic simulator instead of model self-evaluation for verification — this project asks whether that same verifier can teach a smaller model to internalize verified cause-and-effect knowledge directly, rather than re-deriving it through tool calls at every inference step.
