---
title: "Logic Coordinates vs Physics Engine"
layout: "project"
weight: 2
draft: true
pre: "6.2. "
---

### Design Decision: No Physics for Map Interaction

Unity's Physics Engine (with `Collider`, `Trigger`, `OnCollisionEnter`) is powerful but costly when applied to a system interacting with hundreds of tiles on a map.

### Solution: Raycast + Logical Coordinates

**Determining which tile a player taps:**
```
Camera.ScreenPointToRay(touchPosition)
    → Raycast against the map's single MeshCollider
    → Get the 3D hit point
    → Convert to Hex coordinates (Q, R) via a mathematical formula
    → Look up HexTile from Grid[Q][R]
```

Only **1 MeshCollider** is needed for the entire map instead of 200 individual Colliders.

### Strategy: Hybrid Range Detection (Physics Serving Logic)

Rather than calculating distances every frame (pure math polling) or using `OverlapSphere` (physics polling), the project uses Unity's **Event-based Trigger** mechanism for optimal performance.

#### 1. Why SphereCollider + Trigger?
Using `OnTriggerEnter` and `OnTriggerExit` frees the Main Thread from continuously scanning attack ranges for dozens of towers simultaneously. Unity's physics engine handles this at a deeper level and only fires notifications when something actually changes.

```csharp
// TowerView.cs - Leveraging the Physics Engine to serve Domain Logic
private void OnTriggerEnter(Collider other)
{
    if (other.CompareTag("Enemy"))
    {
        var enemyView = other.GetComponent<EnemyView>();
        if (enemyView != null) _enemiesInRange.Add(enemyView.Enemy);
    }
}

private void OnTriggerExit(Collider other)
{
    if (other.CompareTag("Enemy"))
    {
        var enemyView = other.GetComponent<EnemyView>();
        if (enemyView != null) _enemiesInRange.Remove(enemyView.Enemy);
    }
}
```

#### 2. Connecting to Domain Logic
The View is responsible for "collecting" nearby enemies into a list, then passing that list to the Domain every frame for Target Picking and damage calculation.

```csharp
private void Update()
{
    // Clean up dead enemies before pushing data into the Domain
    _enemiesInRange.RemoveAll(e => e == null || e.IsDead);
    
    // Pass the enemy list to the Domain for processing
    Tower.Tick(Time.deltaTime, _enemiesInRange);
}
```

### Mobile Performance Benefits

-   **Power efficient**: The CPU never has to compute square root distance calculations for every enemy on the map each frame.
-   **Stability**: Prevents frame spikes when tower count increases in later waves.
-   **Clean separation**: The Domain remains completely unaware of Unity Physics — it only receives a pure `List<Enemy>`, preserving the testability of combat logic.
