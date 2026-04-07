---
title: "Tổng Quan Thiết Kế Game"
layout: "project"
weight: 1
pre: "1. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->
<!-- Phần này giới thiệu tổng quan về tư duy thiết kế game trước khi đi vào kỹ thuật -->

Hex Tower Defense là một game Tower Defense chiến thuật được thiết kế để đặt tư duy của người chơi vào trung tâm mỗi quyết định. Thay vì đặt tháp vào vị trí cố định và chờ đợi, người chơi phải liên tục xây dựng và điều chỉnh chiến lược thông qua hai cơ chế cốt lõi: **maze building** (xây mê cung chặn đường quái) và **merge mechanic** (hợp nhất tháp để tạo tháp mạnh hơn).

Phần này phân tích các quyết định thiết kế quan trọng đằng sau dự án:

- **Core Concept & Game Loop** — Cấu trúc vòng lặp chơi và điểm khác biệt so với TD truyền thống
- **Hex Grid as a Design Tool** — Lý do lựa chọn lưới hex và ảnh hưởng của nó đến gameplay
- **Tower & Enemy Design** — Triết lý thiết kế 5 loại tháp, status effect, và hành vi kẻ thù
- **Merge Mechanic** — Cơ chế kết hợp tháp và tác động đến chiến thuật người chơi
