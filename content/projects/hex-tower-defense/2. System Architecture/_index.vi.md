---
title: "Kiến Trúc Hệ Thống"
layout: "project"
weight: 1
draft: true
pre: "2. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->
<!-- Bạn có thể bổ sung góc nhìn cá nhân trước khi mình dịch -->


### Triết lý: Tách biệt hoàn toàn giữa Logic và Hạ tầng

Kiến trúc của dự án này không chỉ là một lựa chọn kỹ thuật, mà là kết quả sau một bài học quan trọng từ bài kiểm tra trình độ (tech test) thực tế. Yêu cầu khi đó là: **"Hệ thống phải được thiết kế để có thể dễ dàng thay thế giao diện Unity bằng bất kỳ loại UI nào khác, kể cả một ứng dụng Console thuần túy."**

Sau khi nhận ra những hạn chế của việc trộn lẫn Logic và View trong các dự án trước đây, tôi đã đầu tư toàn bộ tâm huyết để tái cấu trúc Hex Tower Defense theo hướng **UI-agnostic** (Không phụ thuộc vào giao diện):

1.  **Domain-Centric Design**: Mọi logic cốt lõi (từ tính toán damage, công thức merge, đến quản lý trạng thái của Hex Grid) được viết hoàn toàn bằng **Pure C#**. Lớp này không chứa `MonoBehaviour` hay bất kỳ API nào của Unity, cho phép game vận hành trơn tru ngay cả trên môi trường Console.
2.  **Sự tách biệt Logic & View**: Unity Layer chỉ đóng vai trò là "lớp hạ tầng" (Infrastructure) — lắng nghe dữ liệu từ Domain và cập nhật hình ảnh. View tuyệt đối không can thiệp vào quy trình xử lý dữ liệu.
3.  **Khả năng Kiểm thử & Mở rộng**: Nhờ việc áp dụng **Dependency Injection (DI)** và **Observer Pattern**, hệ thống cực kỳ linh hoạt. Việc thay đổi cách load dữ liệu (từ JSON sang Server) hay thêm một loại tháp mới không bao giờ phá vỡ cấu trúc có sẵn.

> [!IMPORTANT]
> Đây là minh chứng cho quá trình trưởng thành và khả năng giải quyết các bài toán kiến trúc phức tạp của tôi, biến một thất bại từ tech test trở thành một hệ thống linh hoạt, testable và mang tính mở rộng cao.

Phần này sẽ trình bày chi tiết các quyết định kiến trúc:

-   **Clean Architecture & DDD** — Cấu trúc Domain Layer và Unity Layer
-   **Dependency Injection** — Quản lý vòng đời service bằng Constructor Injection
-   **Event-Driven (Observer Pattern)** — Giao tiếp giữa Domain và View qua C# Events
-   **Composition Root** — GameController là điểm khởi tạo duy nhất
