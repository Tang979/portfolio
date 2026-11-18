---
title: "Tính Toán Lại Đường Đi Động"
layout: "project"
weight: 2
draft: true
pre: "3.2. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Bài toán: Quái đang di chuyển, bản đồ thay đổi

Khi người chơi đặt tháp chặn đường, các con quái **đang di chuyển trên bản đồ** cần lập tức tìm đường mới. Đây là khoảnh khắc phức tạp nhất về mặt kỹ thuật.

### Hai tình huống cần xử lý

**Tình huống 1: Tháp đặt ngay trước mắt quái (NextTile bị chặn)**

Quái không thể tiếp tục bước sang ô tiếp theo. Hệ thống:
1. Kích hoạt Knockback animation (đẩy quái lùi lại)
2. Áp dụng Stun 1.5s (để quái dừng lại trong khi tính đường mới)
3. Tính lại đường từ ô hiện tại

```csharp
// EnemyService.cs
public void HandleOnMapChanged(HexTile blockedTile)
{
    foreach (var enemy in ActiveEnemies)
    {
        if (enemy.NextTile == blockedTile)
        {
            enemy.TriggerKnockBack();
            enemy.AddEffect(new ActiveEffect("SystemKnockBack",
                EnemyEffect.Stun, EffectScalingType.Flat, 0f, 1.5f, 0f));
            var newPath = _pathfinder.FindPath(_map, enemy.CurrentTile, _map.TargetTile);
            if (newPath != null) enemy.UpdatePath(newPath);
        }
    }
}
```

**Tình huống 2: Tháp đặt ở đâu đó trên path hiện tại của quái**

Quái cần cập nhật path nhưng không cần dừng lại ngay:

```csharp
if (enemy.CurrentPath.Contains(blockedTile))
{
    var newPath = _pathfinder.FindPath(_map, enemy.CurrentTile, _map.TargetTile);
    if (newPath != null) enemy.UpdatePath(newPath);
}
```

### Kết nối với PlacementService

Khi `PlacementService` xác nhận đặt tháp thành công, nó phát sự kiện `OnMapChanged` — `EnemyService` đăng ký sự kiện này và phản ứng ngay lập tức. Đây là ví dụ thực tiễn của Observer Pattern kết nối hai Domain Service với nhau.
