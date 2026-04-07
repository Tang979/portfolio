---
title: "Hiệu Năng & Tối Ưu Mobile"
layout: "project"
weight: 1
pre: "6. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

Mọi quyết định kỹ thuật trong dự án đều có tính đến **hiệu năng trên thiết bị mobile tầm trung**. Hai chiến lược tối ưu hóa quan trọng nhất:

- **Procedural HexMesh** — Render toàn bộ bản đồ hex bằng 1 mesh duy nhất thay vì hàng trăm GameObject
- **Logic Coordinates thay vì Physics Engine** — Dùng Raycast và tọa độ logic để xử lý tương tác, tránh overhead của Unity Physics
