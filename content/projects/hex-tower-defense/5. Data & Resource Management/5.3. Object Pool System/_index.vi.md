---
title: "Hệ Thống Object Pool"
layout: "project"
weight: 2
draft: true
pre: "5.3. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

### Vấn đề: Instantiate/Destroy liên tục gây GC Spikes

Trong một ván game TD, hàng trăm viên đạn và hàng chục enemy được tạo ra rồi phá huỷ liên tục. Việc gọi `Instantiate()` và `Destroy()` liên tục gây ra **Garbage Collection spikes** — đặc biệt nguy hiểm trên mobile dẫn đến hiện tượng giật khung hình.

### Giải pháp: Object Pooling

Thay vì tạo mới và phá huỷ, hệ thống tái sử dụng các GameObject đã tạo sẵn:

```csharp
// PoolManager.cs
public void Prewarm(GameObject prefab, int count)
{
    if (!_pools.ContainsKey(prefab))
        _pools[prefab] = new Queue<GameObject>();

    for (int i = 0; i < count; i++)
    {
        var obj = Instantiate(prefab);
        obj.SetActive(false);
        _pools[prefab].Enqueue(obj);
    }
}

public GameObject GetFromPool(GameObject prefab)
{
    if (_pools.TryGetValue(prefab, out var pool) && pool.Count > 0)
    {
        var obj = pool.Dequeue();
        obj.SetActive(true);
        return obj;
    }
    return Instantiate(prefab); // Fallback nếu pool cạn
}

public void ReturnPool(GameObject prefab, GameObject obj)
{
    obj.SetActive(false);
    _pools[prefab].Enqueue(obj);
}
```

### Luồng hoạt động thực tế

1. **Lúc load game** (`Awake`): Pre-warm 3 instance/loại tháp và đạn vào pool
2. **Khi bắn đạn**: `TowerView` gọi `PoolManager.GetFromPool(bulletPrefab)` thay vì `Instantiate`
3. **Khi đạn trúng đích**: Gọi `PoolManager.ReturnPool(bulletPrefab, bullet)` thay vì `Destroy`

Kết quả: Không có allocation mới trong game loop — GC không được kích hoạt bởi việc tạo/phá huỷ đạn và enemy.
