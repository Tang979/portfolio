---
title: "Composition Root & Lifecycle Management"
layout: "project"
weight: 2
pre: "2.4. "
---

### Composition Root: The System's Orchestration Heart

In this project's architecture, `GameController` serves as the **Composition Root** — the single point responsible for initializing every Domain Service, every Unity Infrastructure component, and wiring them together in a strict sequence.

The decision to build a custom Composition Root instead of using a DI Framework (like Zenject) gives me absolute control over the data loading sequence and asynchronous processing.

### The Actual Initialization Flow (GameController.Awake)

```csharp
// GameController.cs inherits from a custom SceneSingleton
public class GameController : SceneSingleton<GameController>
{
    protected override async void Awake()
    {
        base.Awake();
        
        // Step 1: Load Resources and Configuration Data (Asynchronous)
        var playerData = JsonConvert.DeserializeObject<PlayerData>(playerDataJson.text);
        foreach (var id in playerData.SelectedTowerIds) {
            await ResourceManager.LoadTowerAsync(id); // Centralized Asset management
        }

        // Step 2: Initialize Domain Services (Pure C#)
        var mapData = JsonConvert.DeserializeObject<HexMapDefinition>(mapJson.text);
        CurrencyService = new CurrencyService(mapData.StartCurrency);
        BaseHealthService = new BaseHealthService(mapData.BaseHealth);
        
        // Step 3: Set Up Dependency Injection (Constructor Injection)
        pathfinder = new AStarPathfinder();
        Map = MapLoader.LoadMap(mapJson);
        LaneService = new LaneService(Map, pathfinder);
        EnemyService = new EnemyService(Map, LaneService, BaseHealthService, CurrencyService);
        PlacementService = new PlacementService(Map, pathfinder, LaneService);

        // Step 4: Wiring — Connect independent Services via Events
        PlacementService.OnMapChanged += EnemyService.HandleOnMapChanged;
        
        // Step 5: Activate View system and start the Game Loop
        FinishSetupAndStartGame();
    }
}
```

### Why This Architecture Matters

-   **Race Condition Control**: Using `async Awake` with `await ResourceManager` guarantees all data is 100% ready before game logic starts running.
-   **Centralized Data Loading**: JSON configuration loading is handled in one place, allowing downstream Services to receive clean data without caring about its origin.
-   **Easy Debugging**: When an initialization error occurs, I only need to inspect `GameController` instead of hunting through scattered `MonoBehaviour` components across the Scene.

> [!IMPORTANT]
> `GameController` is the only object that has the full picture of the project, ensuring every independent component functions as a unified system.
