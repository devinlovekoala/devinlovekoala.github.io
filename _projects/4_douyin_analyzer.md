---
layout: page
title: Smart Video Ecosystem Analyzer
title_zh: 短视频生态智能分析系统
description: Five-pass multimodal analysis and weighted ecosystem scoring for short-form video platforms, powered by ByteDance Seed1.5-VL
description_zh: 面向短视频平台的五阶段多模态分析与加权生态评分系统，基于字节跳动 Seed1.5-VL 构建
img: assets/img/douyin-video-logo.png
importance: 2
category: engineering
github: https://github.com/devinlovekoala/douyin-videos-smart-analyze-workflow
---

<h2 class="i18n-en">Overview</h2>
<h2 class="i18n-zh">项目概览</h2>

<div class="i18n-en" markdown="1">

This system performs deep multi-dimensional analysis of short videos — covering content semantics, visual style, community governance signals, and distribution potential — and produces structured labels plus a quantitative ecosystem fitness score.

The core insight is that a single generic prompt cannot reliably capture all signals needed for platform-level decision making. Instead, the pipeline decomposes video understanding into **five specialized analytical passes**, runs them concurrently against ByteDance's open-source **Seed1.5-VL** multimodal model, and synthesizes results into a 12-dimension label set and a weighted [0, 1] fitness score — with **zero redundant inference calls** through result caching.

</div>

<div class="i18n-zh" markdown="1">

该系统对短视频进行深度多维度分析——涵盖内容语义、视觉风格、社区治理信号与传播潜力，并输出结构化标签与量化的生态适配度评分。

核心思路是：单一通用 Prompt 无法可靠捕捉平台级决策所需的全部信号。因此该流水线将视频理解拆解为**五个专项分析通路**，并发调用字节跳动开源的多模态模型 **Seed1.5-VL**，最终将结果汇总为 12 维标签体系与加权 [0, 1] 区间的适配度评分——并通过结果缓存实现**零冗余推理调用**。

</div>

<div class="row mt-3">
  <div class="col-sm-4 offset-sm-4">
    {% include figure.liquid path="assets/img/douyin-video-logo.png" class="img-fluid rounded z-depth-1" caption="<span class='i18n-en'>Powered by ByteDance Seed1.5-VL</span><span class='i18n-zh'>基于字节跳动 Seed1.5-VL 构建</span>" %}
  </div>
</div>

---

<h2 class="i18n-en">Five-Pass Multimodal Analysis</h2>
<h2 class="i18n-zh">五阶段多模态分析</h2>

<div class="i18n-en" markdown="1">

Rather than relying on a single generic prompt, video understanding is decomposed into five specialized passes, each backed by a purpose-designed prompt template and running concurrently via `ThreadPoolExecutor`:

</div>

<div class="i18n-zh" markdown="1">

视频理解并不依赖单一通用 Prompt，而是拆解为五个专项分析通路，每个通路都有专门设计的 Prompt 模板，并通过 `ThreadPoolExecutor` 并发执行：

</div>

| <span class="i18n-en">Pass</span><span class="i18n-zh">分析通路</span>                                | <span class="i18n-en">What It Captures</span><span class="i18n-zh">捕捉的信号</span>                                                                                 |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span class="i18n-en">Content Understanding</span><span class="i18n-zh">内容理解</span>               | <span class="i18n-en">Theme, narrative, information density, audience profiling</span><span class="i18n-zh">主题、叙事结构、信息密度、受众画像</span>                |
| <span class="i18n-en">Visual Style Recognition</span><span class="i18n-zh">视觉风格识别</span>        | <span class="i18n-en">Art style, color temperature, composition, production tier</span><span class="i18n-zh">画面风格、色温、构图、制作水准</span>                   |
| <span class="i18n-en">Community Atmosphere</span><span class="i18n-zh">社区氛围</span>                | <span class="i18n-en">Emotional valence, value orientation, health score, risk signals</span><span class="i18n-zh">情感倾向、价值导向、健康度评分、风险信号</span>   |
| <span class="i18n-en">Distribution Features</span><span class="i18n-zh">传播特征</span>               | <span class="i18n-en">Viral triggers, engagement drivers, timeliness, scene matching</span><span class="i18n-zh">爆款触发点、互动驱动因素、时效性、场景匹配度</span> |
| <span class="i18n-en">Multimodal Feature Extraction</span><span class="i18n-zh">多模态特征提取</span> | <span class="i18n-en">Cross-modal fusion: visual, motion, temporal, semantic, emotional</span><span class="i18n-zh">跨模态融合：视觉、运动、时序、语义、情感</span>  |

<div class="i18n-en" markdown="1">

All downstream modules reuse the cached inference results — no redundant API calls regardless of how many analysis steps follow.

</div>

<div class="i18n-zh" markdown="1">

所有下游模块都复用缓存的推理结果——无论后续有多少分析步骤，都不会产生重复的 API 调用。

</div>

---

<h2 class="i18n-en">12-Dimension Structured Label System</h2>
<h2 class="i18n-zh">12 维结构化标签体系</h2>

<div class="i18n-en" markdown="1">

`ContentLabelingSystem` synthesizes the five passes into a normalized, deduplicated label set across 12 semantic dimensions:

</div>

<div class="i18n-zh" markdown="1">

`ContentLabelingSystem` 将五个分析通路的结果汇总为一套归一化、去重后的标签集合，覆盖 12 个语义维度：

</div>

```
Content:      content_type · emotion · scene
Visual:       visual_style · color_tone · production_quality
User:         target_audience · interaction_type
Distribution: distribution · distribution_scene
Governance:   community_impact · content_safety
```

---

<h2 class="i18n-en">Weighted Ecosystem Fitness Score</h2>
<h2 class="i18n-zh">加权生态适配度评分</h2>

<div class="i18n-en" markdown="1">

`DouyinEcosystemAnalyzer` computes a single [0, 1] fitness score via a five-factor weighted model:

</div>

<div class="i18n-zh" markdown="1">

`DouyinEcosystemAnalyzer` 通过五因子加权模型计算出一个 [0, 1] 区间的综合适配度评分：

</div>

| <span class="i18n-en">Factor</span><span class="i18n-zh">因子</span>                   | <span class="i18n-en">Weight</span><span class="i18n-zh">权重</span> | <span class="i18n-en">Rationale</span><span class="i18n-zh">说明</span>                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| <span class="i18n-en">Viral Potential</span><span class="i18n-zh">传播潜力</span>      | 25%                                                                  | <span class="i18n-en">Primary driver of platform growth</span><span class="i18n-zh">平台增长的首要驱动因素</span>                  |
| <span class="i18n-en">Engagement Potential</span><span class="i18n-zh">互动潜力</span> | 20%                                                                  | <span class="i18n-en">Retention and interaction signal</span><span class="i18n-zh">留存与互动信号</span>                           |
| <span class="i18n-en">Content Quality</span><span class="i18n-zh">内容质量</span>      | 20%                                                                  | <span class="i18n-en">Production standard and watch-completion proxy</span><span class="i18n-zh">制作水准与完播率的代理指标</span> |
| <span class="i18n-en">Platform Fit</span><span class="i18n-zh">平台契合度</span>       | 20%                                                                  | <span class="i18n-en">Alignment with platform audience and norms</span><span class="i18n-zh">与平台受众和内容规范的契合程度</span> |
| <span class="i18n-en">Audience Appeal</span><span class="i18n-zh">受众吸引力</span>    | 15%                                                                  | <span class="i18n-en">Target-demographic resonance</span><span class="i18n-zh">与目标人群的共鸣程度</span>                         |

| <span class="i18n-en">Score</span><span class="i18n-zh">评分</span> | <span class="i18n-en">Tier</span><span class="i18n-zh">等级</span>                     |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| ≥ 0.75                                                              | <span class="i18n-en">Strongly Recommended</span><span class="i18n-zh">强烈推荐</span> |
| 0.65 – 0.74                                                         | <span class="i18n-en">Recommended</span><span class="i18n-zh">推荐</span>              |
| 0.55 – 0.64                                                         | <span class="i18n-en">Needs Optimization</span><span class="i18n-zh">待优化</span>     |
| < 0.55                                                              | <span class="i18n-en">Not Recommended</span><span class="i18n-zh">不推荐</span>        |

---

<h2 class="i18n-en">Architecture</h2>
<h2 class="i18n-zh">系统架构</h2>

```
Video files
    │
    ▼
Frame extraction (EVEN_INTERVAL, ≤30 frames, Base64)
    │
    ▼
Concurrent 5-pass VLM inference (ThreadPoolExecutor, 16 workers)
    │              └── results cached, reused downstream
    ├── Label synthesis     (ContentLabelingSystem)
    └── Ecosystem scoring   (DouyinEcosystemAnalyzer)
    │
    ▼
JSON report generation → results/
```

---

<h2 class="i18n-en">Empirical Results</h2>
<h2 class="i18n-zh">实测结果</h2>

<div class="i18n-en" markdown="1">

Evaluation on **10 real Douyin short videos** across 7 content categories.

</div>

<div class="i18n-zh" markdown="1">

在覆盖 7 个内容类别的 **10 条真实抖音短视频**上进行了评估。

</div>

| <span class="i18n-en">Metric</span><span class="i18n-zh">指标</span>                                        | <span class="i18n-en">Value</span><span class="i18n-zh">数值</span>                       |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| <span class="i18n-en">Analysis success rate</span><span class="i18n-zh">分析成功率</span>                   | **100%** (10/10)                                                                          |
| <span class="i18n-en">Average ecosystem score</span><span class="i18n-zh">平均生态评分</span>               | **0.641**                                                                                 |
| <span class="i18n-en">Highest score</span><span class="i18n-zh">最高评分</span>                             | **0.81** — <span class="i18n-en">Comedy Drama</span><span class="i18n-zh">喜剧短剧</span> |
| <span class="i18n-en">Strongly Recommended (≥ 0.75)</span><span class="i18n-zh">强烈推荐（≥ 0.75）</span>   | **2 / 10**                                                                                |
| <span class="i18n-en">Recommended or above (≥ 0.65)</span><span class="i18n-zh">推荐及以上（≥ 0.65）</span> | **6 / 10**                                                                                |

<div class="i18n-en" markdown="1">

**Key finding:** Game/esports footage scores uniformly low on viral and engagement potential (0.30) despite high audience appeal (0.80–1.00). Raw footage without commentary does not engage even a highly matched audience — a content-format gap that a single-pass generic scoring system would miss entirely.

</div>

<div class="i18n-zh" markdown="1">

**关键发现：** 游戏/电竞类素材在传播潜力与互动潜力上得分普遍偏低（0.30），尽管其受众吸引力很高（0.80–1.00）。没有解说的原始素材，即便面向高度匹配的受众也难以形成有效互动——这种内容形式上的落差，是单通路通用评分系统完全无法捕捉到的。

</div>

---

<h2 class="i18n-en">Tech Stack</h2>
<h2 class="i18n-zh">技术栈</h2>

| <span class="i18n-en">Component</span><span class="i18n-zh">组件</span>              | <span class="i18n-en">Technology</span><span class="i18n-zh">技术方案</span> |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| <span class="i18n-en">Multimodal model</span><span class="i18n-zh">多模态模型</span> | Seed1.5-VL (ByteDance)                                                       |
| <span class="i18n-en">Inference API</span><span class="i18n-zh">推理接口</span>      | Volcengine (OpenAI-compatible)                                               |
| <span class="i18n-en">Video processing</span><span class="i18n-zh">视频处理</span>   | OpenCV (cv2)                                                                 |
| <span class="i18n-en">Concurrency</span><span class="i18n-zh">并发模型</span>        | Python `ThreadPoolExecutor` (16 workers)                                     |
| <span class="i18n-en">Runtime</span><span class="i18n-zh">运行环境</span>            | Python 3.7+, Jupyter                                                         |
