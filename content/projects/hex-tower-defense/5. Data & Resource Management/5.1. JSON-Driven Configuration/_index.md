---
title: "JSON-Driven Game Configuration"
layout: "project"
weight: 2
draft: true
pre: "5.1. "
---

### Data-Driven Design Philosophy

Every parameter that affects gameplay — HP, damage, speed, cost, wave composition — is stored in JSON. The codebase contains no "magic numbers" whatsoever.

### Core Data Structures

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

**Wave Config** (`WaveData.cs`): Defines enemy types, quantities, spawn timing, and which waves appear in which lanes.

**Merge Recipes** (`MergeRecipeData.cs`): The merge formula table — `ComponentA_Id + ComponentB_Id → ResultTower_Id`.

**Map Definition**: Hex grid structure (dimensions, tile states) and initial parameters (starting currency, base health).

### Benefits

- **Rapid Balancing**: Adjusting Fire Tower damage from 15 to 20 → just open the JSON, no recompile, no Unity restart needed
- **Designer-Friendly**: Game designers can tune numbers without touching code
- **Easy Version Control**: Track all balance change history through the git history of JSON files
