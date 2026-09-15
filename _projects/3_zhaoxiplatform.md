---
layout: page
title: Drawsee (昭析)
description: A multimodal AI Agent platform for circuit-design education — closed-loop agent workflow, canary-gated self-improvement, and an in-house evaluation harness
img: assets/img/drawsee-homepage.png
importance: 1
category: engineering
github: https://github.com/devinlovekoala
---

## Overview

Drawsee is a complete AI Agent platform for electronics education, built from the first commit as a personal project and now deployed to 500+ faculty and students at BUPT. I am the sole backend owner: system architecture, every core backend module, and every piece of infrastructure below trace back to over 330 commits — more than 90% of the repository's history.

**Founder & Backend Lead (Personal Project) · Mar. 2025 – Present · [drawsee.cn](https://drawsee.cn)**

**Tech stack:** Spring Boot 3.4 · LangChain4j · Qdrant · MySQL · Redis · RabbitMQ · MinIO

<div class="row mt-3">
  <div class="col-12">
    {% include figure.liquid path="assets/img/drawsee-homepage.png" class="img-fluid rounded z-depth-1" caption="Drawsee — main platform interface" %}
  </div>
</div>

---

## Circuit-Design Agent Closed-Loop Workflow

Designed from scratch a closed-loop agent architecture — **Plan → Generate → Structured Verification → Repair → Archive** — that turns vague circuit requirements into structured specs and interface contracts. A deterministic simulator, not model self-evaluation, performs functional-level verification, and the loop automatically enters a rule-based repair-and-reverify cycle on failure.

The loop's termination policy is abstracted into stateless pure functions, so the core decisions — when to stop, when to escalate to a human, when to declare failure — can be tested and evolved independently of both the sandbox and the LLM.

<div class="row mt-3">
  <div class="col-12">
    {% include video.liquid path="assets/video/drawsee-circuit-agent-demo.mp4" class="img-fluid rounded z-depth-1" autoplay=true loop=true muted=true controls=true caption="Circuit-design agent workspace — plan, generate, verify, repair" %}
  </div>
</div>

```
Requirement (natural language)
        │
        ▼
     Plan            structured spec + interface contract
        │
        ▼
   Generate          candidate circuit design
        │
        ▼
Structured Verify     deterministic simulator, not self-evaluation
        │
   pass │ fail
        │    └──────► Repair (rule-based) ──► reverify (loop)
        ▼
     Archive
```

---

## Drawsee Self-Improvement System

Led the design and implementation of a fully automated self-optimization loop: **issue discovery → candidate generation → canary validation → auto-promotion/rollback.** User feedback is auto-clustered into optimization candidates, gated by review, then canary-released. Effectiveness is judged with statistical significance testing — a two-proportion sequential test — instead of manual judgment.

I fixed three statistical/attribution defects in the prior implementation that had been producing incorrect conclusions, giving the product continuous self-iteration without manual case-by-case review.

<div class="row mt-3">
  <div class="col-sm-8 offset-sm-2">
    {% include figure.liquid path="assets/img/drawsee-admin-console.png" class="img-fluid rounded z-depth-1" caption="Admin console — canary review and rollout controls" %}
  </div>
</div>

---

## In-House Agent Evaluation Harness (TestLab)

Designed and built the team's general-purpose Agent evaluation infrastructure from zero: custom orchestration for eval tasks, environment isolation and credential management, and a **deterministic-replay evaluation engine** that lets any Agent decision be replayed step by step, fingerprint-compared, and traced to the exact point of deviation.

This turns "is this eval result trustworthy" into an engineering property that tests can guard long-term. TestLab also runs the structured recording/export pipeline for Agent execution traces, turning live interactions into data assets directly usable for model training.

```
Agent execution
      │
      ├─ trajectory recording   → structured trace log
      ├─ environment isolation  → per-task sandbox + credentials
      │
      ▼
Deterministic replay engine
      │
      ├─ step-by-step replay
      ├─ fingerprint comparison
      └─ deviation point tracing
      │
      ▼
Exported trace data → training-data pipeline
```

---

## Backend Foundation Architecture

Independently owned technology selection and platform build-out for the entire backend:

| Layer | Technology |
|-------|-----------|
| Model orchestration | Unified routing + dynamic context-budget management across Qwen / DeepSeek |
| RAG pipeline | Qdrant vector store + hybrid retrieval |
| Async tasks | RabbitMQ, multiple worker types |
| Streaming | Redis Stream + SSE |
| Object storage | MinIO |
| Migrations | Flyway (versioned) |
| Auth | Sa-Token |
| CI/CD | Multi-environment GitHub Actions pipelines |

This foundation is what the self-improvement system and TestLab were later built on top of.

<div class="row mt-3">
  <div class="col-sm-6">
    {% include figure.liquid path="assets/img/drawsee-classroom-rag.png" class="img-fluid rounded z-depth-1" caption="Classroom RAG — retrieval-grounded Q&A" %}
  </div>
  <div class="col-sm-6">
    {% include figure.liquid path="assets/img/drawsee-thinking-canvas.png" class="img-fluid rounded z-depth-1" caption="Thinking canvas — agent reasoning trace" %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-12">
    {% include figure.liquid path="assets/img/drawsee-course-center.png" class="img-fluid rounded z-depth-1" caption="Course center — student-facing learning space" %}
  </div>
</div>

---

## Product Metrics

| Metric | Value |
|--------|-------|
| Active users | 500+ faculty and students |
| Domain QA accuracy improvement | +45% over base LLM |
| End-to-end latency | ≤ 1.5s |
| Human-evaluated accuracy | 82% |
| User retention | 73% |

---

## Awards

- 🥈 **2nd Prize (Beijing)** — China International College Students' Innovation Competition, "Guochuang Cup" · 2025
- 🥇 **1st Prize (Beijing)** — China Collegiate Computer Design Competition · 2024
- 🥈 **2nd Prize** — National University-Industry ICT Education Integration Competition · 2024
