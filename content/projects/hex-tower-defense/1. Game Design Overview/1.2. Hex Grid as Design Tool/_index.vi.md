---
title: "Lưới Hex như một Công Cụ Thiết Kế"
layout: "project"
weight: 2
pre: "1.2. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->
<!-- Bạn có thể chỉnh sửa phần này trước khi mình dịch -->

### Tại sao chọn lưới Hex?

Ý tưởng sử dụng lưới hex xuất phát từ cảm hứng từ sàn đấu của game **Teamfight Tactics (TFT)** — nơi các ô hex tạo ra cảm giác chuyển động mượt mà và tự nhiên hơn rất nhiều so với lưới ô vuông thông thường.

Điểm quan trọng nhất của ô hex là **khoảng cách đến tất cả 6 ô lân cận đều bằng nhau**. Điều này có nghĩa là khi một đối tượng thay đổi hướng trên lưới hex, chuyển động trông hợp lý và tuyến tính hơn so với lưới vuông (nơi chuyển động đường chéo bị "lệch" về mặt cảm nhận).

### Ảnh hưởng đến gameplay

Với **6 hướng** thay vì 4 hướng trên lưới vuông, hệ quả thiết kế rõ ràng:

- **Mê cung phức tạp hơn**: Người chơi có thêm 2 hướng để chặn — mê cung có thể uốn lượn, zigzag và tạo ra những tình huống bất ngờ hơn nhiều so với lưới vuông
- **Hình dạng bản đồ đa dạng hơn**: Lưới hex cho phép tạo ra các bản đồ có hình dạng độc đáo, không bị giới hạn bởi hình chữ nhật
- **Tính trực quan hơn khi tính tầm bắn**: Vòng tầm bắn hình tròn của tháp khớp tự nhiên hơn với hình dạng hex, tránh các trường hợp "góc chết" kỳ lạ của lưới vuông

### Thách thức kỹ thuật từ quyết định thiết kế

Việc chọn hex grid kéo theo một loạt thách thức kỹ thuật — từ cách tính tọa độ offset (odd/even columns), thiết kế thuật toán A* trên hex, đến việc tạo procedural mesh — tất cả sẽ được trình bày chi tiết trong các phần tiếp theo.
