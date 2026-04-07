---
title: "Performance & Mobile Optimization"
layout: "project"
weight: 1
pre: "6. "
---

Every technical decision in this project was made with **mid-range mobile device performance** in mind. The two most significant optimization strategies:

- **Procedural HexMesh** — Renders the entire hex map using a single mesh instead of hundreds of individual GameObjects
- **Trigger-based Range Detection** — Uses Unity's SphereCollider triggers and logical coordinates for interaction handling, avoiding Unity Physics overhead
