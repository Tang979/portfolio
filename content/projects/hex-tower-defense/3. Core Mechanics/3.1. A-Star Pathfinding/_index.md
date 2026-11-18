---
title: "A* Pathfinding on Hex Grid"
layout: "project"
weight: 2
draft: true
pre: "3.1. "
---

### The Challenge: A* on a Hex Grid

The hex grid uses an **Offset Coordinates** system (odd/even column offset) for convenient 2D array storage. However, this coordinate system is not ideal for distance calculations. The solution: convert to **Axial (Q, R, S)** coordinates when computing the heuristic, with the constraint `Q + R + S = 0`.

### Implementation

```csharp
// AStarPathfinder.cs — heuristic combining hex distance and tie-breaker
private float GetHeuristicWithTieBreaker(HexTile node, HexTile start, HexTile end)
{
    // 1. Standard hex distance (Axial coordinates)
    float h = (Abs(node.Q - end.Q) + Abs(node.R - end.R) + Abs(node.S - end.S)) / 2f;

    // 2. Cross-product tie-breaker — favors nodes that fall along the straight line start→end
    float dx1 = end.Q - start.Q; float dy1 = end.R - start.R;
    float dx2 = node.Q - start.Q; float dy2 = node.R - start.R;
    float cross = Abs(dx1 * dy2 - dx2 * dy1);

    // 3. lightly penalizes nodes that stray from the straight line → straighter, more natural paths
    return h + (cross * 0.001f);
}
```

### Performance Optimization

Rather than resetting all nodes on every pathfinding call (expensive on larger maps), the algorithm uses a `searchId` — a search counter. A node is only treated as "uninitialized" if `node.searchId != _currentSearchId`. This completely eliminates the need to traverse the entire map for a reset.

```csharp
// Only initialize a node when needed — no full map reset
if (neighbor.searchId != _currentSearchId)
{
    neighbor.G = int.MaxValue;
    neighbor.H = 0;
    neighbor.Parent = null;
    neighbor.searchId = _currentSearchId; // Mark as used in this search
}
```

### Result

The cross-product tie-breaker produces straight, natural-looking paths, avoiding the "inexplicably jagged route" phenomenon that appears when many paths share identical costs — critically important for maze building to look visually coherent.
