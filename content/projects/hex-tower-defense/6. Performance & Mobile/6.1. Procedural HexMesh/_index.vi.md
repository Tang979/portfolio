---
title: "Khởi Tạo HexMesh Bằng Code"
layout: "project"
weight: 2
draft: true
pre: "6.1. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Vấn đề: 200 GameObject = 200 Draw Call

Cách đơn giản nhất để render bản đồ hex: mỗi ô là một `GameObject` với `MeshRenderer`. Bản đồ 200 ô → 200 Draw Call → không chấp nhận được trên mobile.

### Giải pháp: 1 Mesh cho toàn bộ bản đồ

`HexMeshView` xây dựng **một Mesh duy nhất** chứa tất cả các ô hex bằng cách tính toán vertex và triangle theo vị trí của mỗi tile:

```csharp
// HexMeshView.cs — tạo mesh procedurally
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

### Kết quả

| Phương pháp | Draw Call | GameObject Count |
|---|---|---|
| Mỗi ô 1 GameObject | 200+ | 200+ |
| Procedural HexMesh | **1** | **1** |

Mesh được tạo một lần khi load map và chỉ rebuild khi cấu trúc bản đồ thay đổi cơ bản. Về mặt tương tác (click vào ô nào), hệ thống dùng Raycast + tọa độ logic để xác định tile — không cần Collider riêng cho từng ô.
