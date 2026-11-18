---
title: "Kiểm Thử Unit Test"
layout: "project"
weight: 1
draft: true
pre: "2. "
---

### Đảm bảo chất lượng qua Unit Tests (Domain Layer)

Một trong những lợi ích lớn nhất của việc tách biệt **Logic (Domain)** và **Hiển thị (Unity)** là khả năng kiểm tra độ chính xác của game hoàn toàn tự động, không cần mở Unity Editor hay chạy thử tay từng trường hợp.

Trong dự án này, tôi không xây dựng một hệ thống test đồ sộ phức tạp, thay vào đó tôi tập trung vào việc **đảm bảo tính đúng đắn của các quy tắc cốt lõi** thông qua các mẫu test case nhỏ gọn và hiệu quả.

#### Ví dụ: Kiểm tra logic sinh tồn của Căn cứ

Dưới đây là một phần của file `BaseHealthServiceTests.cs` trích xuất thực tế từ dự án, chứng minh logic trừ máu và kích hoạt sự kiện Thua cuộc (Game Over) hoạt động chính xác:

```csharp
[Test]
public void TakeDamage_ShouldInvokeEvents_WhenHealthReachesZero()
{
    // 1. Chuẩn bị (Arrange)
    var healthService = new BaseHealthService(100);
    bool isDestroyed = false;
    healthService.OnBaseDestroyed += () => isDestroyed = true;

    // 2. Thực thi (Act)
    healthService.TakeDamage(100);

    // 3. Kiểm chứng (Assert)
    Assert.AreEqual(0, healthService.CurrentHealth, "Máu phải về không.");
    Assert.IsTrue(isDestroyed, "Sự kiện Thua cuộc phải được kích hoạt.");
}
```

### Tại sao lại cần có phần này?

-   **Bằng chứng về chất lượng code**: Chứng minh mã nguồn của tôi có cấu trúc tốt, cho phép dễ dàng kiểm soát các lỗi logic (Logic bug-free).
-   **An toàn khi mở rộng**: Khi tôi thay đổi công thức tính sát thương hay cơ chế tháp, Unit Test giúp đảm bảo các tính năng cũ không bị hỏng (Regression testing).
-   **Tư duy chuyên nghiệp**: Nhà tuyển dụng thấy được tôi quan tâm đến tính bền vững của dự án thay vì chỉ làm cho game "chạy được".

> [!TIP]
> Bạn có thể tìm thấy mã nguồn đầy đủ của các Unit Test cho từng Module (Enemy, Tower, Health) trong thư mục `Assets/Scripts/Tests` của dự án.
