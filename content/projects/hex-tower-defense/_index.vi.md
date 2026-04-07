---
title: "Hex Tower Defense"
layout: "project"
weight: 1
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->
**Hex Tower Defense** là một dự án game mobile chiến thuật được xây dựng với mục tiêu thể hiện kỹ năng lập trình hệ thống chuyên sâu và tư duy thiết kế game (Game Design) hiện đại. Dự án tập trung vào tính linh hoạt của cấu trúc mã nguồn (Clean Architecture) và trải nghiệm chiến thuật sâu sắc trên lưới lục giác.

---

## Tổng quan Dự án

Dự án này không chỉ là một game phòng thủ tháp thông thường, mà là một minh chứng kỹ thuật về cách xây dựng một "Game Loop" ổn định và khả năng mở rộng hệ thống mà không phụ thuộc chặt chẽ vào Game Engine.

### 1. Tư duy Thiết kế (Game Design)
Dựa trên cảm hứng từ các bàn cờ Hex của thể loại Auto-Battler (như TFT), game mang đến cơ chế **Maze Building** — người chơi không chỉ đặt tháp mà còn là người trực tiếp định hình đường di chuyển của kẻ thù. Đi kèm là hệ thống **Merge Mechanic** cho phép kết hợp các tháp cơ bản thành những tháp chuyên biệt mạnh hơn.

### 2. Kiến trúc Hệ thống (Architecture)
Toàn bộ logic cốt lõi được tách biệt hoàn toàn khỏi Unity (`Domain Layer` viết bằng Pure C#), áp dụng **Dependency Injection** và **Observer Pattern**. Điều này giúp mã nguồn cực kỳ dễ bảo trì và cho phép viết **Unit Test** mà không cần khởi động Editor.

### 3. Cơ chế Cốt lõi (Mechanics)
*   **A* Pathfinding**: Thuật toán tìm đường trên lưới Hex với tie-breaker giúp đường đi trông tự nhiên.
*   **Deadlock Prevention**: Sử dụng BFS để đảm bảo người chơi không thể nhốt quái hoàn toàn trên bản đồ.
*   **Combat System**: Áp dụng Strategy và Modifier Pattern để tạo ra hàng chục loại hiệu ứng tấn công (Chain, Splash, Burn...) chỉ qua cấu hình JSON.

### 4. Hệ thống Hiệu ứng (Status Effects)
Một hệ thống `ActiveEffect` chuyên sâu hỗ trợ 5 chế độ Scaling khác nhau (theo % máu tối đa, % sát thương tháp, v.v.), cho phép tạo ra sự khác biệt rõ rệt về mặt chiến thuật giữa các loại tháp Lửa, Băng, Sấm sét và Độc.

### 5. Quản lý Dữ liệu & Tài nguyên
Dự án áp dụng phương pháp **Data-Driven**: balance game qua JSON và quản lý asset (Model, VFX) qua **Unity Addressables**. Kết hợp với **Object Pooling** để triệt tiêu tình trạng giật lag do Garbage Collection trên mobile.

### 6. Tối ưu hóa Hiệu năng
Sử dụng **Procedural HexMesh** để render toàn bộ bản đồ chỉ với một Draw Call duy nhất và thay thế hệ thống Physics nặng nề của Unity bằng tính toán tọa độ logic để xử lý tương tác tầm bắn và va chạm.

---

<!-- Gợi ý: Bạn có thể thêm một đoạn clip ngắn hoặc gif demo tại đây để "wow" nhà tuyển dụng ngay lập tức -->

> [!IMPORTANT]  
> **Trọng tâm Kỹ thuật (Technical Focus):**  
> Dự án hiện tại là bản **Technical Prototype (Alpha)**. Tôi tập trung 100% nguồn lực vào việc xây dựng **Kiến trúc bền vững (Scalable Architecture)** và **Logic Gameplay thuần túy**. Vì vậy, hệ thống VFX và UI hiện đang sử dụng các thành phần cơ bản (Placeholders) để ưu tiên cho việc tối ưu hóa hiệu năng và độ sạch của mã nguồn.

---
