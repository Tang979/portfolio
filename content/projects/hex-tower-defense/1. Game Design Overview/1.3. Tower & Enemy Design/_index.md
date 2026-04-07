---
title: "Tower & Enemy Design"
layout: "project"
weight: 2
pre: "1.3. "
---

> [!NOTE]
> The Tower and Enemy systems are designed with a **Data-Driven** approach, allowing all stats, effects, and special logic to be customized through JSON configuration without touching source code.

### Design Philosophy & Stats System

Each tower type is built around a core stat set (Damage, Range, Attack Cooldown, Cost) and a flexible **Modifiers/Effects** system that creates meaningful tactical differentiation.

#### Tower Roster & Signature Mechanics

| Tower Type | Attack Mechanism | Special Effects & Modifiers | Tactical Role |
|---|---|---|---|
| **Fire** | Projectile | **DOT**: 5% of Max HP every 0.25s | Tank Buster — effective against high HP enemies |
| **Ice** | Projectile | **Slow**: 15% movement speed reduction for 3s | Support/Control — keeps enemies in range longer |
| **Poison** | AoE / Trap | **DOT (Flat)**: 5 armor-piercing damage every 0.25s | Crowd Control at chokepoints |
| **Lightning** | Instant | **Chain Modifier**: Bounces to 2 additional targets (Bounce Radius: 2) | High-speed DPS (0.15s cooldown), rapidly clears groups |
| **Rock** | Projectile | **Splash Modifier**: 30% chance to trigger area blast (Radius: 0.5) | Burst damage — devastates tightly packed enemy formations |

#### Hybrid (Merged) Towers
A standout in the system is the **Fire & Ice** tower, showcasing the flexibility of `AlternatingEffectModifier`:
- **Mechanism**: Fire and ice projectiles alternate on each shot (both visually and in logic).
- **Effect**: Combines both **DOT (10% HP)** and powerful slow (30%), making it the most versatile tower in the game.

### Enemy Design & Visual Feedback

Enemies aren't just moving health bars — they are tightly integrated with the tower logic system:

1. **Animation Speed Scaling**: Enemy movement and hit animations are synchronized in real-time with the `Speed` attribute. When slowed by an Ice tower, the enemy doesn't just move slower — their animations become visibly heavier, creating a satisfying and intuitive visual response.
2. **Resource Reward Mechanic**:
    - **Fully eliminated**: Player receives 100% of the currency reward.
    - **Reaches the target (Leak)**: Player still receives 50% of the reward. This is a deliberate Game Design decision — it gives players a chance to "recover" economically after a breach, reducing frustration and softening the negative feedback loop.

### Balancing Workflow
All of the above parameters are centrally managed in JSON configuration files. The optimization process is:
- **Data-Logic Separation**: The code acts as a runtime engine — reading Modifiers and applying Effects. **Game Balancing** and **Pacing** are performed entirely within JSON files, allowing rapid playtesting and fine-tuning without recompiling the source.
