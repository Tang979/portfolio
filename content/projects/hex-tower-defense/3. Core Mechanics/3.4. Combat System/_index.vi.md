---
title: "Hệ Thống Chiến Đấu: Strategy & Modifier Pattern"
layout: "project"
weight: 2
pre: "3.4. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Bài toán thiết kế

Mỗi tháp có hành vi tấn công khác nhau: tức thì (instant), projectile bay đến mục tiêu, hay AoE toàn vùng. Thêm vào đó, mỗi hành vi có thể được mở rộng thêm modifier như Chain (bắn dây chuyền), Splash (nổ lan), hay AlternatingEffect (xen kẽ hiệu ứng).

Cần một hệ thống mở rộng được mà không cần sửa code cũ mỗi khi thêm loại tháp mới.

### Tầng 1: Strategy Pattern — Kiểu tấn công cơ bản

```csharp
// IAttackStrategy.cs — hợp đồng chung
public interface IAttackStrategy
{
    TowerAttackResult ExecuteAttack(Tower tower, Enemy mainTarget, List<Enemy> enemiesInRange);
}

// ProjectileAttackStrategy.cs — trích đoạn thực tế
public TowerAttackResult ExecuteAttack(Tower tower, Enemy mainTarget, List<Enemy> enemiesInRange)
{
    if (mainTarget == null) return null;

    TowerAttackResult result = AttackResultPool.GetPool(); // Sử dụng Object Pool
    result.IsSuccess = true;
    result.AffectedEnemies.Add(mainTarget);
    result.DamageList.Add(tower.Damage);

    foreach (var modifier in _modifiers)
        modifier.ExecuteOnFire(result, tower, _enemyProvider);

    return result;
}
```

Tháp chỉ cần gọi `PullTrigger()` — không cần biết strategy đang dùng là gì:
```csharp
// Tower.cs
public void PullTrigger(List<Enemy> enemies)
{
    if (!CanAttack(enemies) || _attackStrategy == null) return;

    var result = _attackStrategy.ExecuteAttack(this, CurrentTarget, enemies);

    if (result != null && result.IsSuccess)
    {
        _currentCooldownTimer = AttackCooldown; // Reset nạp đạn
        OnAttack?.Invoke(result); // View sẽ dựa vào result để tạo đạn/hiệu ứng
    }
}
```

### Tầng 2: Modifier Pattern — Mở rộng hành vi

Modifier được gắn vào strategy để thêm hành vi phụ mà không thay đổi logic cốt lõi.

#### Logic Bắn nảy (Chain) — Xử lý khi bắn (OnFire)
```csharp
// ChainModifier.cs — trích đoạn thực tế
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

#### Logic Nổ lan (Splash) — Xử lý khi trúng đích (OnHit)
```csharp
// SplashModifier.cs — trích đoạn thực tế
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

### Kết quả: Hệ thống linh hoạt qua JSON

Nhờ việc tách biệt Strategy và Modifier, tháp Lightning (Sét) được cấu hình đơn giản bằng cách kết hợp `InstantAttackStrategy` + `ChainModifier` + `StatusEffectModifier (nếu có)` trong tệp JSON, không cần viết thêm dòng code C# nào cho mỗi loại tháp mới.