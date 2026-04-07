---
title: "Event-Driven Communication (Observer Pattern)"
layout: "project"
weight: 2
pre: "2.3. "
---

### The Problem

If the Domain Layer directly calls View functions (e.g., `towerView.PlayAnimation()`), the Domain would need to know the View exists — violating the principle of layer separation.

### The Solution: C# Events (Observer Pattern)

The Domain Layer fires events; the View Layer subscribes and reacts. The Domain doesn't know and doesn't need to know who is listening.

**Example — Enemy fires an event when health changes:**
```csharp
// Enemy.cs (Domain Layer - Pure C#)
public event Action<float, float> OnHealthChanged;
public event Action KnockBack;

public void TakeDamage(float amount)
{
    CurrentHealth -= amount;
    OnHealthChanged?.Invoke(CurrentHealth, MaxHealth); // Fires event, doesn't care who listens
}
```

**EnemyView subscribes to wire a dedicated UI Component:**
```csharp
// EnemyView.cs (Unity Layer)
[SerializeField] private FloatingHealthBar floatingHealthBar; // Dedicated UI component

public void Initialize(Enemy enemy)
{
    _enemy = enemy;
    
    // Wire the FloatingHealthBar's method directly to the Domain event
    _enemy.OnHealthChanged += floatingHealthBar.UpdateHealth;
    
    // Register the View's own internal handler
    _enemy.KnockBack += OnKnockBack;
}
```

**Same pattern for Tower — fires an event when attacking:**
```csharp
// Tower.cs (Domain Layer)
public event Action<TowerAttackResult> OnAttack;

public void PullTrigger(List<Enemy> enemies)
{
    var result = _attackStrategy.ExecuteAttack(this, CurrentTarget, enemies);
    if (result.IsSuccess)
    {
        _currentCooldownTimer = AttackCooldown;
        OnAttack?.Invoke(result); // TowerView will receive this and spawn a projectile
    }
}
```

### Benefits

- Domain Layer doesn't import Unity — can be tested entirely from the command line
- Multiple subscribers can be added (sound, VFX, analytics) without touching Domain code
- Easier debugging: visual bug → look in View; data bug → look in Domain
