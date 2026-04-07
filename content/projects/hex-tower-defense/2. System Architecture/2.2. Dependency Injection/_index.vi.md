---
title: "Cơ Chế Dependency Injection"
layout: "project"
weight: 2
pre: "2.2. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Vấn đề

Nếu mỗi service tự tạo ra các dependency của mình bên trong → Tightly coupled, không thể thay thế để test, không thể kiểm soát thứ tự khởi tạo.

### Giải pháp: Constructor Injection thủ công

Thay vì dùng DI framework bên thứ 3, toàn bộ dependency được inject qua constructor. Điều này giúp:
- Thứ tự khởi tạo rõ ràng, đọc code hiểu ngay
- Dễ dàng thay thế bởi Mock object khi viết Unit Test
- Không phụ thuộc thêm vào thư viện ngoài

```csharp
// EnemyService nhận mọi dependency qua constructor
// Không có "new AStarPathfinder()" ẩn bên trong
public EnemyService(HexMap map, LaneService laneService,
                    BaseHealthService health, CurrencyService currency)
{
    _map = map;
    _laneService = laneService;
    _baseHealthService = health;
    _currencyService = currency;
    _pathfinder = new AStarPathfinder();
    ActiveEnemies = new List<Enemy>();
}
```

### Mối liên hệ với Testability

Vì `EnemyService` không tự tạo ra `CurrencyService` hay `BaseHealthService`, khi viết Unit Test ta có thể truyền vào các mock object với hành vi tùy chỉnh — kiểm tra logic một cách hoàn toàn độc lập.
