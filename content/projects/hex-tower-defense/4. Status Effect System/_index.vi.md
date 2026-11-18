---
title: "Hệ Thống Hiệu Ứng Trạng Thái"
layout: "project"
weight: 1
pre: "4. "
draft: true
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

Hệ thống status effect là một trong những phần được thiết kế cẩn thận nhất trong dự án. Thay vì hard-code từng loại hiệu ứng, toàn bộ hệ thống được xây dựng để **dễ mở rộng** và **linh hoạt về cách tính sát thương**.

- **Effect Lifecycle & Tick** — Cách effect được áp dụng, cập nhật và xóa bỏ
- **Effect Scaling Modes** — 5 chế độ tính sát thương khác nhau phục vụ các kịch bản gameplay
