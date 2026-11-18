---
title: "Các Chế Độ Tính Sát Thương"
layout: "project"
weight: 2
draft: true
pre: "4.2. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Vấn đề: Một con số không phù hợp tất cả

DOT gây 5 damage mỗi giây trông ổn với enemy thường. Nhưng nếu có enemy boss 10.000 HP? Con số đó vô nghĩa. Ngược lại, nếu tính % max HP thì enemy yếu sẽ bị sát thương quá cao.

Giải pháp: **5 chế độ tính damage** cho từng effect, tất cả được cấu hình qua JSON.

### Bảng các Scaling Mode

| Scaling Mode | Công thức | Thiết kế cho |
|---|---|---|
| `Flat` | `Power` (cố định) | Hiệu ứng đơn giản, dễ dự đoán |
| `PercentageTowerDamage` | `TowerDamage × Power%` | Scale theo sức mạnh tháp, giữ balance khi upgrade |
| `PercentageEnemyMaxHealth` | `MaxHP × Power%` | Đặc trị enemy nhiều máu (Fire tower) |
| `PercentageEnemyCurrentHealth` | `CurrentHP × Power%` | Mạnh hơn khi enemy còn nhiều máu |
| `PercentageEnemyMissingHealth` | `(MaxHP - CurrentHP) × Power%` | Mạnh hơn khi enemy sắp chết (execute) |

```csharp
// ActiveEffect.cs
private float CalculateEffectDamage(Enemy enemy)
{
    switch (ScalingType)
    {
        case EffectScalingType.Flat:
            return Power;
        case EffectScalingType.PercentageTowerDamage:
            return SourceDamage * Power;
        case EffectScalingType.PercentageEnemyMaxHealth:
            return enemy.MaxHealth * Power;
        case EffectScalingType.PercentageEnemyCurrentHealth:
            return enemy.CurrentHealth * Power;
        case EffectScalingType.PercentageEnemyMissingHealth:
            return (enemy.MaxHealth - enemy.CurrentHealth) * Power;
        default:
            return Power;
    }
}
```

### Ứng dụng thực tế

- **Fire Tower** dùng `PercentageEnemyMaxHealth` → hiệu quả nhất với boss, yếu với minion nhỏ — tạo ra sự chuyên biệt trong vai trò tháp
- **Poison Tower** dùng `Flat` → ổn định, dễ cân bằng trong giai đoạn alpha
- Thiết kế này cho phép Game Designer thay đổi toàn bộ cảm giác gameplay của một tháp chỉ bằng cách sửa 1 dòng JSON, không cần thay đổi code
