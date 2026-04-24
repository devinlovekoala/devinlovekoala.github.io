---
layout: page
title: CircuitModalProcessor
description: Structure recovery for circuit schematics in RAG-Anything — 80-question benchmark across 4 electronics topics, overall answer-quality +0.030 (hybrid vs. naive)
img: assets/img/raganything-logo.png
importance: 2
category: research
github: https://github.com/devinlovekoala/RAG-Anything
---

## Overview

RAG-Anything's native `ImageModalProcessor` captions images and injects the caption text into the knowledge graph. For circuit schematics, that means component values, net names, and topological connections disappear into prose — unavailable for precise entity-level retrieval.

**CircuitModalProcessor** is a new processor in the RAG-Anything `1+3+N` framework that converts circuit diagrams into first-class KG entities and relations, building on the netlist recovery pipeline originally developed for ZhaoXi.

<div class="row mt-3">
  <div class="col-sm-4 offset-sm-4">
    {% include figure.liquid path="assets/img/raganything-logo.png" class="img-fluid rounded z-depth-1" caption="Built on RAG-Anything (HKUDS)" %}
  </div>
</div>

---

## The Core Problem

| Approach | What enters the KG | Retrievable? |
|----------|-------------------|--------------|
| Caption-only (native) | `"An inverting amplifier with feedback resistor and input resistor"` | Fuzzy text similarity only |
| CircuitModalProcessor (ours) | `R1 (resistor, 10kΩ)`, `R1 –[electrical]→ OpAmp_IN`, `OpAmp_OUT –[feedback]→ R2_in` | Exact entity-level match |

**Key insight:** structure recovery elevates domain knowledge from LLM's implicit understanding to explicit KG representation, enabling retrieval that operates directly at the component and connection level.

---

## Architecture

```
Circuit schematic (PDF page)
        │
        ├─ VLM captioning      →  circuit-level natural language description
        ├─ Netlist parsing     →  component list + net topology
        └─ Component→Entity   →  CircuitComponent / CircuitConnection dataclasses
        │
        ▼
  CircuitDesign.to_entity_info()
        │
        ├─ KG Entities:  R1 (resistor, 10kΩ)  ·  C1 (capacitor, 100nF)  ·  U1 (op_amp)
        └─ KG Relations: R1 –[electrical]→ U1_IN  ·  U1_OUT –[feedback]→ R2_in
        │
        ▼
  Dual-graph KG:
    cross-modal structure graph (circuit entities + relations)
    + native text graph (RAG-Anything standard)
```

The extension plugs into RAG-Anything's existing multimodal unified indexing, cross-modal hybrid retrieval, and graph-augmented reasoning — no disconnected side system.

---

## Benchmark Results

The current stage benchmark contains **80 Chinese QA items** across four electronics topics derived from undergraduate lecture PDFs. All four topic stores completed successfully (`multimodal_processed=true`), and E1/E2 reached **20/20 query success rate** for every topic with zero query-level errors.

### Overall answer-quality (E1, rule-based scoring)

| Condition | Score |
|-----------|------:|
| Baseline (`naive`) | 0.413 |
| Enhanced (`hybrid`) | **0.443** |
| **Delta** | **+0.030** |

### Topic-level breakdown

| Topic | Baseline | Enhanced | Delta |
|-------|--------:|--------:|------:|
| BJT | 0.347 | 0.381 | +0.034 |
| FET | 0.404 | 0.407 | +0.003 |
| Frequency domain | 0.417 | **0.492** | **+0.075** |
| Op-Amp | 0.482 | 0.493 | +0.011 |

Improvements are concentrated in **topology, reasoning, concept, and cross-modal questions**. Factoid and mapping questions are largely tied — many are answerable from direct textual evidence alone, which naturally compresses the baseline-vs-enhanced gap.

### Benchmark scope

| Topic | Source document | Questions |
|-------|----------------|----------:|
| BJT | `2024-ch2-BJTs.pdf` | 20 |
| FET | `2024-ch3-FETs-Enhance.pdf` | 20 |
| Frequency domain | `2024-ch5-frequency.pdf` | 20 |
| Op-Amp | `2024-ch8-op amp.pdf` | 20 |

---

## Phase 1 → Phase 2 Progression

**Phase 1** established the core architecture and demonstrated the key reliability gain on op-amp E2 questions: mixed retrieval 3/8 → hybrid 8/8. It also identified a chunk-level LLM worker timeout as the extraction-robustness bottleneck on dense lecture pages.

**Phase 2** addressed those gaps directly:

- Resolved the worker timeout that blocked the superposition topic in Phase 1
- Expanded from ad-hoc topic runs to a **frozen 80-question benchmark** with reference answers, rubrics, and reproducible rule-based scoring
- All four topics now complete end-to-end with no infrastructure failures

The observed improvement should be read conservatively as a **lower-bound stage signal**: undergraduate lecture slides have sparse explanations and limited visual annotations, which compresses the gap between baseline and enhanced retrieval. More demanding datasets (datasheets, design notes, SPICE reports) are expected to reveal more of the value of circuit-aware multimodal processing.

---

## Conclusions

1. Circuit-aware structured processing improves answer quality across all four topic domains.
2. Gains are strongest where structural understanding matters most — topology, reasoning, and cross-modal questions.
3. The extension is fully compatible with RAG-Anything's native architecture.
4. A reproducible benchmark and scoring pipeline are now in place for future iteration.

---

## Connection to ZhaoXi

The netlist recovery logic extends the cross-modal alignment layer built for ZhaoXi, where SPICE/Netlist descriptions and natural-language lab documents were unified into a shared embedding space. CircuitModalProcessor injects that domain knowledge into RAG-Anything as a proper first-class modal processor.

---

> Built on [HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything) — HKUDS Data Intelligence Lab
