---
title: "Ngăn Chặn Bế Tắc Bằng BFS"
layout: "project"
weight: 2
draft: true
pre: "3.3. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Bài toán: Người chơi có thể vô tình nhốt quái

Nếu người chơi đặt tháp làm bít tất cả đường đi của một con quái đang ở trên bản đồ, con quái đó không thể đến đích — game bị treo. Phải ngăn tình huống này xảy ra.

### Yêu cầu kiểm tra kép

Khi người chơi muốn đặt tháp, hệ thống phải xác nhận đồng thời 2 điều:
1. **Vẫn còn ít nhất 1 đường đi** từ mọi điểm spawn đến điểm đích (A*)
2. **Tất cả quái đang có mặt trên bản đồ** đều có thể tiếp cận được điểm đích (BFS)

### Thuật toán BFS Deadlock Check

Thay vì chạy A* cho từng con quái (rất tốn kém), hệ thống dùng **BFS ngược từ điểm đích**, đếm tổng số quái tiếp cận được:

```csharp
// PlacementService.cs
private bool CheckDeadlockEnemy(int totalActiveEnemies)
{
    int reachableEnemiesCount = 0;
    Queue<HexTile> frontier = new Queue<HexTile>();
    HashSet<HexTile> visited = new HashSet<HexTile>();

    // BFS từ Target tile ngược ra ngoài
    frontier.Enqueue(_map.TargetTile);
    visited.Add(_map.TargetTile);

    while (frontier.Count > 0)
    {
        var current = frontier.Dequeue();
        reachableEnemiesCount += current.EnemyCount; // Cộng quái đang đứng tại ô này

        foreach (var neighbor in _map.GetNeighbors(current))
        {
            if (neighbor.IsWalkable() && !visited.Contains(neighbor))
            {
                visited.Add(neighbor);
                frontier.Enqueue(neighbor);
            }
        }
    }

    // Nếu số quái tìm thấy < tổng quái đang hoạt động → có quái bị kẹt
    return reachableEnemiesCount == totalActiveEnemies;
}
```

### Quy trình đặt tháp hoàn chỉnh

```
TryPlaceCrystal(tile)
    ├── [1] Kiểm tra tile hợp lệ (không phải Spawn/Target, tile trống)
    ├── [2] Set tile thành HexState.Tower (tạm thời)
    ├── [3] Chạy A* cho tất cả SpawnTile → CheckPlace()
    ├── [4] Chạy BFS → CheckDeadlockEnemy()
    ├── Nếu OK: cập nhật LaneService, phát OnMapChanged
    └── Nếu FAIL: restore tile về state cũ, từ chối đặt
```

### Hiệu quả thiết kế

BFS một lần từ target duy nhất rẻ hơn nhiều so với chạy A* cho từng con quái. Với bản đồ hex khoảng 100-200 tile, toàn bộ quá trình kiểm tra diễn ra trong microseconds — không gây lag khi người chơi đặt tháp.
