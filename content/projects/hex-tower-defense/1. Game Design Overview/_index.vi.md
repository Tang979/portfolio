---
title: "Tổng Quan Thiết Kế Game"
layout: "project"
weight: 1
pre: "1. "
---

Hex Tower Defense là một game tower defense chiến thuật được thiết kế để đặt tư duy và quyết định của người chơi vào trung tâm mỗi khoảnh khắc. Thay vì đặt tháp vào vị trí cố định và chờ đợi, người chơi phải liên tục xây dựng và điều chỉnh chiến lược thông qua hai cơ chế cốt lõi: **xây mê cung** (xây tường chặn đường quái) và **cơ chế hợp nhất** (hợp nhất tháp để tạo tháp mạnh hơn).

Phần này phân tích các quyết định thiết kế quan trọng đằng sau dự án:

- **Khái niệm Cốt lõi & Vòng Lặp Chơi** — Cấu trúc vòng lặp chơi và điểm khác biệt so với TD truyền thống
- **Lưới Lục Giác là Công Cụ Thiết Kế** — Lý do lựa chọn lưới hex và ảnh hưởng của nó đến gameplay
- **Thiết Kế Tháp & Kẻ Thù** — Triết lý thiết kế 5 loại tháp, hiệu ứng trạng thái, và hành vi kẻ thù
- **Cơ chế Hợp Tháp** — Cơ chế kết hợp tháp và tác động đến chiến thuật người chơi
