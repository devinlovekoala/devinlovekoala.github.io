---
layout: page
title: "TraceParse: A Candidate-Graph Repair Framework for Schematic Parsing"
title_zh: "TraceParse：面向电路原理图解析的候选图修复框架"
description: A repair-then-parse framework for schematic-to-netlist parsing — targeting CVPR 2027
description_zh: 面向电路原理图转网表解析的"先修复后解析"框架 —— 目标投稿 CVPR 2027
importance: 2
category: research
---

<h2 class="i18n-en">Overview</h2>
<h2 class="i18n-zh">项目概览</h2>

<div class="i18n-en" markdown="1">

**In progress — 2025 – Present**, targeting CVPR 2027.

Focused on schematic-to-netlist parsing: identified that the dominant bottleneck is not recognition accuracy but the **structural unrepresentability** of the candidate connectivity graph — the correct netlist simply does not exist anywhere in the candidate space, so improving recognition accuracy alone cannot fix it.

Proposed a **"repair-then-parse"** framework: a library of deterministic repair operators first makes the candidate graph representable, then an exact parsing algorithm solves it, with machine-checkable structural certificates flagging genuine conflicts. The repair module is decoupled from the underlying image perceiver and transfers across vision-language models of different scales.

The paper's core results are complete, targeting a CVPR submission in the coming months.

</div>

<div class="i18n-zh" markdown="1">

**在研 —— 2025 年至今**，拟投稿 CVPR 2027。

聚焦电路原理图转网表解析问题：识别出该任务的核心瓶颈并非识别精度，而是候选连接图存在**结构性不可表示**——正确网表根本不在候选空间内，单纯提升识别准确率也无法解决这一问题。

据此提出**"先修复后解析"**框架：先用一组确定性修复算子使候选图具备可表示性，再以精确解析算法求解，并用可机器验证的结构证书标记真实冲突。修复模块与具体图像感知器解耦，可迁移到不同规模的视觉语言模型。

目前论文主体已完成，拟于近期投稿 CVPR。

</div>

```
Schematic image
        │
        ▼
Candidate connectivity graph   ← structurally unrepresentable
        │                        (correct netlist not in candidate space)
        ▼
Deterministic repair operators  → representable candidate graph
        │
        ▼
Exact parsing algorithm         → netlist
        │
        ▼
Machine-checkable structural certificates → flags genuine conflicts
```

---

<h2 class="i18n-en">Why This Matters</h2>
<h2 class="i18n-zh">研究动机</h2>

<div class="i18n-en" markdown="1">

The repair module is decoupled from the underlying image perceiver, so it transfers across vision-language models of different scales rather than being tied to one recognizer's error profile — a structural fix instead of a bigger model.

</div>

<div class="i18n-zh" markdown="1">

修复模块与具体的图像感知器解耦，因此可以迁移到不同规模的视觉语言模型上，而不是被绑定在某一个识别器的误差分布上——这是一次结构性的修复，而不是简单地换一个更大的模型。

</div>
