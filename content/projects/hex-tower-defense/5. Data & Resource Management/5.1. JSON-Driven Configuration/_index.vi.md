---
title: "Cấu Hình Game Bằng JSON"
layout: "project"
weight: 2
pre: "5.1. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Triết lý Data-Driven Design

Mọi thông số ảnh hưởng đến gameplay — HP, damage, speed, cost, wave composition — đều được lưu trong JSON. Code không chứa bất kỳ "magic number" nào.

### Cấu trúc dữ liệu chính

**Tower Stats** (`TowerStatData.cs`):
```json
{
  "Towers": [
    {
      "Id": "TOWER_FIRE",
      "Damage": 20,
      "Range": 2.5,
      "AttackCooldown": 1,
      "Cost": 25,
      "AttackType": "Projectile",
      "TargetPriority": "First",
      "IsTrap": false,
      "Modifiers": [
        {
          "ModifierName": "StatusEffectModifier"
        }
      ],
      "Effects": [
        {
          "effectType": "DOT",
          "scalingType": "PercentageEnemyMaxHealth",
          "power": 0.05,
          "duration": 2,
          "tickInterval": 0.25
        }
      ]
    }
  ]
}
```

**Wave Config** (`WaveData.cs`): Xác định loại quái, số lượng, thời gian spawn, wave nào xuất hiện tại lane nào.

**Merge Recipes** (`MergeRecipeData.cs`): Bảng công thức merge — `ComponentA_Id + ComponentB_Id → ResultTower_Id`.

**Map Definition**: Cấu trúc lưới hex (kích thước, tile states) và thông số ban đầu (starting currency, base health).

### Lợi ích

- **Rapid Balancing**: Điều chỉnh damage Fire Tower từ 15 lên 20 → chỉ cần mở JSON, không cần recompile, không cần restart Unity
- **Designer-Friendly**: Người làm Game Design không cần biết code để tinh chỉnh số liệu
- **Dễ version control**: Theo dõi lịch sử thay đổi balance qua git history của JSON files
