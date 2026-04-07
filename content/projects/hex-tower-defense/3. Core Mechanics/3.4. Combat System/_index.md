---
title: "Combat System: Strategy & Modifier Pattern"
layout: "project"
weight: 2
pre: "3.4. "
---

### The Design Problem

Each tower has a different attack behavior: instant hits, projectiles that travel to a target, or area-of-effect across a zone. On top of that, each behavior can be extended with modifiers like Chain (bouncing shots), Splash (area splash), or AlternatingEffect (alternating effects).

The system needs to be extensible without ever modifying existing code when a new tower type is added.

### Layer 1: Strategy Pattern — The Attack Mechanism

```csharp
// IAttackStrategy.cs — the shared contract
public interface IAttackStrategy
{
    TowerAttackResult ExecuteAttack(Tower tower, Enemy mainTarget, List<Enemy> enemiesInRange);
}

// ProjectileAttackStrategy.cs — actual excerpt from the project
public TowerAttackResult ExecuteAttack(Tower tower, Enemy mainTarget, List<Enemy> enemiesInRange)
{
    if (mainTarget == null) return null;

    TowerAttackResult result = AttackResultPool.GetPool(); // Uses Object Pool
    result.IsSuccess = true;
    result.AffectedEnemies.Add(mainTarget);
    result.DamageList.Add(tower.Damage);

    foreach (var modifier in _modifiers)
        modifier.ExecuteOnFire(result, tower, _enemyProvider);

    return result;
}
```

The tower only needs to call `PullTrigger()` — it doesn't need to know which strategy is being used:
```csharp
// Tower.cs
public void PullTrigger(List<Enemy> enemies)
{
    if (!CanAttack(enemies) || _attackStrategy == null) return;

    var result = _attackStrategy.ExecuteAttack(this, CurrentTarget, enemies);

    if (result != null && result.IsSuccess)
    {
        _currentCooldownTimer = AttackCooldown; // Reset cooldown timer
        OnAttack?.Invoke(result); // View uses the result to spawn a projectile/effect
    }
}
```

### Layer 2: Modifier Pattern — Extending Behavior

Modifiers are attached to a strategy to add supplementary behavior without altering the core logic.

#### Bouncing Logic (Chain) — Processed on Fire (OnFire)
```csharp
// ChainModifier.cs — actual excerpt from the project
public void ExecuteOnFire(TowerAttackResult currentResult, Tower tower, 
                        IActiveEnemyProvider enemyProvider)
{
    Enemy currentTarget = currentResult.AffectedEnemies[0];
    float currentDamage = currentResult.DamageList[0];
    
    for (int i = 0; i < _maxBounces; i++)
    {
        Enemy nextTarget = FindNearestEnemyInRadius(allEnemies, currentTarget, _bounceRadius);
        if (nextTarget != null)
        {
            currentDamage *= _damageMultiplier;
            currentResult.AffectedEnemies.Add(nextTarget);
            currentResult.DamageList.Add(currentDamage);
            currentTarget = nextTarget;
        }
        else break;
    }
}
```

#### Splash Logic — Processed on Hit (OnHit)
```csharp
// SplashModifier.cs — actual excerpt from the project
public void ExecuteOnHit(TowerAttackResult currentResult, Tower tower, float damage, 
                        Enemy targetHit, IActiveEnemyProvider enemyProvider)
{
    if (!isSplashTriggered()) return;

    var allEnemies = enemyProvider.GetActiveEnemies();
    foreach (var enemy in allEnemies)
    {
        if (enemy == targetHit || enemy.IsDead) continue;
        
        if (enemy.Position.GetDistance(targetHit.Position) <= _radius)
        {
            enemy.TakeDamage(damage * _damageRatio);
        }
    }
}
```

### The Result: A Flexible JSON-Driven System

By decoupling Strategy from Modifier, a Lightning tower is configured simply by combining `InstantAttackStrategy` + `ChainModifier` + `StatusEffectModifier` in a JSON file — no new C# code needed for each new tower type.
