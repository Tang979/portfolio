---
title: "Hex Grid as a Design Tool"
layout: "project"
weight: 2
pre: "1.2. "
---

### Why Hex?

The idea of using a hex grid was inspired by the battlefield of **Teamfight Tactics (TFT)** — where hex tiles create movement that feels noticeably smoother and more natural than a standard square grid.

The most important property of a hex tile is that **the distance to all 6 neighbors is equal**. This means that when an object changes direction on a hex grid, the movement looks logical and linear — unlike square grids where diagonal movement feels "off" perceptually.

### Impact on Gameplay

With **6 directions** instead of 4 on a square grid, the design implications are clear:

- **More complex mazes**: Players have 2 additional directions to block — mazes can curve, zigzag, and create far more surprising situations than a square grid allows
- **More diverse map shapes**: Hex grids enable unique map shapes not constrained by rectangles
- **More intuitive range display**: A tower's circular range naturally aligns with the hex shape, avoiding the strange "dead corner" cases of square grids

### Technical Challenges from This Design Decision

Choosing a hex grid introduced a series of technical challenges — from calculating offset coordinates (odd/even column offset) and designing the A* algorithm for hex geometry, to generating a procedural mesh — all of which are covered in detail in the sections that follow.
