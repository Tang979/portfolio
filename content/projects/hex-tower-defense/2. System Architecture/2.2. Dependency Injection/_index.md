---
title: "Dependency Injection"
layout: "project"
weight: 2
pre: "2.2. "
---

### The Problem

If each service creates its own dependencies internally → Tightly coupled code, impossible to replace with mocks for testing, and no control over initialization order.

### The Solution: Manual Constructor Injection

Instead of relying on a third-party DI framework, all dependencies are injected via constructors. This approach provides:
- Clear initialization order — readable at a glance
- Easy to replace with mock objects when writing Unit Tests
- No additional external library dependencies

```csharp
// EnemyService receives all dependencies through its constructor
// No hidden "new AStarPathfinder()" lurking inside
public EnemyService(HexMap map, LaneService laneService,
                    BaseHealthService health, CurrencyService currency)
{
    _map = map;
    _laneService = laneService;
    _baseHealthService = health;
    _currencyService = currency;
    _pathfinder = new AStarPathfinder();
    ActiveEnemies = new List<Enemy>();
}
```

### Connection to Testability

Because `EnemyService` does not create its own `CurrencyService` or `BaseHealthService`, Unit Tests can pass in mock objects with custom behavior — allowing logic to be verified in complete isolation.
