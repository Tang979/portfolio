---
title: "Effect Scaling Modes"
layout: "project"
weight: 2
pre: "4.2. "
---

### The Problem: One Number Doesn't Fit All

A DOT dealing 5 damage per second looks fine against a regular enemy. But what about a boss with 10,000 HP? That number is meaningless. Conversely, calculating as a % of max HP would be far too damaging against weak enemies.

The solution: **5 distinct damage scaling modes** for each effect, all configurable via JSON.

### Scaling Mode Reference Table

| Scaling Mode | Formula | Designed For |
|---|---|---|
| `Flat` | `Power` (fixed value) | Simple, predictable effects |
| `PercentageTowerDamage` | `TowerDamage × Power%` | Scales with tower strength, stays balanced through upgrades |
| `PercentageEnemyMaxHealth` | `MaxHP × Power%` | Counter against high HP enemies (Fire tower) |
| `PercentageEnemyCurrentHealth` | `CurrentHP × Power%` | Stronger when the enemy has more health remaining |
| `PercentageEnemyMissingHealth` | `(MaxHP - CurrentHP) × Power%` | Stronger when the enemy is near death (execute fantasy) |

```csharp
// ActiveEffect.cs
private float CalculateEffectDamage(Enemy enemy)
{
    switch (ScalingType)
    {
        case EffectScalingType.Flat:
            return Power;
        case EffectScalingType.PercentageTowerDamage:
            return SourceDamage * Power;
        case EffectScalingType.PercentageEnemyMaxHealth:
            return enemy.MaxHealth * Power;
        case EffectScalingType.PercentageEnemyCurrentHealth:
            return enemy.CurrentHealth * Power;
        case EffectScalingType.PercentageEnemyMissingHealth:
            return (enemy.MaxHealth - enemy.CurrentHealth) * Power;
        default:
            return Power;
    }
}
```

### Practical Applications

- **Fire Tower** uses `PercentageEnemyMaxHealth` → most effective against bosses, weak against small minions — creating clear tower role specialization
- **Poison Tower** uses `Flat` → stable and easy to balance during the alpha phase
- This design allows a Game Designer to completely change the feel of a tower's gameplay by modifying a single JSON value, with no code changes required
