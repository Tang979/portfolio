---
title: "Merge Mechanic"
layout: "project"
weight: 2
# draft: true
pre: "1.4. "
---

### Cách Hoạt động

Người chơi có 2 cách để hợp tháp:

1. **Kéo từ Bản đồ sang Bản đồ**: Giữ một tháp đã đặt trên bản đồ trong khoảng **1 giây** (nhấn giữ) → tháp chuyển vào trạng thái có thể kéo → kéo nó lên tháp mục tiêu để hợp nhất
2. **Kéo từ Giao diện sang Bản đồ**: Kéo một tháp trực tiếp từ thanh tháp trong giao diện lên một tháp đã đặt trên bản đồ

Kết quả hợp nhất được xác định trước bởi **MergeRecipeData** (JSON) — mỗi cặp tháp A + B có thể tạo ra một tháp mạnh hơn C. Người chơi chỉ có thể thực hiện hợp nhất khi họ có các thành phần yêu cầu trong kho đồ.

### Ảnh hưởng Chiến thuật

Với 5 tháp cơ bản mang vào mỗi trận, người chơi không bị giới hạn chỉ ở 5 loại đó. Qua việc hợp nhất, một **cây tháp mới** mở ra:

- **Lực Tấn Công vs Kiểm soát Đường đi**: Tháp hợp nhất có thông số vượt trội, nhưng đi kèm chi phí tài nguyên và rủi ro chiến thuật. Khi hai tháp trên bản đồ được kết hợp, người chơi mất đi một **Băn Chắn** — điều này có thể hoàn toàn thay đổi đường đi của kẻ thù và phá vỡ cấu trúc mê cung đã thiết lập.
- **Mâu thuắn cốt lõi**: *Bạn nên duy trì số lượng tháp để kiểm soát đường đi, hay hy sinh một vị trí chiến lược để tạo lực apprend tập trung tại một điểm duy nhất?*
- **Khám phá Công thức**: Không phải mọi cặp tháp đều có công thức hợp nhất — điều này khuyến khích sự khám phá và thử nghiệm trong mỗi trận.

### Thách thức Kỹ thuật

Cơ chế nhấn giữ + kéo yêu cầu phân biệt rõ ràng giữa: nhấn bình thường (chọn tháp), nhấn giữ (bắt đầu kéo), và thả kéo (thực hiện hợp nhất hoặc hủy bỏ). Toàn bộ máy trạng thái được xử lý bởi `GameController.cs` và `CrystalPlacementController.cs`.
