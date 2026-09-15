---
layout: about
title: about
permalink: /
subtitle: >
  Undergraduate · <a href="https://www.bupt.edu.cn/" target="_blank">Beijing University of Posts and Telecommunications</a> ·
  Telecommunications Engineering

profile:
  align: right
  image: prof_pic_color.png
  image_circular: false
  more_info: >
    <p>📧 liuyuxuanlovept@bupt.edu.cn</p>
    <p>📍 Beijing, China</p>
    <p>🎓 B.Eng. 2023 – 2027 (Expected)</p>
    <p>🔗 <a href="https://drawsee.cn" target="_blank">drawsee.cn</a></p>

news: true
selected_papers: false
social: true
---

I am a third-year undergraduate in Telecommunications Engineering at [Beijing University of Posts and Telecommunications (BUPT)](https://www.bupt.edu.cn/), and the founder & backend lead of [Drawsee (昭析)](https://drawsee.cn) — a complete AI Agent platform for circuit-design education, deployed to 500+ faculty and students. I have owned the entire backend from the first commit: over 330 commits, more than 90% of the repository's history.

Drawsee integrates three systems I designed and built from scratch: a closed-loop agent workflow (**Plan → Generate → Structured Verification → Repair → Archive**) that uses a deterministic simulator instead of model self-evaluation; a canary-gated self-improvement loop that clusters user feedback into optimization candidates and validates them with statistical significance testing; and **TestLab**, an in-house Agent evaluation harness built around a deterministic-replay engine that traces any Agent decision to its exact point of deviation.

<div class="row mt-3">
  <div class="col-sm-8 offset-sm-2">
    {% include figure.liquid path="assets/img/drawsee-circuit-agent-demo.png" class="img-fluid rounded z-depth-1" caption="Drawsee's circuit-design agent workspace — see the full <a href='/projects/3_zhaoxiplatform/'>project page</a>" %}
  </div>
</div>

Together with my advisor, I am now incubating [FORGE: Verifier as Teacher](/projects/2_forge_verifier_teacher/), a post-training method — targeting IJCAI-27 / AAAI-28 — that distills a deterministic verifier's counterfactual search into a student model's weights, so it can achieve verifier-quality judgment without expensive tool calls at deployment.

My interests sit at the intersection of **agent evaluation**, **self-improving systems**, and **verifier-guided learning**. I am always happy to talk shop — feel free to reach out.