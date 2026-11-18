---
title: "Hex Tower Defense"
layout: "project"
weight: 1
---

**Hex Tower Defense** là game thủ thành chiến thuật xoay quanh một câu hỏi: *Nếu người chơi tự tạo đường đi cho kẻ địch thay vì chỉ đặt tháp thì sao?* Game kết hợp cơ chế **xây mê cung** và **hợp nhất tháp** trên lưới lục giác, khiến mỗi lựa chọn đều ảnh hưởng đến diễn biến từng đợt quái.

---

## Tổng quan dự án

Trò chơi không chỉ là đặt tháp dọc theo một tuyến đường cố định; người chơi trực tiếp **định hình chiến trường**. Mỗi tháp trở thành chướng ngại vật, buộc kẻ địch đổi hướng. Hợp nhất tháp giúp tăng sức tấn công nhưng có thể làm thay đổi tuyến đường đã xây. Người chơi vừa thiết kế đường đi vừa đưa ra quyết định chiến thuật.

### 1. Trụ cột thiết kế

**Xây mê cung — Người chơi tự thiết kế đường đi.**

Đặt tháp cũng đồng nghĩa tạo chướng ngại vật. Kẻ địch tìm tuyến ngắn nhất tới mục tiêu, vì vậy mỗi vị trí đặt tháp có thể tạo đường vòng, điểm nghẽn và vùng tấn công. Người chơi luôn phải giữ lại ít nhất một lối đi hợp lệ để đảm bảo công bằng.

**Hợp nhất tháp — Sức mạnh hay quyền kiểm soát?**

Mỗi trận bắt đầu với năm tháp cơ bản. Hợp nhất mở khóa các tháp lai mạnh hơn, nhưng cũng lấy một tháp khỏi bản đồ và có thể làm thay đổi thế phòng thủ. Người chơi cần cân nhắc giữa giữ quyền kiểm soát đường đi và tập trung hỏa lực.

**Cân bằng dựa trên dữ liệu.**

Thông số tháp, đợt quái và công thức hợp nhất được lưu trong JSON. Nhờ vậy, người thiết kế có thể điều chỉnh nhịp độ, đường cong độ khó và tương quan khắc chế mà không cần sửa mã nguồn, thuận tiện cho các vòng cân bằng và playtesting.

### 2. Cơ chế chính

- **Tìm đường A\* trên lưới lục giác** — Kẻ địch di chuyển theo sáu hướng; quy tắc xử lý các tuyến có độ dài bằng nhau giúp đường đi nhất quán và dễ đọc.
- **Chống bế tắc** — BFS đảm bảo luôn tồn tại đường tới mục tiêu. Người chơi có thể dồn ép kẻ địch nhưng không thể khóa cứng màn chơi.
- **Hệ thống chiến đấu** — Các mẫu `Strategy` và `Modifier` cùng cấu hình JSON cho phép kết hợp Chain, Splash, Burn, Slow và DOT mà không cần viết riêng logic cho từng tháp.
- **Hiệu ứng trạng thái** — Năm chế độ scale tạo nên vai trò chiến thuật khác nhau: Fire gây sát thương lên kẻ địch nhiều máu, Ice kiểm soát không gian, Lightning đánh vào nhóm quái, Poison giữ các điểm nghẽn.
- **HexMesh tạo theo quy trình** — Toàn bộ bản đồ được dựng bằng một `Draw Call`; xử lý bằng logic thay cho vật lý nặng để phù hợp với mobile.
- **Object pooling** — Hạn chế giật khung hình do garbage collection trong các đợt quái lớn.

---

{{< video src="https://pub-f6cbf98bec4b4b6783bd5dad847daa28.r2.dev/Demo.mp4" >}}

---

> [!IMPORTANT]
>
> **Ghi chú thiết kế:**
>
> Đây là **nguyên mẫu kỹ thuật (alpha)** nhằm kiểm chứng kiến trúc có thể mở rộng và logic gameplay. VFX và UI hiện dùng thành phần placeholder; giai đoạn này ưu tiên hiệu năng và cấu trúc mã.
