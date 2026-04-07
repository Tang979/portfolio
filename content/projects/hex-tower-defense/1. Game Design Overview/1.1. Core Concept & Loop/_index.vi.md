---
title: "Khái Niệm Cốt Lõi & Vòng Lặp Game"
layout: "project"
weight: 2
pre: "1.1. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->
<!-- Bạn có thể chỉnh sửa phần này trước khi mình dịch -->

### Tổng quan game

Hex Tower Defense là game Tower Defense chiến thuật trên nền lưới lục giác (hex grid). Điểm khác biệt lớn nhất so với các game TD thông thường nằm ở hai cơ chế bổ trợ lẫn nhau: **maze building** và **merge mechanic**.

### Vòng lặp chơi cốt lõi (Game Loop)

1. **Đặt tháp phòng thủ** — Người chơi chọn tháp từ loadout 5 tháp mang theo rồi đặt lên bản đồ hex
2. **Tiêu diệt wave quái** — Quái tự di chuyển theo đường ngắn nhất đến điểm đích, tháp tự động tấn công trong tầm
3. **Thu tiền & mua thêm tháp** — Mỗi con quái chết (hoặc cả khi đến được điểm đích) đều trả về một lượng tiền nhất định
4. **Merge tháp để mạnh hơn** — Giữ một tháp trên map khoảng 1 giây rồi kéo vào tháp khác, hoặc kéo tháp từ UI vào tháp trên map để hợp nhất thành tháp mạnh hơn
5. **Thắng hoặc thua** — Nếu quái về đến điểm đích: trừ máu base. Hết máu = thua. Clear toàn bộ wave = thắng.

### Điểm khác biệt: Maze Building

Trong các game TD truyền thống, người chơi đặt tháp bên cạnh đường đã cố định sẵn. Trong Hex Tower Defense, **bản thân việc đặt tháp chính là việc xây đường**.

Người chơi có thể đặt tháp chặn ngang đường đi của quái, buộc quái phải tìm đường vòng dài hơn — tăng thời gian quái tiếp xúc với tháp. Hệ thống đảm bảo luôn tồn tại ít nhất một đường đi từ điểm spawn đến điểm đích (BFS deadlock prevention), vừa giữ tính công bằng vừa tăng độ sâu chiến thuật.

### Mục tiêu trải nghiệm

Tôi muốn người chơi cảm thấy mình đang *thực sự* xây dựng chiến lược, không chỉ đặt tháp vào slot cố định. Mỗi quyết định — đặt tháp ở đâu, merge tháp nào với tháp nào, khi nào nên tạo đường vòng — đều có trọng lượng và tạo ra tình huống mới.
