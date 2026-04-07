---
title: "Giao Tiếp Hướng Sự Kiện (Observer Pattern)"
layout: "project"
weight: 2
pre: "2.3. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Vấn đề cần giải quyết

Nếu Domain Layer trực tiếp gọi hàm của View (ví dụ: `towerView.PlayAnimation()`), Domain sẽ biết View tồn tại — phá vỡ nguyên tắc tách biệt tầng.

### Giải pháp: C# Events (Observer Pattern)

Domain Layer phát sự kiện (event), View Layer đăng ký (subscribe) và phản ứng. Domain không biết và không cần biết ai đang lắng nghe.

**Ví dụ — Enemy phát sự kiện khi máu thay đổi:**
```csharp
// Enemy.cs (Domain Layer - Pure C#)
public event Action<float, float> OnHealthChanged;
public event Action KnockBack;

public void TakeDamage(float amount)
{
    CurrentHealth -= amount;
    OnHealthChanged?.Invoke(CurrentHealth, MaxHealth); // Phát sự kiện, không quan tâm ai nghe
}
```

**EnemyView đăng ký để kết nối Component UI:**
```csharp
// EnemyView.cs (Unity Layer)
[SerializeField] private FloatingHealthBar floatingHealthBar; // Component UI riêng biệt

public void Initialize(Enemy enemy)
{
    _enemy = enemy;
    
    // Đăng ký phương thức của FloatingHealthBar vào sự kiện của Domain
    _enemy.OnHealthChanged += floatingHealthBar.UpdateHealth; 
    
    // Đăng ký hành động nội tại của View
    _enemy.KnockBack += OnKnockBack;
}
```

**Tương tự với Tower — phát event khi bắn:**
```csharp
// Tower.cs (Domain Layer)
public event Action<TowerAttackResult> OnAttack;

public void PullTrigger(List<Enemy> enemies)
{
    var result = _attackStrategy.ExecuteAttack(this, CurrentTarget, enemies);
    if (result.IsSuccess)
    {
        _currentCooldownTimer = AttackCooldown;
        OnAttack?.Invoke(result); // TowerView sẽ nhận và tạo đạn
    }
}
```

### Lợi ích

- Domain Layer không import Unity — có thể test hoàn toàn bằng command-line
- Thêm nhiều subscriber (sound, VFX, analytics) mà không cần thay đổi Domain code
- Debug dễ hơn: nếu visual sai → lỗi ở View; nếu số liệu sai → lỗi ở Domain
