---
title: "Data & Resource Management"
layout: "project"
weight: 1
pre: "5. "
draft: true
---

A key principle of this project is the **strict separation of data from game logic**. Game data is divided into two clear categories:

- **JSON** — Stores all game balance parameters: HP, damage, speed, cost, wave configuration. Can be modified without recompiling the project.
- **ScriptableObject / Addressables** — Stores visual assets: tower 3D model prefabs, enemy prefabs, and projectile effects.

This separation allows game balance to be tuned completely independently from visual asset changes.
