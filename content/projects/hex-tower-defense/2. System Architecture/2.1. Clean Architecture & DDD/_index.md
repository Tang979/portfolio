---
title: "Clean Architecture & Domain-Driven Design"
layout: "project"
weight: 2
draft: true
pre: "2.1. "
---

### The Problem

In the early stages of development, all game logic was stuffed directly into `MonoBehaviour` components. This led to a state where logic and visuals were completely entangled — difficult to test, difficult to debug, and impossible to verify without launching Unity.

### The Solution: Clear Layer Separation

The project is divided into 2 layers with an absolute boundary between them:

**Layer 1 — Domain Layer (Pure C#)**

Contains all business rules, completely independent of Unity (no `UnityEngine` imports):
- **Entities**: `Enemy`, `Tower`, `HexMap` — objects holding state and core logic.
- **Value Objects**: `Position`, `ActiveEffect` — immutable data describing attributes.
- **Services**: `EnemyService`, `PathfindingService` — executing business logic.

```csharp
// Enemy.cs — Pure C# Entity
public class Enemy
{
    public float CurrentHealth { get; private set; }
    public float BaseSpeed { get; private set; }
    public float SpeedModifier { get; private set; } = 1f;
    public float CurrentSpeed => BaseSpeed * SpeedModifier;
    
    public Position Position { get; set; } // Value Object
    public event Action<float, float> OnHealthChanged;

    public void TakeDamage(float amount)
    {
        CurrentHealth -= amount;
        // Notifies the outside world without knowing who is listening
        OnHealthChanged?.Invoke(CurrentHealth, MaxHealth);
    }
}
```

**Layer 2 — Unity Infrastructure Layer**

Integration with the Unity Engine — responsible only for display and Input handling:
- **Views**: `EnemyView`, `TowerView` — `MonoBehaviour` components.
- **Adapters**: `LayoutAdapter` — converts Hex coordinates to Unity's 3D world space.

```csharp
// EnemyView.cs — Unity View Layer
public class EnemyView : MonoBehaviour
{
    private Enemy _enemy; // Reference to the Domain Entity
    [SerializeField] private FloatingHealthBar floatingHealthBar; // Dedicated UI component

    public void Initialize(Enemy enemy, LayoutAdapter layout)
    {
        _enemy = enemy;
        // Wire the Domain Event to a dedicated UI component (SRP)
        _enemy.OnHealthChanged += floatingHealthBar.UpdateHealth;
    }

    private void Update()
    {
        // Sync position from Domain to Unity World Space via Adapter
        transform.position = _layoutAdapter.HexToWorld(_enemy.CurrentTile);
        
        // Sync Animation speed based on the actual Speed ratio from Domain
        float animSpeed = (_enemy.CurrentSpeed / stepDistance) * scaleFactor;
        _animator.SetFloat("Speed", animSpeed);
    }
}
```

### Real-World Benefits

- **Faster debugging**: Immediately know whether a bug is in logic (Domain) or visuals (View)
- **Testable**: The entire Domain Layer can run Unit Tests from the command line, no Unity Editor needed
- **Reusable**: 80% of core logic is independent — can be reused or migrated to another engine
