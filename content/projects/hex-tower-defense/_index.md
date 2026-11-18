---
title: "Hex Tower Defense"
layout: "project"
weight: 1
---

**Hex Tower Defense** is a tactical tower defense game designed around one question: *what if the player builds the path, not just the towers?* It blends **maze building** with a **merge mechanic** on a hexagonal grid, putting deep player decision-making at the center of every wave.

---

## Project Overview

Hex Tower Defense is not about placing towers along a fixed path. It is about **shaping the battlefield itself**. Every tower placed becomes a wall that reroutes enemies; every merge sacrifices board control for concentrated firepower. The player is a strategist first, a commander second.

### 1. Game Design Pillars

**Maze Building — The player is the level designer.**  
Placing a tower *is* building the path. Enemies always seek the shortest route to the target, so every tower acts as a movable wall. Players create winding detours, choke points, and kill zones — but they must always leave at least one valid path open (fairness by design).

**Merge Mechanic — Power vs. Control.**  
Five basic towers enter each match. Through merging, players unlock a hidden tree of stronger hybrids. But merging removes one tower from the map, potentially breaking a carefully crafted maze. The core tension: *do I keep board control, or concentrate firepower at a single point?*

**Data-Driven Balance.**  
Tower stats, enemy waves, and merge recipes all live in JSON. This lets the designer tune pacing, difficulty curves, and rock-paper-scissors relationships without touching code — enabling rapid iteration and playtesting.

### 2. Core Mechanics at a Glance

*   **A* Pathfinding on Hex** — Natural-looking enemy movement across 6 directions, with tie-breakers for readable paths.
*   **Deadlock Prevention** — BFS guarantees a route always exists; players can trap enemies but never soft-lock the level.
*   **Combat System** — Strategy + Modifier patterns via JSON enable Chain, Splash, Burn, Slow, and DOT combinations without hardcoding each tower.
*   **Status Effects** — 5 scaling modes create clear tactical identities: Fire melts tanks, Ice controls space, Lightning deletes clumps, Poison holds chokepoints.
*   **Procedural HexMesh** — Entire map renders in one Draw Call; logic replaces heavy physics for mobile performance.
*   **Object Pooling** — Zero GC stutter during intense waves.

---

{{< video src="https://pub-f6cbf98bec4b4b6783bd5dad847daa28.r2.dev/Demo.mp4" >}}

---

> [!IMPORTANT]  
> **Designer Note:**  
> This is a **Technical Prototype (Alpha)** built to prove scalable architecture and pure gameplay logic. VFX and UI use intentional placeholders so that performance and code cleanliness take priority during this phase.
