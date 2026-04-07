---
title: "Core Concept & Game Loop"
layout: "project"
weight: 2
pre: "1.1. "
---

### Game Overview

Hex Tower Defense is a tactical tower defense game played on a hexagonal grid. Its biggest differentiator from conventional TD games lies in two mutually reinforcing mechanics: **maze building** and the **merge mechanic**.

### Core Game Loop

1. **Place defensive towers** — The player selects a tower from a 5-tower loadout and places it on the hex map
2. **Defeat enemy waves** — Enemies move autonomously along the shortest path to the target; towers attack automatically within range
3. **Earn currency & buy more towers** — Every enemy that dies (or even reaches the target) yields a currency reward
4. **Merge towers for power** — Hold a tower on the map for about 1 second (long press) then drag it onto another tower, or drag a tower directly from the UI onto a map tower, to create a stronger merged tower
5. **Win or lose** — If an enemy reaches the target: the base loses HP. Base HP hits zero = defeat. Clear all waves = victory.

### The Differentiator: Maze Building

In traditional TD games, players place towers beside a pre-fixed path. In Hex Tower Defense, **placing a tower IS building the path**.

Players can block enemy routes by placing towers in their way, forcing enemies to find longer detours — increasing the time enemies spend within tower range. The system guarantees at least one valid path always exists from each spawn point to the target (BFS deadlock prevention), maintaining fairness while deepening tactical possibilities.

### Design Goal

I wanted players to feel like they are *genuinely* building a strategy, not simply dropping towers into fixed slots. Every decision — where to place a tower, which towers to merge, when to create a longer detour — carries weight and creates new situations.
