---
layout: page
title: CircuitModalProcessor
description: Structure recovery for circuit schematics in RAG-Anything
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
| CircuitModalProcessor (ours) | `R1 (resistor, 10kΩ)`, `R2 (resistor, 100kΩ)`, `R1 –[electrical]→ OpAmp_IN`, `OpAmp_OUT –[feedback]→ R2_in` | Exact entity-level match |

**Key insight:** structure recovery elevates domain knowledge from LLM's implicit understanding to explicit KG representation, enabling retrieval that operates directly at the component and connection level rather than relying on embedding-space similarity of caption prose.

---

## Architecture

```
Circuit schematic (PDF page)
        │
        ├─ VLM captioning      →  circuit-level natural language description
        ├─ Netlist parsing     →  component list + net topology
        └─ Component→Entity   →  CircuitComponent dataclass per element
                                  CircuitConnection dataclass per edge
        │
        ▼
  CircuitDesign.to_entity_info()
        │
        ├─ KG Entities:  R1 (resistor, 10kΩ, pins=[in, out])
        │                C1 (capacitor, 100nF)
        │                U1 (op_amp, LM741)
        │                inverting_amplifier (circuit_design)
        │
        └─ KG Relations: R1 –[electrical, net_vin]→ U1_IN
                         U1_OUT –[feedback, net_vout]→ R2_in
                         R1 –[belongs_to]→ inverting_amplifier
        │
        ▼
  Dual-graph KG:
    cross-modal structure graph (circuit entities + relations)
    + native text graph (LightRAG standard)
```

---

## Connection to ZhaoXi

The netlist recovery logic here directly extends the cross-modal alignment layer built for ZhaoXi, where SPICE/Netlist formal descriptions and natural-language lab documents were unified into a shared embedding space. CircuitModalProcessor takes that domain knowledge and injects it into RAG-Anything as a proper first-class modal processor rather than a preprocessing hack.

---

## Experiment Design

3-way comparison on circuit-domain PDF documents:

| Query type | Text-only LightRAG | RAG-Anything native | CircuitModalProcessor |
|------------|-------------------|---------------------|-----------------------|
| Component-value (`"What is the value of R1?"`) | — | — | — |
| Topology (`"What is the feedback path?"`) | — | — | — |
| Cross-modal reasoning (`"Does the gain formula in the text match the circuit?"`) | — | — | — |

*Results to be updated on experiment completion.*

Evaluation metrics: entity coverage (precision / recall / F1), retrieval recall, LLM-as-judge on accuracy / completeness / specificity / cross-modal integration.

---

## Built On

> [HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything) — HKUDS Data Intelligence Lab
