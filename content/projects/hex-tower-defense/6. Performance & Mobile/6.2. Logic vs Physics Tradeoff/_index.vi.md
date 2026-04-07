---
title: "Tối Ưu Giữa Logic và Vật Lý"
layout: "project"
weight: 2
pre: "6.2. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Quyết định thiết kế: Không dùng Physics cho tương tác bản đồ

Unity Physics Engine (với `Collider`, `Trigger`, `OnCollisionEnter`) rất mạnh nhưng tốn kém về hiệu năng nếu dùng cho hệ thống tương tác với hàng trăm ô trên bản đồ.

### Giải pháp: Raycast + Tọa độ logic

**Xác định ô người chơi chạm vào:**
```
Camera.ScreenPointToRay(touchPosition)
    → Raycast vào Collider Mesh duy nhất của bản đồ
    → Lấy điểm 3D va chạm
    → Chuyển đổi về tọa độ Hex (Q, R) bằng công thức toán học
    → Truy xuất HexTile từ Grid[Q][R]
```

Chỉ cần **1 MeshCollider** cho toàn bộ bản đồ thay vì 200 Collider riêng lẻ.

### Chiến thuật: Hybrid Range Detection (Vật lý hỗ trợ Logic)

Trong dự án này, tôi không lạm dụng toán học thuần túy (tính khoảng cách từng frame) hay lạm dụng `OverlapSphere` (polling vật lý). Thay vào đó, tôi sử dụng cơ chế **Triggers Event-based** của Unity để đạt được hiệu suất tối ưu nhất.

#### 1. Tại sao dùng SphereCollider + Trigger?
Việc sử dụng `OnTriggerEnter` và `OnTriggerExit` giúp giải phóng Main Thread khỏi việc phải quét tầm bắn liên tục cho hàng chục tháp cùng lúc. Engine vật lý của Unity sẽ quản lý việc này ở tầng sâu và chỉ gửi thông báo khi có thay đổi thực sự.

```csharp
// TowerView.cs - Tận dụng Engine Vật lý để phục vụ Domain
private void OnTriggerEnter(Collider other)
{
    if (other.CompareTag("Enemy"))
    {
        var enemyView = other.GetComponent<EnemyView>();
        if (enemyView != null) _enemiesInRange.Add(enemyView.Enemy);
    }
}

private void OnTriggerExit(Collider other)
{
    if (other.CompareTag("Enemy"))
    {
        var enemyView = other.GetComponent<EnemyView>();
        if (enemyView != null) _enemiesInRange.Remove(enemyView.Enemy);
    }
}
```

#### 2. Kết nối với Domain Logic
View đảm nhận việc "gom" các quái trong tầm vào một danh sách, sau đó truyền danh sách này vào Domain mỗi frame để thực thi logic chọn mục tiêu (Target Picking) và tính sát thương.

```csharp
private void Update()
{
    // Dọn dẹp quái đã chết trước khi đẩy dữ liệu vào Domain
    _enemiesInRange.RemoveAll(e => e == null || e.IsDead);
    
    // Gửi danh sách quái cho Domain xử lý
    Tower.Tick(Time.deltaTime, _enemiesInRange);
}
```

### Lợi ích về hiệu suất Mobile

-   **Tiết kiệm năng lượng**: CPU không phải thực hiện các phép tính căn bậc hai (Distance) cho mọi quái trên bản đồ mỗi frame.
-   **Tính ổn định**: Tránh được các hiện tượng giật frame (Spikes) khi số lượng tháp tăng lên ở các wave cuối.
-   **Tách biệt sạch sẽ**: Domain vẫn không hề biết đến sự hiện diện của Unity Physics. Nó chỉ nhận vào một `List<Enemy>` thuần túy, đảm bảo tính Testable cho logic chiến đấu.
