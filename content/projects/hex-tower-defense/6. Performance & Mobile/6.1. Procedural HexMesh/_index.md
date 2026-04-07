---
title: "Procedural HexMesh Generation"
layout: "project"
weight: 2
pre: "6.1. "
---

### The Problem: 200 GameObjects = 200 Draw Calls

The simplest way to render a hex map: each tile is a `GameObject` with a `MeshRenderer`. A 200-tile map → 200 Draw Calls → unacceptable on mobile.

### The Solution: 1 Mesh for the Entire Map

`HexMeshView` builds **a single Mesh** containing all hex tiles by computing vertices and triangles based on each tile's position:

```csharp
// HexMeshView.cs — procedural mesh generation
public void RenderMap(HexMap map, LayoutAdapter layout)
{
    var vertices = new List<Vector3>();
    var triangles = new List<int>();
    var uvs = new List<Vector2>();

    foreach (var row in map.Grid)
    {
        foreach (var tile in row)
        {
            if (tile == null || tile.State == HexState.None) continue;
            AddHexToMesh(tile, layout, vertices, triangles, uvs);
        }
    }

    _mesh.SetVertices(vertices);
    _mesh.SetTriangles(triangles, 0);
    _mesh.SetUVs(0, uvs);
    _mesh.RecalculateNormals();
    GetComponent<MeshFilter>().mesh = _mesh;
}
```

### Result

| Approach | Draw Calls | GameObject Count |
|---|---|---|
| One GameObject per tile | 200+ | 200+ |
| Procedural HexMesh | **1** | **1** |

The mesh is generated once when the map loads and only rebuilt when the map structure fundamentally changes. For tile interaction (clicking a specific tile), the system uses Raycast + logical coordinates — no individual Colliders needed per tile.
