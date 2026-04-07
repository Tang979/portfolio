---
title: "Merge Mechanic"
layout: "project"
weight: 2
pre: "1.4. "
---

### How It Works

Players have 2 ways to merge towers:

1. **Map to Map drag**: Hold a tower already placed on the map for about **1 second** (long press) → the tower enters a draggable state → drag it onto the target tower to merge
2. **UI to Map drag**: Drag a tower directly from the tower bar in the UI onto a tower already placed on the map

The merge result is predetermined by **MergeRecipeData** (JSON) — each pair of towers A + B can produce a stronger tower C. Players can only execute a merge when they have the required components in their loadout.

### Tactical Impact

With 5 basic towers carried into each match, players aren't limited to just those 5 types. Through merging, a **new tower tree** opens up:

- **Power vs. Path Control**: Merged towers have superior stats, but come with a resource cost and tactical risk. When two towers on the map are combined, the player loses one **Blocker** — this can completely change the enemy's path and break the established maze structure.
- **The Core Dilemma**: *Should you maintain tower count to control pathing, or sacrifice a strategic position to create concentrated high firepower at a single point?*
- **Recipe Discovery**: Not every tower pair has a merge formula — this encourages exploration and experimentation in every match.

### Technical Challenge

The long-press + drag mechanic requires clear disambiguation between: a normal tap (select tower), a long press (begin drag), and drag release (execute merge or cancel). The entire state machine is handled by `GameController.cs` and `CrystalPlacementController.cs`.
