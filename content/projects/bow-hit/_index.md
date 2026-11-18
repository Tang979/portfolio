---
title: "Bow Hit"
layout: "project"
weight: 4
---

**Bow Hit** is a precision-based arcade archery game for mobile. Players aim and shoot at moving targets, with gameplay flow and win/lose conditions tuned through data-driven iteration.

---

## 1. Project Overview

- **Genre:** Arcade (Archery / Reflex)
- **Platform:** Mobile (Android / iOS)
- **Tech Stack:** Unity, C#, JSON
- **Links:** [Github](https://github.com/nguyenkhacnhat203-dev/BowGame2D) | [Video Gameplay](https://www.youtube.com/shorts/F9uFyXbLhtk) | [Demo](https://tang979.itch.io/bow-hit) | [Download APK](https://github.com/Tang979/GDD_APK_Bow_Hit/releases)

### Design Goals

Create a tight, reflex-driven arcade experience where precision and timing are rewarded. Each level increases target speed, movement complexity, and accuracy requirements, pushing player skill progressively.

---

## 2. Game Design

### Core Mechanics

- **Aim-and-Shoot Loop:** Players draw back a bow, aim at moving targets, and release to shoot. Timing and accuracy determine hits.
- **Win/Lose Conditions:** Hit the required number of targets within the time/shot limit to win; miss the quota to lose.
- **Progression Curve:** Target speed increases, movement patterns become more complex, and shot quotas tighten with each level.

### Level Design

- Target movement patterns (linear, oscillating, random) are defined via JSON for quick iteration.
- Early levels feature slow, predictable targets; later levels introduce multi-target sequences and environmental constraints.
- Difficulty ramps through target velocity, pattern complexity, and precision requirements.

### Game Balancing

- **Shot Economy:** Limited arrows per level force players to prioritize accuracy over spam.
- **Scoring Model:** Points scale with target difficulty and combo streaks, rewarding precision.
- **Difficulty Tuning:** Iterated through playtesting to balance challenge against player retention.

### Playtesting & Iteration

- Conducted playtesting to validate target speed curves and shot quota fairness.
- Adjusted aim assist sensitivity and target hitbox sizes based on observed miss rates.
- Refined feedback cues (visual/audio) to improve shot timing perception.

---

## 3. Key Contributions

- Designed core gameplay mechanics, rules, and win/lose conditions from concept through prototype.
- Planned gameplay flow, target movement patterns, and scoring systems.
- Authored Game Design Document (GDD) documenting mechanics, level structure, and balancing parameters.
- Iterated mechanics and difficulty through structured playtesting cycles.
- Prototyped in Unity/C# with JSON-driven level configuration.

---

## 4. Game Design Document (GDD)

Authored a GDD covering:
- Core gameplay loop and win/lose conditions
- Target movement patterns and shot quota parameters
- Scoring model and combo mechanics
- Difficulty progression parameters
- UI wireframes and game flow diagrams

---
