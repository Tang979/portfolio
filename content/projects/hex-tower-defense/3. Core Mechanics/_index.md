---
title: "Core Mechanics Implementation"
layout: "project"
weight: 1
pre: "3. "
---

This section dives deep into the algorithms and core mechanics that power Hex Tower Defense gameplay. This is where the design decisions from Game Design Overview are translated into working code.

- **A\* Pathfinding on Hex Grid** — Shortest path algorithm with a custom tie-breaker
- **Dynamic Path Recalculation** — How enemies find a new path when the map changes
- **BFS Deadlock Prevention** — Ensuring a valid path always exists for enemies
- **Combat System** — Strategy Pattern and Modifier Pattern in the combat system
