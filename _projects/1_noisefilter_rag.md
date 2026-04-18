---
layout: page
title: NoiseFilter-RAG
description: Graph noise diagnosis and confidence-aware retrieval for LightRAG
img: assets/img/lightrag_logo.png
importance: 1
category: research
github: https://github.com/devinlovekoala/NoiseFilter-RAG
---

## Overview

LightRAG (EMNLP 2025) builds knowledge graphs via LLM-driven entity extraction. That extraction step hallucinates — introducing wrong edges, redundant neighbors, and polluted retrieval context that the original paper's answer-level evaluation does not directly expose.

This project builds a full diagnostic and filtering layer on top of LightRAG's graph pipeline, turning it into a reproducible noise-governance study with confidence scoring, noise-aware retrieval, and intermediate diagnostics at graph level, judge level, and answer level.

<div class="row mt-3">
  <div class="col-sm-4 offset-sm-4">
    {% include figure.liquid path="assets/img/lightrag_logo.png" class="img-fluid rounded z-depth-1" caption="Built on LightRAG (HKUDS, EMNLP 2025)" %}
  </div>
</div>

---

## Stage 1 Results

Manual annotation on 100 sampled edges per variant (formal `mix` dataset):

| Metric | Baseline | NoiseFilter | Δ |
|--------|----------|-------------|---|
| Strict precision | 0.15 | **0.22** | +0.07 |
| Lenient precision | 0.50 | **0.57** | +0.07 |
| Pairwise overall win rate | 0.4385 | **0.4615** | +0.023 |

**Interpretation:** NoiseFilter improves graph-edge precision by a measurable margin. The method is not a no-op. The gain at answer level is weaker than at graph level — which is exactly why this project separates the two evaluation tracks.

Source-grounded judge (ROC AUC 0.5413 → 0.5497) is operational as a diagnostic instrument, with calibration ongoing.

---

## Stage 2: Full-Pipeline Noise Governance

Stage 1 proved the direction. Diagnostic work then showed the bottleneck is not post-hoc scoring, but upstream extraction quality. Stage 2 targets three structural causes:

**Main line A — Upstream extraction quality**
- **A1 (P0):** Chunk-entity binding gate — intercept hallucinated edges before graph insertion by verifying that extracted entities are genuinely supported by their source chunk
- **A2 (P0):** Extraction prompt constraints — suppress over-inference and cross-document hallucination at the LLM prompt level

**Main line B — Graph structure repair**
- **B1 (P1):** Relation directionality preservation — fix direction collapse in storage, aggregation, and confidence computation so `(A, rel, B)` and `(B, rel, A)` are distinguishable

**Main line C — Evaluation infrastructure**
- **C1–C4 (P1/P2):** Stable source-grounded judge calibration, NLI signal recalibration, separated graph-layer vs. answer-layer feedback loops

---

## Engineering Deliverables

**Core modules**
- `lightrag/noisefilter/confidence.py` — confidence scoring engine
- `lightrag/noisefilter/retriever.py` — noise-aware retrieval filter
- `lightrag/noisefilter/benchmark.py` — synthetic noise injection and evaluation
- `lightrag/noisefilter/reproduction.py` — formal reproduction utilities

**Formal reproduction runners**
- Dual-run baseline / noisefilter pipelines
- Pairwise LLM judge evaluation
- Graph-quality sampling and manual labeling tooling
- Relation directionality and source-binding audit scripts
- Source-grounded judge with configurable source modes

---

## Why This Matters

The project demonstrates more than model calling or script orchestration:

- End-to-end experiment design with reproducible benchmarking
- Quantitative diagnosis rather than intuition-only debugging
- Disciplined separation of stable evaluation paths vs. experimental prototypes
- Evidence-backed decisions at each stage transition (Stage 1 → Stage 2 pivot was driven entirely by diagnostic data, not intuition)

---

## Built On

> [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) — Guo et al., EMNLP 2025
