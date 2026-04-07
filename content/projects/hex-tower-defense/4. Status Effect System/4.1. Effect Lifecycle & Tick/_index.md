---
title: "Effect Lifecycle & Tick System"
layout: "project"
weight: 2
pre: "4.1. "
---

### Designing an Effect's Lifecycle

Each `ActiveEffect` has a clear lifecycle: **applied → updated every frame → expires → removed**. Notably, the system handles two distinct types of effects:

- **Persistent effects** (Slow, Stun): Take effect immediately upon application and persist for their duration — no tick needed
- **Periodic effects** (Burn, Poison): Deal damage every N seconds — require a separate tick timer

```csharp
// ActiveEffect.cs — returns true when it's time to apply damage
public bool UpdateTick(float deltaTime)
{
    RemainingTime -= deltaTime;

    if (TickInterval <= 0) return false; // Slow/Stun: no ticking

    _currentTickTimer -= deltaTime;
    if (_currentTickTimer <= 0)
    {
        _currentTickTimer += TickInterval; // Reset cycle
        return true; // Signal: "Time to deal damage!"
    }
    return false;
}
```

### Preventing Effect Stacking

If the same tower fires repeatedly, dozens of `ActiveEffect` instances should not pile up. The system checks and **only refreshes the duration** if the same source and same effect type already exists:

```csharp
// Enemy.cs
public void AddEffect(ActiveEffect effect)
{
    foreach (var existing in _activeEffects)
    {
        if (existing.SourceId == effect.SourceId && existing.EffectType == effect.EffectType)
        {
            existing.SetRemainingTime(effect.RemainingTime); // Refresh, don't stack
            return;
        }
    }
    _activeEffects.Add(effect);
    RecalculateStats(); // Recalculate speed and stun after every change
}
```

### Immediate Stat Recalculation

When effects change, `RecalculateStats()` runs immediately to update `SpeedModifier` and `IsStunned`:

```csharp
private void RecalculateStats()
{
    SpeedModifier = 1f;
    IsStunned = false;

    foreach (var effect in _activeEffects)
    {
        IsStunned |= effect.IsStunning();
        SpeedModifier -= effect.GetSpeedReduction();
    }

    // Stun override: speed = 0; Slow minimum cap: never slower than 10%
    if (IsStunned) SpeedModifier = 0f;
    else if (SpeedModifier < 0.1f) SpeedModifier = 0.1f;
}
```

`EnemyView` reads `CurrentSpeed` = `BaseSpeed × SpeedModifier` to sync animation speed — this is why the walk animation visibly slows when an enemy is hit by an Ice tower.
