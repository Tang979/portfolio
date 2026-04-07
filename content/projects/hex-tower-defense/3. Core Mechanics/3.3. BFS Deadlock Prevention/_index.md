---
title: "BFS Deadlock Prevention"
layout: "project"
weight: 2
pre: "3.3. "
---

### The Problem: Players Can Accidentally Trap Enemies

If a player places a tower that blocks every possible exit for an enemy currently on the map, that enemy can never reach the target — the game breaks. This situation must be prevented.

### The Dual Validation Requirement

When a player attempts to place a tower, the system must simultaneously confirm 2 conditions:
1. **At least 1 valid path still exists** from every spawn point to the target (A*)
2. **Every active enemy on the map** can still reach the target (BFS)

### The BFS Deadlock Check Algorithm

Instead of running A* for every individual enemy (prohibitively expensive), the system runs **a single reverse BFS from the target tile**, counting the total number of reachable enemies:

```csharp
// PlacementService.cs
private bool CheckDeadlockEnemy(int totalActiveEnemies)
{
    int reachableEnemiesCount = 0;
    Queue<HexTile> frontier = new Queue<HexTile>();
    HashSet<HexTile> visited = new HashSet<HexTile>();

    // BFS outward from the Target tile
    frontier.Enqueue(_map.TargetTile);
    visited.Add(_map.TargetTile);

    while (frontier.Count > 0)
    {
        var current = frontier.Dequeue();
        reachableEnemiesCount += current.EnemyCount; // Count enemies standing on this tile

        foreach (var neighbor in _map.GetNeighbors(current))
        {
            if (neighbor.IsWalkable() && !visited.Contains(neighbor))
            {
                visited.Add(neighbor);
                frontier.Enqueue(neighbor);
            }
        }
    }

    // If enemies found < total active enemies → at least one is trapped
    return reachableEnemiesCount == totalActiveEnemies;
}
```

### The Complete Tower Placement Flow

```
TryPlaceCrystal(tile)
    ├── [1] Validate tile (not Spawn/Target, tile is empty)
    ├── [2] Set tile to HexState.Tower (temporarily)
    ├── [3] Run A* for all SpawnTiles → CheckPlace()
    ├── [4] Run BFS → CheckDeadlockEnemy()
    ├── If OK: update LaneService, fire OnMapChanged
    └── If FAIL: restore tile to previous state, reject placement
```

### Design Efficiency

A single BFS from one target tile is far cheaper than running A* for every active enemy. On a hex map of roughly 100–200 tiles, the entire validation process completes in microseconds — no lag when the player places a tower.
