---
title: "Tải Tài Nguyên Bất Đồng Bộ Với Addressables"
layout: "project"
weight: 2
pre: "5.2. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Vấn đề: Load asset đồng bộ trên mobile

Trên thiết bị mobile, load tất cả asset lúc khởi động bằng `Resources.Load` sẽ gây hiện tượng freeze màn hình do chạy trên main thread. Cần giải pháp bất đồng bộ.

### Giải pháp: Unity Addressables + async/await

Visual assets (prefab tháp, prefab enemy, hiệu ứng đạn) được đăng ký trong Addressable system và load bất đồng bộ:

```csharp
// ResourceManager.cs — load và cache bất đồng bộ
public static async Task LoadTowerAsync(string towerId)
{
    if (_towerCache.ContainsKey(towerId)) return; // Đã có trong cache

    var handle = Addressables.LoadAssetAsync<GameObject>($"Towers/{towerId}");
    await handle.Task;

    if (handle.Status == AsyncOperationStatus.Succeeded)
        _towerCache[towerId] = handle.Result;
}

public static TowerOS GetTowerOS(string towerId)
{
    return _towerCache.TryGetValue(towerId, out var obj)
        ? obj.GetComponent<TowerOS>()
        : null;
}
```

### Phân tách dữ liệu rõ ràng

| Loại dữ liệu | Lưu trữ | Lý do |
|---|---|---|
| Balance (HP, damage, cost) | **JSON** | Cần chỉnh liên tục, không cần rebuild |
| Visual (prefab 3D, particle) | **Addressables** | Nặng, cần load bất đồng bộ, hỗ trợ hot-reload |

### Kết hợp với Object Pool

Sau khi load xong, prefab ngay lập tức được pre-warm vào `PoolManager` để tránh lag khi game chạy:

```csharp
// GameController.Awake() — sau khi load xong mới prewarm pool
var towerOS = ResourceManager.GetTowerOS(t.Id);
if (towerOS?.towerPrefab != null)
    PoolManager.Prewarm(towerOS.towerPrefab, 3);
```
