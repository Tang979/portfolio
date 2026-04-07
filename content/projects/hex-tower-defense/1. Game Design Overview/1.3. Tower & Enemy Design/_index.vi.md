---
title: "Thiết Kế Tháp & Kẻ Thù"
layout: "project"
weight: 2
pre: "1.3. "
---


> [!NOTE]
> Hệ thống Tháp và Enemy được thiết kế theo hướng **Data-Driven**, cho phép tùy chỉnh toàn bộ chỉ số, hiệu ứng và logic đặc biệt thông qua cấu hình JSON mà không cần thay đổi source code.

### Triết lý thiết kế & Hệ thống Chỉ số

Mỗi loại tháp được xây dựng với một bộ chỉ số cơ bản (Damage, Range, Attack Cooldown, Cost) và một hệ thống **Modifiers/Effects** linh hoạt để tạo ra sự khác biệt về mặt chiến thuật.

#### Danh sách Tháp & Cơ chế đặc trưng

| Loại Tháp | Cơ chế Tấn công | Hiệu ứng & Modifiers đặc biệt | Vai trò Chiến thuật |
|---|---|---|---|
| **Fire** | Projectile | **DOT**: Sát thương 5% Máu tối đa mỗi 0.25s. | Diệt xe tăng (Tank buster), hiệu quả với quái máu trâu. |
| **Ice** | Projectile | **Slow**: Giảm tốc độ chạy 15% trong 3s. | Hỗ trợ khống chế, giữ quái trong tầm bắn lâu hơn. |
| **Poison** | AoE / Trap | **DOT (Flat)**: Gây 5 sát thương bỏ qua giáp mỗi 0.25s. | Kiểm soát đám đông (Crowd Control) tại các nút thắt. |
| **Lightning** | Instant | **Chain Modifier**: Nảy qua 2 mục tiêu (Bounce Radius: 2). | DPS tốc độ cao (0.15s), dọn dẹp đàn quái nhỏ cực nhanh. |
| **Rock** | Projectile | **Splash Modifier**: 30% tỷ lệ gây nổ lan (Radius: 0.5). | Sát thương đột biến, phá vỡ đội hình quái tập trung. |

#### Tháp Hợp nhất (Hybrid Towers)
Một điểm nhấn trong hệ thống là tháp **Fire & Ice**, minh chứng cho sự linh hoạt của `AlternatingEffectModifier`:
- **Cơ chế**: Đạn lửa và đạn băng được bắn ra xen kẽ nhau (Visual & Logic).
- **Hiệu ứng**: Kết hợp cả sát thương **DOT (10% HP)** và làm chậm mạnh mẽ (30%), trở thành tháp đa năng nhất trong game.

### Thiết kế Enemy & Phản hồi thị giác

Enemy không chỉ là các khối di chuyển vô hồn, chúng được tích hợp chặt chẽ với hệ thống logic của tháp:

1. **Animation Speed Scaling**: Tốc độ animation của Enemy (di chuyển, bị trúng đòn) được đồng bộ hóa thực tế với thuộc tính `Speed`. Khi bị Ice Tower làm chậm, Enemy không chỉ đi chậm mà các chuyển động cũng trở nên nặng nề hơn, tạo cảm giác trực quan.
2. **Cơ chế Thưởng tài nguyên (Resource Reward)**:
    - **Tiêu diệt hoàn toàn**: Nhận 100% phần thưởng tiền (Currency).
    - **Lọt lưới (Reach Target)**: Người chơi vẫn nhận được 50% tiền thưởng từ quái đó. Đây là một quyết định Game Design nhằm giúp người chơi vẫn có cơ hội "phục hồi" kinh tế để phòng thủ tiếp sau khi bị lọt quái, giảm bớt sự ức chế (negative feedback loop).

### Lưu trình Cân bằng (Balancing Workflow)
Toàn bộ thông số trên đều được quản lý tập trung trong file JSON. Quy trình tối ưu hóa:
- **Tách biệt Dữ liệu và Logic**: Code đóng vai trò là khung vận hành (Engine) để đọc Modifier và áp dụng Effect. Việc **Cân bằng game (Game Balancing)** và điều chỉnh **Nhịp độ (Pacing)** được thực hiện hoàn toàn trên file JSON, giúp quá trình thử nghiệm và tinh chỉnh diễn ra nhanh chóng mà không cần biên dịch lại mã nguồn.
