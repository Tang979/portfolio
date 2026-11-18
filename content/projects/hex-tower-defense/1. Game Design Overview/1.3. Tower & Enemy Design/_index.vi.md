---
title: "Tower & Enemy Design"
layout: "project"
weight: 2
# draft: true
pre: "1.3. "
---

> [!NOTE]  
> Hệ thống Tháp và Kẻ Thù được thiết kế theo hướng **Hướng Dữ Liệu (Data-Driven)**, cho phép tất cả thông số, hiệu ứng và logic đặc biệt được tùy chỉnh qua cấu hình JSON mà không cần chạm vào mã nguồn.

### Triết lý Thiết kế & Hệ thống Thông số

Mỗi loại tháp được xây dựng xung quanh một tập thông số cốt lõi (Sát thương, Tầm bắn, Thời gian hồi chi, Chi phí) và một hệ thống **Modifier/Hiệu ứng** linh hoạt tạo ra sự khác biệt chiến thuật rõ ràng.

#### Danh sách Tháp & Cơ chế Ký hiệu

| Loại Tháp | Cơ chế Tấn công | Hiệu ứng Đặc biệt & Modifier | Vai trò Chiến thuật |
|---|---|---|---|
| **Lửa** | Đạn | **DOT**: 5% Máu Tối đa mỗi 0,25s | Phá Tank — hiệu quả chống kẻ máu cao |
| **Băng** | Đạn | **Chậm**: Giảm 15% tốc độ di chuyển trong 3s | Hỗ trợ/Kiểm soát — giữ kẻ thù trong tầm bắn lâu hơn |
| **Độc** | AoE / Bẫy | **DOT (Phẳng)**: 5 sát thương xuyên giáp mỗi 0,25s | Kiểm soát đám đông tại các điểm nghẽn |
| **Sấm** | Phát hiện ngay | **Modifier Chuỗi**: Quay lùi đến 2 mục tiêu bổ sung (Bán kính Quay: 2) | DPS cao (thời gian hồi 0,15s), xóa nhanh nhóm |
| **Đá** | Đạn | **Modifier Vỡ**: 30% cơ hội kích nổ vùng (Bán kính: 0,5) | Sát thương nổ — tiêu diệt các đội hình kẻ thù dày đặc |

#### Tháp Lai (Merged)

Một điểm nhấn trong hệ thống là tháp **Lửa & Băng**, thể hiện sự linh hoạt của `AlternatingEffectModifier`:
- **Cơ chế**: Đạn lửa và băng xen kẽ mỗi lần bắn (cả về mặt hình ảnh và logic).
- **Hiệu ứng**: Kết hợp cả **DOT (10% Máu)** và hiệu ứng chậm mạnh (30%), làm nó trở thành tháp linh hoạt nhất trong trò chơi.

### Thiết Kế Kẻ Thù & Phản hồi Hình ảnh

Kẻ thù không chỉ là thanh máu di chuyển — chúng được liên kết chặt chẽ với hệ thống logic của tháp:

1. **Đặt échelle Tốc độ Hoạt hình**: Tốc độ di chuyển và hoạt hình bị thương của kẻ thù được đồng bộ hóa theo thời gian thực với thuộc tính `Tốc độ`. Khi bị chậm bởi tháp Băng, kẻ thù không chỉ di chuyển chậm hơn — hoạt hình của chúng cũng trở nên nặng nề rõ rệt, tạo ra phản hồi hình ảnh làm hài lòng và trực quan.
2. **Cơ chế Thưởng Tài nguyên**:
    - **Bị tiêu diệt hoàn toàn**: Người chơi nhận 100% phần thưởng tiền tệ.
    - **Đến mục tiêu (Lộn)**: Người chơi vẫn nhận 50% phần thưởng. Đây là một quyết định Thiết Kế Game có ý thức — nó cho phép người chơi "khôi phục" về mặt kinh tế sau một sự xâm phạm, giảm sự phẫn nộ và làm dịu vòng lặp phản hồi tiêu cực.

### Quy trình Cân bằng

Tất cả thông số trên được quản lý tập trung trong các tệp cấu hình JSON. Quy trình tối ưu là:
- **Tách biệt Dữ liệu & Logic**: Mã nguồn đóng vai trò là engine runtime — đọc Modifier và áp dụng Hiệu ứng. **Cân bằng Game** và **Nhịp độ** được thực hiện hoàn toàn trong các tệp JSON, cho phép kiểm tra và tinh chỉnh nhanh chóng mà không cần biên dịch lại mã nguồn.
