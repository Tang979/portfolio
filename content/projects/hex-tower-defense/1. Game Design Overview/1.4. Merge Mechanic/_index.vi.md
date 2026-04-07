---
title: "Cơ Chế Hợp Nhất (Merge)"
layout: "project"
weight: 2
pre: "1.4. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->
<!-- Bạn có thể chỉnh sửa và bổ sung phần này trước khi mình dịch -->

### Ý tưởng & Nguồn cảm hứng

<!-- BỔ SUNG: Merge mechanic lấy cảm hứng từ đâu? (Auto Chess? Puzzle games? Merge Dragons?) -->
<!-- BỔ SUNG: Vấn đề gì bạn muốn giải quyết khi thiết kế cơ chế này? -->

### Cơ chế hoạt động

Người chơi có 2 cách để merge tháp:

1. **Kéo từ map sang map**: Giữ tháp đang đặt trên bản đồ khoảng **1 giây** (long press) → tháp chuyển sang trạng thái có thể kéo → kéo về ô đặt tháp muốn merge
2. **Kéo từ UI vào map**: Kéo tháp trực tiếp từ thanh tháp ở UI vào một tháp đang đặt trên bản đồ

Kết quả merge được xác định trước thông qua **MergeRecipeData** (JSON) — mỗi cặp tháp A + B có thể cho ra một tháp C mạnh hơn. Người chơi chỉ có thể thực hiện merge khi mang đủ nguyên liệu trong loadout.

### Tác động đến chiến thuật

Với 5 tháp cơ bản mang theo vào mỗi ván, người chơi không bị giới hạn chỉ ở 5 loại đó. Thông qua merge, một **cây tháp mới** mở ra:

- **Sức mạnh vs. Kiểm soát Lộ trình**: Tháp Merge có chỉ số vượt trội nhưng đi kèm chi phí tài nguyên và rủi ro chiến thuật. Khi gộp hai tháp trên bản đồ, người chơi sẽ mất đi một "vật cản" (Blocking), việc này có thể làm thay đổi hoàn toàn đường đi của Enemy và phá vỡ cấu trúc mê cung đã thiết lập.
- **Bài toán Cân não**: *Nên duy trì số lượng tháp để kiểm soát đường đi, hay hy sinh một vị trí chiến lược để tạo ra hỏa lực cực mạnh tập trung tại một điểm?*
- **Khám phá Recipe**: Không phải mọi cặp tháp đều có công thức kết hợp — điều này thúc đẩy sự tìm tòi và thử nghiệm trong mỗi ván chơi.

### Thách thức kỹ thuật

Cơ chế long-press + drag đặt ra yêu cầu phân biệt rõ ràng giữa: tap thông thường (select tower), long press (bắt đầu drag), và drag kết thúc (thực hiện merge hoặc hủy). Toàn bộ state machine này được xử lý trong `GameController.cs` và `CrystalPlacementController.cs`.
