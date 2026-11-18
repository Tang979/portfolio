---
title: "Object Pool System"
layout: "project"
weight: 2
draft: true
pre: "5.3. "
---

### The Problem: Continuous Instantiate/Destroy Causes GC Spikes

In a tower defense game, hundreds of projectiles and dozens of enemies are constantly created and destroyed. Repeatedly calling `Instantiate()` and `Destroy()` causes **Garbage Collection spikes** — particularly dangerous on mobile, leading to frame stutters.

### The Solution: Object Pooling

Instead of creating and destroying, the system reuses pre-created GameObjects:

```csharp
// PoolManager.cs
public void Prewarm(GameObject prefab, int count)
{
    if (!_pools.ContainsKey(prefab))
        _pools[prefab] = new Queue<GameObject>();

    for (int i = 0; i < count; i++)
    {
        var obj = Instantiate(prefab);
        obj.SetActive(false);
        _pools[prefab].Enqueue(obj);
    }
}

public GameObject GetFromPool(GameObject prefab)
{
    if (_pools.TryGetValue(prefab, out var pool) && pool.Count > 0)
    {
        var obj = pool.Dequeue();
        obj.SetActive(true);
        return obj;
    }
    return Instantiate(prefab); // Fallback if pool is empty
}

public void ReturnPool(GameObject prefab, GameObject obj)
{
    obj.SetActive(false);
    _pools[prefab].Enqueue(obj);
}
```

### Actual Flow

1. **At game load** (`Awake`): Pre-warm 3 instances per tower and projectile type into the pool
2. **When firing**: `TowerView` calls `PoolManager.GetFromPool(bulletPrefab)` instead of `Instantiate`
3. **When projectile hits**: Calls `PoolManager.ReturnPool(bulletPrefab, bullet)` instead of `Destroy`

Result: No new allocations in the game loop — the GC is never triggered by projectile or enemy creation/destruction.
