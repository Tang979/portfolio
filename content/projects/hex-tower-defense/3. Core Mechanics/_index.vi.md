---
title: "Cơ Chế Cốt Lõi"
layout: "project"
weight: 1
pre: "3. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->

Phần này đi sâu vào các thuật toán và cơ chế cốt lõi tạo nên gameplay của Hex Tower Defense. Đây là nơi các quyết định thiết kế (Game Design Overview) được hiện thực hóa thành code.

- **A\* Pathfinding trên Hex Grid** — Thuật toán tìm đường ngắn nhất với tie-breaker tùy chỉnh
- **Dynamic Path Recalculation** — Cách quái tìm đường mới khi bản đồ thay đổi
- **BFS Deadlock Prevention** — Đảm bảo luôn tồn tại đường đi hợp lệ
- **Combat System** — Strategy Pattern và Modifier Pattern trong hệ thống chiến đấu
