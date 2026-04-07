---
title: "Composition Root & Quản Lý Vòng Đời"
layout: "project"
weight: 2
pre: "2.4. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Composition Root: Trái tim điều phối hệ thống

Trong kiến trúc của dự án, `GameController` đóng vai trò là **Composition Root** (Gốc khởi tạo). Đây là nơi duy nhất chịu trách nhiệm khởi tạo mọi Service của Domain, các Infrastructure của Unity và kết nối chúng lại với nhau theo một trình tự nghiêm ngặt.

Quyết định tự xây dựng Composition Root thay vì dùng các Framework DI (như Zenject) giúp tôi kiểm soát tuyệt đối trình tự nạp dữ liệu và xử lý bất đồng bộ.

### Quy trình khởi tạo thực tế (GameController.Awake)

```csharp
// GameController.cs kế thừa từ SceneSingleton chuyên biệt
public class GameController : SceneSingleton<GameController>
{
    protected override async void Awake()
    {
        base.Awake();
        
        // Bước 1: Nạp Resource và Dữ liệu cấu hình (Asynchronous)
        var playerData = JsonConvert.DeserializeObject<PlayerData>(playerDataJson.text);
        foreach (var id in playerData.SelectedTowerIds) {
            await ResourceManager.LoadTowerAsync(id); // Quản lý Assets tập trung
        }

        // Bước 2: Khởi tạo các Domain Services (Pure C#)
        var mapData = JsonConvert.DeserializeObject<HexMapDefinition>(mapJson.text);
        CurrencyService = new CurrencyService(mapData.StartCurrency);
        BaseHealthService = new BaseHealthService(mapData.BaseHealth);
        
        // Bước 3: Thiết lập Dependency Injection (Constructor Injection)
        pathfinder = new AStarPathfinder();
        Map = MapLoader.LoadMap(mapJson);
        LaneService = new LaneService(Map, pathfinder);
        EnemyService = new EnemyService(Map, LaneService, BaseHealthService, CurrencyService);
        PlacementService = new PlacementService(Map, pathfinder, LaneService);

        // Bước 4: Wiring - Kết nối các Service độc lập qua Event
        PlacementService.OnMapChanged += EnemyService.HandleOnMapChanged;
        
        // Bước 5: Kích hoạt hệ thống View và khởi chạy Game Loop
        FinishSetupAndStartGame();
    }
}
```

### Tại sao kiến trúc này quan trọng?

-   **Kiểm soát Race Condition**: Việc sử dụng `async Awake` kết hợp với `await ResourceManager` đảm bảo mọi dữ liệu đã sẵn sàng 100% trước khi logic game bắt đầu chạy.
-   **Tách biệt nạp dữ liệu**: Quy trình đọc cấu hình JSON được tập trung tại đây, giúp các Service bên dưới nhận dữ liệu sạch (Clean Data) mà không cần quan tâm dữ liệu đó đến từ đâu.
-   **Dễ gỡ lỗi**: Khi có lỗi khởi tạo, tôi chỉ cần kiểm tra tại `GameController` thay vì phải lục tìm trong từng `MonoBehaviour` rải rác khắp Scene.

> [!IMPORTANT]
> `GameController` là đối tượng duy nhất nắm được bức tranh tổng thể của dự án, đảm bảo mọi thành phần rời rạc hoạt động như một cỗ máy thống nhất.
