---
title: "Shoe Sort Puzzle"
layout: "project"
weight: 2
---

**Shoe Sort Puzzle** is a mobile sorting puzzle game. Players must move and match three identical shoes into a single box to clear them from the level before time runs out.

---

## 1. Project Overview

- **Genre:** Puzzle (Match-3 / Sorting)
- **Platform:** Mobile (Android / iOS)
- **Tech Stack:** Unity, C#, JSON, DOTween, PlayerPrefs
- **Links:** [Github](https://github.com/nguyenkhacnhat203-dev/Shoe_Sort_Puzzle) | [Gameplay Video](https://youtube.com/shorts/KJ3jWdtoe6w) | [Demo](https://tang979.itch.io/shoe-sort-puzzle) | [Download APK](https://github.com/Tang979/GDD_APK_Shoe_Sort_Puzzle/releases)

### Design Goals

To provide a simple yet engaging puzzle experience focused on observation and organization. Each level features a dynamic time limit based on difficulty, making it accessible yet challenging.

---

## 2. Game Design

### Core Mechanics

- **Match-3 Sorting Loop:** Players drag and drop shoes into boxes, clearing groups of three identical shoes to progress.
- **Win/Lose Conditions:** Clear all shoes before the timer expires to win; run out of time or valid moves to lose.
- **Progression Curve:** Dynamic time limits scale with level difficulty, ramping challenge as players master the sorting mechanic.

### Level Design

- Levels are defined via JSON, enabling rapid iteration on box counts, shoe distributions, and time limits without code changes.
- Each level guarantees at least one valid first move and avoids spawning pre-matched triples, ensuring a fair start.
- Difficulty increases through additional boxes, more shoe types, and tighter time constraints.

### Game Balancing & Economy

- **Booster System:** Magnet, Shuffle, and Add Box boosters designed to resolve stuck states without breaking level solvability.
- **Resource System:** Heart (stamina) and Gold (currency) with time-based recovery; hearts deducted on loss or mid-level quit.
- **Difficulty Tuning:** Iterated through playtesting sessions to optimize completion rates and session length.

### Playtesting & Iteration

- Conducted structured playtesting to validate level solvability and difficulty perception.
- Adjusted booster availability and resource costs based on observed player behavior and drop-off points.
- Refined UI popups and hint timing to reduce friction for new players.

---

## 3. Key Contributions

I was responsible for developing the core gameplay and overarching systems:

- **Level Initialization:** Implemented a system to read level data from JSON, generating boxes and shoes, and randomizing their distribution safely.
- **Input System:** Developed robust Drag & Drop and Tap-to-Move mechanics, handling input conflicts gracefully.
- **Game State Manager:** Managed game states (Menu, OnGame, Pause, Win, Lose) and synchronized TimeScale, ensuring inputs are only processed during active gameplay.
- **Booster System:** Engineered logic for in-game assists (Magnet, Shuffle, Add Box) that strictly maintain valid gameplay states.
- **Resource & Energy Manager:** Built a stamina (Heart) and currency (Gold) system with time-based recovery, penalizing players correctly for quitting or losing.
- **UI & Game Flow:** Created intuitive popups for purchasing resources and an automated Hint system.

---

## 4. Game Design Document (GDD)

Authored a comprehensive GDD covering:
- Core gameplay loop and win/lose conditions
- Level structure and progression parameters
- Booster definitions, costs, and effects
- Resource economy (Heart/Gold) and recovery rates
- UI wireframes and game flow diagrams

---

## 5. Technical Challenges

### 5.1. Valid Random Generation

Designed an algorithm to distribute shoes randomly while guaranteeing:
- No box spawns with three identical shoes already matched.
- At least one empty slot is always available for the first move.

### 5.2. Data Flow Management (Box & Shelf)

Developed synchronous logic between the active Boxes and the waiting Shelves. After a successful match, waiting shoes from the shelf are pushed to the box with seamless animations, shifting the queue without breaking state.

### 5.3. Input & Animation Synchronization

Utilized **DOTween** for smooth transitions. The system ensures that logic states only update after animations conclude, preventing bugs caused by rapid inputs or using both Drag & Drop and Tap controls simultaneously.

### 5.4. State-Safe Boosters

Boosters like Shuffle or Add Box directly manipulate the level's data structure. I architected these abilities so that they always leave the game in a mathematically valid and playable state without causing logical errors.

---

{{< youtube id="KJ3jWdtoe6w" >}}
