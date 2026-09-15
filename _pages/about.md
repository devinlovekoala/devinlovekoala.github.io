---
layout: about
title: about
permalink: /

profile:
  align: right
  image: prof_pic_color.png
  image_circular: false

news: true
selected_papers: false
social: true
---

<div class="i18n-en" markdown="1">

I am a third-year undergraduate in Telecommunications Engineering at [Beijing University of Posts and Telecommunications (BUPT)](https://www.bupt.edu.cn/), and the founder & backend lead of [Drawsee (昭析)](https://drawsee.cn) — a complete AI Agent platform for circuit-design education, deployed to 500+ faculty and students. I have owned the entire backend from the first commit: over 330 commits, more than 90% of the repository's history.

Drawsee integrates three systems I designed and built from scratch: a closed-loop agent workflow (**Plan → Generate → Structured Verification → Repair → Archive**) that uses a deterministic simulator instead of model self-evaluation; a canary-gated self-improvement loop that clusters user feedback into optimization candidates and validates them with statistical significance testing; and **TestLab**, an in-house Agent evaluation harness built around a deterministic-replay engine that traces any Agent decision to its exact point of deviation.

</div>

<div class="i18n-zh" markdown="1">

我是北京邮电大学（BUPT）通信工程专业的大三学生，也是 [昭析（Drawsee）](https://drawsee.cn) 的创始人与后端负责人——一个面向电路设计教育的完整 AI Agent 平台，已服务 500+ 名师生。项目后端由我从第一次提交独立搭建至今：累计提交 330+ 次，占仓库总提交量的 90% 以上。

昭析集成了三套由我从零设计和实现的系统：一套闭环 Agent 工作流（**规划 → 生成 → 结构化验证 → 修复 → 归档**），用确定性仿真器替代模型自评估进行功能验证；一套金丝雀发布驱动的自优化闭环，将用户反馈自动聚类为优化候选并通过统计显著性检验判断效果；以及 **TestLab**——自研的 Agent 评测基座，核心是一个确定性重放引擎，可将任意 Agent 决策精确回放并追溯到偏差发生的具体节点。

</div>

<div class="row mt-3">
  <div class="col-sm-8 offset-sm-2">
    {% include figure.liquid path="assets/img/drawsee-circuit-agent-demo.png" class="img-fluid rounded z-depth-1" caption="<span class='i18n-en'>Drawsee's circuit-design agent workspace — see the full <a href='/projects/3_zhaoxiplatform/'>project page</a></span><span class='i18n-zh'>昭析的电路设计 Agent 工作台 — 查看完整<a href='/projects/3_zhaoxiplatform/'>项目介绍</a></span>" %}
  </div>
</div>

<div class="i18n-en" markdown="1">

Together with my advisor, I am now incubating [FORGE: Verifier as Teacher](/projects/2_forge_verifier_teacher/), a post-training method — targeting IJCAI-27 / AAAI-28 — that distills a deterministic verifier's counterfactual search into a student model's weights, so it can achieve verifier-quality judgment without expensive tool calls at deployment. I'm also working on [TraceParse](/projects/5_traceparse/), a "repair-then-parse" framework for schematic-to-netlist parsing — targeting CVPR 2027 — built around the finding that the real bottleneck is structural unrepresentability of the candidate graph, not recognition accuracy.

My interests sit at the intersection of **agent evaluation**, **self-improving systems**, and **verifier-guided learning**. I am always happy to talk shop — feel free to reach out.

</div>

<div class="i18n-zh" markdown="1">

目前我正与导师合作孵化 [FORGE: Verifier as Teacher](/projects/2_forge_verifier_teacher/) 项目——一种目标投稿 IJCAI-27 / AAAI-28 的后训练方法，将确定性验证器的反事实搜索能力蒸馏进学生模型的参数中，使其在部署阶段无需高延迟的工具调用即可具备验证器级别的判断能力。同时我也在推进 [TraceParse](/projects/5_traceparse/)——一个面向电路原理图转网表解析的"先修复后解析"框架，目标投稿 CVPR 2027，核心发现是该任务真正的瓶颈在于候选图的结构性不可表示，而非识别精度本身。

我的兴趣聚焦于 **Agent 评测**、**自我进化系统** 与 **验证器引导学习** 的交叉领域。非常欢迎交流探讨——随时联系我。

</div>
