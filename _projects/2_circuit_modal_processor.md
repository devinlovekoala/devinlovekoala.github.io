---
layout: page
title: CircuitModalProcessor
description: Structure recovery for circuit schematics in RAG-Anything — Phase 1 validated with measurable task-level gains on op-amp and BJT domains
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

The circuit extension plugs into RAG-Anything's existing multimodal unified indexing, cross-modal hybrid retrieval, and graph-augmented reasoning — no disconnected side system.

---

## Phase 1 Results

Phase 1 evaluated the pipeline on electronic-circuit lecture PDFs across three topic-specific stores: **operational amplifiers**, **BJTs**, and source transformation/superposition.

### Headline result — Op-Amp rich run

The strongest evidence came from the op-amp topic store. E2 (circuit-focused QA) showed a clear reliability jump:

| Condition | E2 Success | Avg Latency (s) | Avg Answer Length |
|-----------|-----------|-----------------|-------------------|
| **Hybrid** (CircuitModalProcessor) | **8 / 8** | 54.9 | 912 |
| Mix (weaker retrieval) | 3 / 8 | 49.2 | 754 |

**3/8 → 8/8** on circuit-specific questions is the primary Phase 1 milestone. It shows structured circuit understanding improves task completion reliability, not just answer verbosity.

Full op-amp results (both experiment themes):

| Experiment | Condition | Success | Avg Latency (s) | Avg Length |
|------------|-----------|--------:|----------------:|-----------:|
| E1 | Hybrid | 8 / 8 | 79.4 | 1207 |
| E1 | Naive | 8 / 8 | 40.8 | 707 |
| E2 | **Hybrid** | **8 / 8** | **54.9** | **912** |
| E2 | Mix | 3 / 8 | 49.2 | 754 |

### Op-Amp v3 (faster embedding stack)

After switching to the faster embedding setup, latency dropped substantially while reliability held:

| Experiment | Condition | Success | Avg Latency (s) |
|------------|-----------|--------:|----------------:|
| E1 | Hybrid | 8 / 8 | 11.8 |
| E1 | Naive | 8 / 8 | 12.4 |
| E2 | Hybrid | 8 / 8 | 0.7 |
| E2 | Mix | 8 / 8 | 48.9 |

### BJT topic

The BJT results validate that the gains are not limited to one lecture:

| Experiment | Condition | Success | Avg Latency (s) | Avg Length |
|------------|-----------|--------:|----------------:|-----------:|
| E1 | Hybrid | 7 / 8 | 16.8 | 1238 |
| E1 | Naive | 8 / 8 | 59.9 | 984 |
| E2 | **Hybrid** | **8 / 8** | **2.8** | **1195** |
| E2 | Mix | 7 / 8 | 14.9 | 1155 |

Hybrid retrieval on circuit-focused E2 questions again reached 8/8, confirming Phase 1 generalization across circuit subdomains.

### Known limitation

The superposition/source-transformation topic did not complete — chunk-level LLM worker timeout (600 s) during extraction. This isolates the next bottleneck precisely: extraction robustness on dense, long-form lecture pages, not architectural wiring.

---

## Phase 1 Conclusions

Three evidence-backed conclusions:

1. Circuit-aware structured processing improves answer reliability on circuit-specific QA vs. weaker mixed retrieval.
2. The extension is compatible with RAG-Anything's native architecture — multimodal unified indexing, cross-modal hybrid retrieval, and graph-augmented reasoning all benefit.
3. Topic-specific deployment is the most dependable evaluation mode for this vertical at current maturity.

---

## Phase 2 Priorities

- Chunk-level fallback strategies for dense lecture pages before extraction timeout
- Formal domain QA benchmark aligned to the actual lecture set
- Separate answer-quality failure from infrastructure failure in experiment summaries
- Retrieval diagnostics specialized for circuit terminology, component names, and topology language

---

## Connection to ZhaoXi

The netlist recovery logic extends the cross-modal alignment layer built for ZhaoXi, where SPICE/Netlist descriptions and natural-language lab documents were unified into a shared embedding space. CircuitModalProcessor injects that domain knowledge into RAG-Anything as a proper first-class modal processor.

---

> Built on [HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything) — HKUDS Data Intelligence Lab
