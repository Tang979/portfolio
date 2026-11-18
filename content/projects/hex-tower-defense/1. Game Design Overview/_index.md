---
title: "Game Design Overview"
layout: "project"
weight: 1
pre: "1. "
---

Hex Tower Defense là một game tower defense chiến thuật được thiết kế để đặt tư duy và quyết định của người chơi vào trung tâm mọi khoảnh khắc. Thay vì đặt tháp vào vị trí cố định rồi chờ đợi, người chơi phải liên tục xây dựng và điều chỉnh chiến lược thông qua hai cơ chế cốt lõi: **xây mê cung** (xây tường định hướng lại đường di chuyển kẻ thù) và **cơ chế hợp nhất** (kết hợp tháp để tạo ra phiên bản mạnh mẽ hơn).

Phần này phân tích các quyết định thiết kế quan trọng đằng sau dự án:

- **Khái niệm Cốt lõi & Vòng Lặp Chơi** — Cấu trúc vòng chơi và điểm khác biệt so với tower defense truyền thống
- **Lưới Lục Giác là Công Cụ Thiết Kế** — Tại sao chọn lưới hex và cách nó định hình trải nghiệm chơi
- **Thiết Kế Tháp & Kẻ Thù** — Triết lý đằng sau 5 loại tháp, hiệu ứng trạng thái, và hành vi kẻ thù
- **Cơ chế Hợp Tháp** — Cách hoạt động của việc kết hợp tháp và tác động đến chiến thuật người chơi
