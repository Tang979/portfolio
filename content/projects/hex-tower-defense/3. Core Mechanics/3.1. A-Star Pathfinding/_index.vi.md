---
title: "Tìm Đường A* Trên Lưới Hex"
layout: "project"
weight: 2
draft: true
pre: "3.1. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Thách thức: A* trên lưới Hex

Lưới hex sử dụng hệ tọa độ **Offset Coordinates** (odd/even column offset) để dễ lưu vào mảng 2D. Tuy nhiên, hệ tọa độ này không thuận tiện cho tính toán khoảng cách. Giải pháp: chuyển đổi sang tọa độ **Axial (Q, R, S)** khi tính heuristic, với ràng buộc `Q + R + S = 0`.

### Triển khai

```csharp
// AStarPathfinder.cs — heuristic kết hợp khoảng cách hex và tie-breaker
private float GetHeuristicWithTieBreaker(HexTile node, HexTile start, HexTile end)
{
    // 1. Khoảng cách hex chuẩn (Axial coordinates)
    float h = (Abs(node.Q - end.Q) + Abs(node.R - end.R) + Abs(node.S - end.S)) / 2f;

    // 2. Cross-product tie-breaker — ưu tiên node nằm gần đường thẳng start→end
    float dx1 = end.Q - start.Q; float dy1 = end.R - start.R;
    float dx2 = node.Q - start.Q; float dy2 = node.R - start.R;
    float cross = Abs(dx1 * dy2 - dx2 * dy1);

    // 3. Phạt nhẹ node lệch khỏi đường thẳng → đường đi thẳng và tự nhiên hơn
    return h + (cross * 0.001f);
}
```

### Tối ưu hóa thực tế

Thay vì reset toàn bộ node mỗi lần tìm đường (tốn kém khi bản đồ lớn), thuật toán sử dụng `searchId` — một bộ đếm tìm kiếm. Node chỉ được coi là "chưa khởi tạo" nếu `node.searchId != _currentSearchId`. Điều này loại bỏ hoàn toàn việc duyệt bản đồ để reset.

```csharp
// Chỉ khởi tạo node khi cần, không reset toàn bộ
if (neighbor.searchId != _currentSearchId)
{
    neighbor.G = int.MaxValue;
    neighbor.H = 0;
    neighbor.Parent = null;
    neighbor.searchId = _currentSearchId; // Đánh dấu đã dùng trong lần tìm này
}
```

### Kết quả

Cross-product tie-breaker tạo ra đường đi thẳng và tự nhiên, tránh hiện tượng "đường ngoắt ngoéo vô lý" khi nhiều đường có cùng chi phí — điều cực kỳ quan trọng để maze building trông hợp lý về mặt thị giác.
