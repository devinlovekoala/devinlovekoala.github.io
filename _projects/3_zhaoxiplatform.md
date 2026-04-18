---
layout: page
title: ZhaoXi (昭析)
description: AI platform for electronics education — RAG, multimodal processing, and distillation-inspired knowledge injection
img: assets/img/drawsee-homepage.png
importance: 3
category: engineering
---

## Overview

ZhaoXi is a vertical-domain AI system built for electronics courses at BUPT, integrating retrieval-augmented generation, multimodal data processing, and a distillation-inspired knowledge injection mechanism. It serves as both a deployed production system and the origin point for the research questions pursued in NoiseFilter-RAG and CircuitModalProcessor.

**National-Level Innovation & Entrepreneurship Programme, BUPT · Apr 2024 – Present**

<div class="row mt-3">
  <div class="col-12">
    {% include figure.liquid path="assets/img/drawsee-homepage.png" class="img-fluid rounded z-depth-1" caption="ZhaoXi platform — main interface" %}
  </div>
</div>

---

## System Architecture

```
Input sources
  ├─ Course slides (PDF)
  ├─ Lab documents (PDF, scanned)
  ├─ Netlist / SPICE formal descriptions
  └─ Student queries (natural language)
          │
          ▼
  Cross-modal alignment layer
  (Unify heterogeneous inputs into shared embedding space)
          │
          ▼
  BGE-M3 embedding → Milvus vector store
          │
  ┌───────┴────────┐
  │  RAG pipeline  │   Retrieved domain context injected as
  │                │   structured "teacher signals" into base LLM
  └───────┬────────┘   (distillation-inspired: retrieval ≈ teacher,
          │             LLM ≈ student)
          ▼
  Dynamic prompt templates
  (Bridge circuit formal language ↔ natural language)
          │
          ▼
  History-aware multi-turn dialogue
          │
  Spring Boot MVC backend
  RabbitMQ + Redis Stream (high-concurrency throughput)
  Docker deployment
```

---

## Circuit Understanding

A core capability of ZhaoXi is processing circuit schematics and simulation results as first-class knowledge sources, rather than treating them as unstructured images.

<div class="row mt-3">
  <div class="col-sm-6">
    {% include figure.liquid path="assets/img/drawsee-circuit1.jpg" class="img-fluid rounded z-depth-1" caption="Circuit schematic parsing" %}
  </div>
  <div class="col-sm-6">
    {% include figure.liquid path="assets/img/drawsee-circuit2.jpg" class="img-fluid rounded z-depth-1" caption="Component-level entity extraction" %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-12">
    {% include figure.liquid path="assets/img/drawsee-digital-sim.png" class="img-fluid rounded z-depth-1" caption="Digital circuit simulation result — structured as knowledge graph input" %}
  </div>
</div>

---

## Key Results

| Metric | Value |
|--------|-------|
| Domain QA accuracy improvement | +45% over base LLM |
| End-to-end latency | ≤ 1.5s |
| Human-evaluated accuracy | 82% |
| Active users | 500+ faculty and students |
| User retention | 73% |

---

## Research Insight

Building ZhaoXi revealed a structural parallel between retrieval-augmented generation and teacher-student distillation: both inject a richer knowledge signal into a weaker model at inference time. The retrieved domain context functions as a teacher, and the base LLM functions as the student.

More practically, ZhaoXi also showed exactly where graph-structured knowledge outperforms flat-vector retrieval — and where LLM-driven extraction into knowledge graphs introduces noise without any visibility into graph quality. These two observations directly motivated NoiseFilter-RAG and CircuitModalProcessor.

---

## Technical Stack

| Layer | Technologies |
|-------|-------------|
| Embedding | BGE-M3 |
| Vector store | Milvus |
| RAG orchestration | LangChain |
| Backend | Spring Boot MVC |
| Message queue | RabbitMQ, Redis Stream |
| Deployment | Docker / Docker Compose |
| LLM | Qwen3.5-9B (LoRA/QLoRA fine-tuned, Beta) · DeepSeek-V3.2 (671B API) |
| Prompt engineering | Dynamic templates, history-aware context injection |

---

## Awards

- 🥇 **1st Prize (Beijing)** — China Collegiate Computing Contest 2024 · Project Lead
- 🥈 **2nd Prize (Beijing)** — China International Innovation Competition 2025 · Project Lead
- 🥈 **2nd Prize** — ICT Industry-Education Integration Innovation Contest 2024 · Team Lead & Technical Director
