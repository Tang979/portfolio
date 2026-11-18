---
title: "Block Puzzle"
layout: "project"
weight: 3
---

**Block Puzzle** is a classic block puzzle game for mobile. Players place block shapes onto a grid, clearing lines to score points and extend gameplay. Difficulty scales through level progression, with booster mechanics designed and balanced through iterative playtesting.

---

## 1. Project Overview

- **Genre:** Puzzle (Block / Grid)
- **Platform:** Mobile (Android / iOS)
- **Tech Stack:** Unity, C#, JSON, PlayerPrefs
- **Links:** [Github](https://github.com/nguyenkhacnhat203-dev/BlockPuzzle) | [Video Gameplay](https://www.youtube.com/shorts/lrzIIYXpP3U) | [Demo](https://tang979.itch.io/block-puzzle) | [Download APK](https://github.com/Tang979/GDD_APK_Block_Puzzle/releases)

### Design Goals

Deliver a satisfying, easy-to-learn block placement experience with meaningful progression. Each level introduces new grid constraints and block shapes, challenging players to plan placements strategically while managing limited board space.

---

## 2. Game Design

### Core Mechanics

- **Block Placement Loop:** Players drag block shapes onto a grid, clearing full rows and columns to score points and free space.
- **Win/Lose Conditions:** Reach the target score before the grid fills up to win; unable to place any remaining block to lose.
- **Progression Curve:** Levels increase grid size, introduce irregular block shapes, and tighten score targets as players advance.

### Level Design

- Level data (grid dimensions, block sets, score targets) is defined in JSON for rapid iteration.
- Early levels use open grids with simple shapes; later levels introduce pre-filled obstacles and tighter constraints.
- Difficulty ramps through grid complexity and score requirements rather than time pressure.

### Game Balancing

- **Booster System:** Undo, Rotate, and Clear Line boosters help players recover from suboptimal placements without breaking level solvability.
- **Score Model:** Points scale with lines cleared simultaneously, rewarding strategic multi-line clears.
- **Difficulty Tuning:** Iterated through playtesting to balance completion rates against player frustration.

### Playtesting & Iteration

- Conducted playtesting sessions to validate block set distribution and grid solvability.
- Adjusted block spawn rates and booster availability based on observed player behavior.
- Refined scoring thresholds to maintain engagement across skill levels.

---

## 3. Key Contributions

- Designed core gameplay loop, rules, and win/lose conditions from concept through prototype.
- Planned booster systems (Undo, Rotate, Clear Line) and in-game resource economy.
- Authored Game Design Document (GDD) documenting mechanics, level structure, and balancing parameters.
- Iterated mechanics and difficulty through structured playtesting cycles.
- Prototyped in Unity/C# with JSON-driven level configuration.

---

## 4. Game Design Document (GDD)

Authored a GDD covering:
- Core gameplay loop and win/lose conditions
- Level grid dimensions, block sets, and score targets
- Booster definitions, costs, and effects
- Difficulty progression parameters
- UI wireframes and game flow diagrams

---
