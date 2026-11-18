---
title: "Kiến Trúc Sạch & Thiết Kế Hướng Tên Miền (DDD)"
layout: "project"
weight: 2
draft: true
pre: "2.1. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->
<!-- Bạn có thể bổ sung lý do cá nhân tại sao chọn cách làm này -->

### Vấn đề xuất phát

Giai đoạn đầu phát triển, mọi logic game được nhồi trực tiếp vào các `MonoBehaviour`. Điều này dẫn đến tình trạng logic và visual trộn lẫn — rất khó kiểm tra, rất khó debug và không thể test mà không cần mở Unity.

<!-- BỔ SUNG: Bạn có thể kể một ví dụ cụ thể về lúc bị đau vì kiến trúc cũ không? -->

### Giải pháp: Phân tầng rõ ràng

Dự án được chia thành 2 tầng với ranh giới tuyệt đối:

**Tầng 1 — Domain Layer (Pure C#)**

Chứa toàn bộ quy tắc nghiệp vụ, hoàn toàn độc lập với Unity (không dùng `UnityEngine`):
- **Entities**: `Enemy`, `Tower`, `HexMap` — các đối tượng giữ trạng thái và logic cốt lõi.
- **Value Objects**: `Position`, `ActiveEffect` — dữ liệu bất biến mô tả thuộc tính.
- **Services**: `EnemyService`, `PathfindingService` — thực thi logic nghiệp vụ.

```csharp
// Enemy.cs — Pure C# Entity
public class Enemy
{
    public float CurrentHealth { get; private set; }
    public float BaseSpeed { get; private set; }
    public float SpeedModifier { get; private set; } = 1f;
    public float CurrentSpeed => BaseSpeed * SpeedModifier;
    
    public Position Position { get; set; } // Value Object
    public event Action<float, float> OnHealthChanged;

    public void TakeDamage(float amount)
    {
        CurrentHealth -= amount;
        // Thông báo ra bên ngoài mà không cần biết ai đang lắng nghe
        OnHealthChanged?.Invoke(CurrentHealth, MaxHealth);
    }
}
```

**Tầng 2 — Unity Infrastructure Layer**

Phần tích hợp với Unity Engine, chỉ đóng vai trò hiển thị và nhận Input:
- **Views**: `EnemyView`, `TowerView` — sử dụng `MonoBehaviour`.
- **Adapters**: `LayoutAdapter` — chuyển đổi tọa độ Hex sang không gian 3D của Unity.

```csharp
// EnemyView.cs — Unity View Layer
public class EnemyView : MonoBehaviour
{
    private Enemy _enemy; // Tham chiếu đến Domain Entity
    [SerializeField] private FloatingHealthBar floatingHealthBar; // Component UI

    public void Initialize(Enemy enemy, LayoutAdapter layout)
    {
        _enemy = enemy;
        // Kết nối Domain Event với UI component chuyên biệt (SRP)
        _enemy.OnHealthChanged += floatingHealthBar.UpdateHealth;
    }

    private void Update()
    {
        // Đồng bộ vị trí từ Domain sang World Space của Unity qua Adapter
        transform.position = _layoutAdapter.HexToWorld(_enemy.CurrentTile);
        
        // Đồng bộ tốc độ Animation dựa trên tỉ lệ Speed từ Domain
        float animSpeed = (_enemy.CurrentSpeed / stepDistance) * scaleFactor;
        _animator.SetFloat("Speed", animSpeed);
    }
}
```

### Lợi ích thực tế

- **Debug nhanh hơn**: Ngay lập tức biết lỗi nằm ở logic (Domain) hay visual (View)
- **Testable**: Toàn bộ Domain Layer có thể chạy Unit Test trong môi trường command-line, không cần Unity Editor
- **Reusable**: 80% core logic độc lập — có thể tái dụng hoặc migrate sang engine khác
