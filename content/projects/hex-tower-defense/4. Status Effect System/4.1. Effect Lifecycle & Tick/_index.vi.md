---
title: "Vòng Đời Hiệu Ứng & Hệ Thống Tick"
layout: "project"
weight: 2
pre: "4.1. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Thiết kế vòng đời của một Effect

Mỗi `ActiveEffect` có lifecycle rõ ràng: **áp dụng → cập nhật mỗi frame → hết thời gian → bị xóa**. Điểm đặc biệt là hệ thống xử lý 2 loại hiệu ứng khác nhau:

- **Hiệu ứng liên tục** (Slow, Stun): Ảnh hưởng ngay khi áp dụng và duy trì trong suốt thời gian — không cần tick
- **Hiệu ứng theo chu kỳ** (Burn, Poison): Gây sát thương mỗi N giây — cần tick timer riêng

```csharp
// ActiveEffect.cs — trả về true khi đến lúc apply damage
public bool UpdateTick(float deltaTime)
{
    RemainingTime -= deltaTime;

    if (TickInterval <= 0) return false; // Slow/Stun: không tick

    _currentTickTimer -= deltaTime;
    if (_currentTickTimer <= 0)
    {
        _currentTickTimer += TickInterval; // Reset chu kỳ
        return true; // Báo: "Đến lúc gây damage!"
    }
    return false;
}
```

### Tránh trùng lặp Effect (Stack Prevention)

Nếu cùng một tháp bắn liên tiếp, không nên tạo ra hàng chục `ActiveEffect` chồng chất. Hệ thống kiểm tra và **chỉ làm mới thời gian** nếu cùng source + cùng loại effect:

```csharp
// Enemy.cs
public void AddEffect(ActiveEffect effect)
{
    foreach (var existing in _activeEffects)
    {
        if (existing.SourceId == effect.SourceId && existing.EffectType == effect.EffectType)
        {
            existing.SetRemainingTime(effect.RemainingTime); // Refresh, không stack
            return;
        }
    }
    _activeEffects.Add(effect);
    RecalculateStats(); // Tính lại speed và stun sau mỗi thay đổi
}
```

### Recalculate Stats tức thì

Khi effect thay đổi, `RecalculateStats()` chạy ngay để cập nhật `SpeedModifier` và `IsStunned`:

```csharp
private void RecalculateStats()
{
    SpeedModifier = 1f;
    IsStunned = false;

    foreach (var effect in _activeEffects)
    {
        IsStunned |= effect.IsStunning();
        SpeedModifier -= effect.GetSpeedReduction();
    }

    // Stun override: speed = 0; Slow min cap: không chậm dưới 10%
    if (IsStunned) SpeedModifier = 0f;
    else if (SpeedModifier < 0.1f) SpeedModifier = 0.1f;
}
```

`EnemyView` đọc `CurrentSpeed` = `BaseSpeed * SpeedModifier` để đồng bộ animation speed — đây là lý do animation chậm đi khi bị Ice tower làm chậm.
