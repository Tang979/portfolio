---
title: "Quản Lý Dữ Liệu & Tài Nguyên"
layout: "project"
weight: 1
pre: "5. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

Một nguyên tắc quan trọng trong dự án là **tách biệt dữ liệu khỏi code logic**. Dữ liệu game được chia thành 2 loại rõ ràng:

- **JSON** — Lưu trữ các thông số cân bằng game (balance data): HP, sát thương, tốc độ, giá tiền, wave config. Có thể chỉnh sửa mà không cần recompile
- **ScriptableObject / Addressables** — Lưu trữ các asset visual: prefab 3D model tháp, prefab kẻ thù, hiệu ứng đạn

Phân chia này cho phép điều chỉnh balance hoàn toàn tách biệt với việc thay đổi visual asset.
