---
title: "Dynamic Path Recalculation"
layout: "project"
weight: 2
draft: true
pre: "3.2. "
---

### The Problem: Enemies in Motion, Map Changing

When a player places a blocking tower, enemies **currently moving on the map** must immediately find a new path. This is the most technically complex moment in the system.

### Two Scenarios to Handle

**Scenario 1: Tower placed directly in front of an enemy (NextTile blocked)**

The enemy can't step onto its next tile. The system:
1. Triggers a Knockback animation (pushes the enemy back)
2. Applies a 1.5s Stun (allows the enemy to pause while recalculating)
3. Recalculates the path from the current tile

```csharp
// EnemyService.cs
public void HandleOnMapChanged(HexTile blockedTile)
{
    foreach (var enemy in ActiveEnemies)
    {
        if (enemy.NextTile == blockedTile)
        {
            enemy.TriggerKnockBack();
            enemy.AddEffect(new ActiveEffect("SystemKnockBack",
                EnemyEffect.Stun, EffectScalingType.Flat, 0f, 1.5f, 0f));
            var newPath = _pathfinder.FindPath(_map, enemy.CurrentTile, _map.TargetTile);
            if (newPath != null) enemy.UpdatePath(newPath);
        }
    }
}
```

**Scenario 2: Tower placed somewhere along an enemy's current path**

The enemy needs an updated path but doesn't need to stop immediately:

```csharp
if (enemy.CurrentPath.Contains(blockedTile))
{
    var newPath = _pathfinder.FindPath(_map, enemy.CurrentTile, _map.TargetTile);
    if (newPath != null) enemy.UpdatePath(newPath);
}
```

### Connection to PlacementService

When `PlacementService` confirms a successful tower placement, it fires the `OnMapChanged` event — `EnemyService` subscribes to this event and reacts immediately. This is a real-world example of the Observer Pattern connecting two independent Domain Services.
