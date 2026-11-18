---
title: "Core Concept & Game Loop"
layout: "project"
weight: 2
# draft: true
pre: "1.1. "
---

### Khái niệm Cốt lõi

Hex Tower Defense là một trò chơi tower defense chiến thuật trên lưới lục giác. Điểm khác biệt lớn nhất so với tower defense truyền thống nằm ở hai cơ chế cùng phản lặp: **xây mê cung** và **cơ chế hợp nhất**.

Trong tower defense thông thường, người chơi đặt tháp bên cạnh một đường đi đã được sẵn có. Trong Hex Tower Defense, **đặt một tháp đồng nghĩa với việc xây dựng đường đi**.

### Vòng Lặp Chơi (Core Loop)

1. **Xây phòng tuyến** — Người chơi chọn một tháp từ bộ sưu tập 5 tháp cơ bản và đặt lên lưới lục giác
2. **Chống chọi các đợt tấn công** — Kẻ thù di chuyển tự hành theo đường đi ngắn nhất đến mục tiêu; tháp tấn công tự động khi trong tầm bắn
3. **Nhận tiền & mua thêm tháp** — Mỗi kẻ thù bị tiêu diệt (hoặc thậm chí cả khi tràn mục tiêu) sẽ đưa về tiền thưởng
4. **Hợp tháp để tăng sức mạnh** — Giữ tháp trên bản đồ trong khoảng 1 giây (nhấn giữ), sau đó kéo nó lên tháp khác, hoặc kéo tháp trực tiếp từ thanh UI lên tháp trên bản đồ, để tạo tháp hợp nhất mạnh hơn
5. **Thắng hoặc thua** — Nếu kẻ thù đến đích: căn cứ mất máu. Máu căn cứ về صفر = thua. Xử lý hết mọi đợt tấn công = thắng.

### Điểm Nổi Bật: Xây Mê Cung

Trong tower defense truyền thống, người chơi đặt tháp bên cạnh đường đi đã cố định. Trong Hex Tower Defense, **mỗi tháp đặt ra cũng là xây tường**.

Người chơi có thể chặn đường kẻ thù bằng cách đặt tháp trực tiếp vào đường đi, buộc chúng phải tìm đường vòng dài hơn — kéo dài thời gian kẻ thù hoạt động trong tầm bắn của tháp. Hệ thống đảm bảo luôn tồn tại ít nhất một đường đi hợp lệ từ mỗi điểm xuất phát đến mục tiêu (phòng ngừa tử vọng bằng BFS), giữ sự công bằng trong khi mở rộng không gian chiến thuật.

### Mục Tiêu Thiết Kế

Tôi muốn người chơi cảm thấy mình *thực sự* đang xây dựng một chiến lược, chứ không chỉ đơn thuần là thả tháp vào các ô cố định. Mỗi quyết định — đặt tháp ở đâu, hợp tháp nào, khi nào tạo đường vòng dài hơn — đều có trọng lượng và tạo ra các tình huống mới.
