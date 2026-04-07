---
title: "Async Asset Loading with Addressables"
layout: "project"
weight: 2
pre: "5.2. "
---

### The Problem: Synchronous Asset Loading on Mobile

On mobile devices, loading all assets at startup using `Resources.Load` causes screen freezes because it blocks the main thread. An asynchronous solution is required.

### The Solution: Unity Addressables + async/await

Visual assets (tower prefabs, enemy prefabs, projectile effects) are registered in the Addressable system and loaded asynchronously:

```csharp
// ResourceManager.cs — async load and cache
public static async Task LoadTowerAsync(string towerId)
{
    if (_towerCache.ContainsKey(towerId)) return; // Already cached

    var handle = Addressables.LoadAssetAsync<GameObject>($"Towers/{towerId}");
    await handle.Task;

    if (handle.Status == AsyncOperationStatus.Succeeded)
        _towerCache[towerId] = handle.Result;
}

public static TowerOS GetTowerOS(string towerId)
{
    return _towerCache.TryGetValue(towerId, out var obj)
        ? obj.GetComponent<TowerOS>()
        : null;
}
```

### A Clear Data Separation

| Data Type | Storage | Reason |
|---|---|---|
| Balance (HP, damage, cost) | **JSON** | Needs frequent tuning, no rebuild required |
| Visual (3D prefabs, particles) | **Addressables** | Heavy assets, needs async loading, supports hot-reload |

### Integration with Object Pooling

After loading, prefabs are immediately pre-warmed into `PoolManager` to prevent in-game lag:

```csharp
// GameController.Awake() — pre-warm pool only after assets are loaded
var towerOS = ResourceManager.GetTowerOS(t.Id);
if (towerOS?.towerPrefab != null)
    PoolManager.Prewarm(towerOS.towerPrefab, 3);
```
