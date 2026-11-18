---
title: "Hex Grid as a Design Tool"
layout: "project"
weight: 2
# draft: true
pre: "1.2. "
---

### Tại sao chọn Lục Giác?

Ý tưởng sử dụng lưới lục giác lấy cảm hứng từ chiến trường của **Teamfight Tactics (TFT)** — nơi các ô lục giác tạo ra chuyển động mượt mà và tự nhiên hơn so với lưới vuông chuẩn.

Thuộc tính quan trọng nhất của một ô lục giác là **khoảng cách đến tất cả 6 hàng xóm đều bằng nhau**. Điều này có nghĩa là khi một đối tượng thay đổi hướng di chuyển trên lưới lục giác, chuyển động sẽ trông hợp lý và thẳng tắp — khác hẳn lưới vuông nơi di chuyển chéo thường cảm thấy "không ổn" về mặt nhận thức.

### Ảnh hưởng đến Gameplay

Với **6 hướng** thay vì 4 hướng trên lưới vuông, các ý nghĩa thiết kế rõ ràng:

- **Mê cung phức tạp hơn**: Người chơi có 2 hướng bổ sung để chặn — mê cung có thể co cong, zigzag, và tạo ra các tình huống đáng ngạc nhiên hơn nhiều so với lưới vuông cho phép
- **Hình dạng bản đồ đa dạng hơn**: Lưới lục giác cho phép các hình dạng bản đồ độc đáo không bị giới hạn bởi hình chữ nhật
- **Hiển thị tầm bắn trực quan hơn**: Tầm bán kính vòng tròn của một tháp tự nhiên phù hợp với hình lục giác, tránh được các trường hợp "góc chết" lạ lẫm của lưới vuông

### Thách thức Kỹ thuật từ Quyết định Thiết kế này

Việc chọn lưới lục giác đã đưa ra một loạt thách thức kỹ thuật — từ tính toán toạ độ chênh lệch (cột chẵn/lẻ) và thiết kế thuật toán A* cho hình học lục giác, đến tạo lưới thủ tục — tất cả được giải quyết chi tiết trong các phần sau.
