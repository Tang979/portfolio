---
title: "Hex Tower Defense"
layout: "project"
weight: 1
---

**Hex Tower Defense** is a mobile strategy game project built to showcase advanced systems programming skills and modern Game Design thinking. The project focuses on a flexible, maintainable codebase through **Clean Architecture** and deep tactical gameplay on a hexagonal grid.

---

## Project Overview

This is not a typical tower defense game — it is a technical showcase of how to build a stable, engine-agnostic **Game Loop** with a highly scalable system architecture.

### 1. Game Design Thinking
Inspired by hex-grid Auto-Battlers (such as TFT), the game introduces a **Maze Building** mechanic — players don't just place towers, they actively shape the enemy's path. Combined with a **Merge Mechanic** that allows players to combine basic towers into more powerful, specialized ones.

### 2. System Architecture
All core logic is fully decoupled from Unity (a `Domain Layer` written in Pure C#), applying **Dependency Injection** and the **Observer Pattern**. This makes the codebase highly maintainable and enables **Unit Testing** without launching the Unity Editor.

### 3. Core Mechanics
*   **A\* Pathfinding**: A hexagonal grid pathfinding algorithm with a tie-breaker for natural-looking paths.
*   **Deadlock Prevention**: Uses BFS to guarantee players can never completely trap enemies on the map.
*   **Combat System**: Applies Strategy and Modifier Patterns to generate dozens of attack effect combinations (Chain, Splash, Burn...) purely through JSON configuration.

### 4. Status Effect System
A sophisticated `ActiveEffect` system supporting 5 different scaling modes (by % of max health, % of tower damage, etc.), enabling meaningful tactical differentiation between Fire, Ice, Lightning, and Poison towers.

### 5. Data & Resource Management
The project applies a **Data-Driven** approach: game balancing via JSON and asset management (Models, VFX) via **Unity Addressables**. Combined with **Object Pooling** to eliminate stuttering caused by Garbage Collection on mobile devices.

### 6. Performance Optimization
Uses **Procedural HexMesh** to render the entire map in a single Draw Call, and replaces Unity's heavy Physics system with logical coordinate calculations to handle range detection and collision interactions.

---
{{< video src="https://pub-f6cbf98bec4b4b6783bd5dad847daa28.r2.dev/Demo.mp4" >}}
---

> [!IMPORTANT]
> **Technical Focus:**
> This project is a **Technical Prototype (Alpha)**. 100% of resources were invested in building a **Scalable Architecture** and **pure Gameplay Logic**. As a result, the VFX and UI systems currently use basic placeholders to prioritize performance optimization and code cleanliness.

---
