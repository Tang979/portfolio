---
title: "Nhìn Lại & Lộ Trình Phát Triển"
layout: "project"
weight: 1
pre: "8. "
---

<!-- NỘI DUNG TIẾNG VIỆT - DRAFT ĐỂ DỊCH SANG TIẾNG ANH -->
<!-- BỔ SUNG: Bạn có thể bổ sung thêm ý kiến cá nhân vào đây -->

### Bài học từ dự án

Dự án này là lần đầu tiên tôi thực sự tổ chức một codebase theo cấu trúc rõ ràng, tách biệt hoàn toàn giữa logic và view. Những điều học được quan trọng nhất:

**Về kiến trúc và tổ chức code:**
- Hiểu được tại sao phải tách logic khỏi view — trước đây chỉ nghe nhưng chưa thực sự "cảm" được sự khác biệt cho đến khi debug trực tiếp trong một codebase đã tách
- Khi gặp bug không còn phải đoán mò "lỗi ở đâu" — biết ngay để kiểm tra logic trước, sau đó mới xem visual
- Nắm vững hơn về OOP qua việc chia nhỏ chức năng thành các class có trách nhiệm rõ ràng (Single Responsibility)

**Về Unity và công nghệ:**
- Biết cách sử dụng Addressables để load resource bất đồng bộ — tránh freeze màn hình trên mobile
- Phân biệt được khi nào nên dùng JSON (balance data) và khi nào dùng ScriptableObject (visual asset)

**Thẳng thắn về quá trình:**
Dự án vẫn được thực hiện với sự hỗ trợ đáng kể từ AI, đặc biệt trong việc giải quyết các vấn đề kỹ thuật phức tạp. Tuy nhiên, quá trình đó cũng là cách tôi học — đặt câu hỏi, hiểu giải thích, áp dụng vào context cụ thể của game. Kiến thức không hoàn toàn tự mình khám phá nhưng đủ vững để tôi hiểu lý do đằng sau mỗi quyết định thiết kế và có thể giải thích lại chúng.

---

### Roadmap: Tầm nhìn cho sự phát triển bền vững

Dự án hiện tại đã đạt được một nền tảng kiến trúc vững chắc. Nếu tiếp tục phát triển, tôi sẽ tập trung vào việc biến nó từ một trò chơi Offline thành một hệ sinh thái **Live-Ops** thực thụ:

#### 1. Hệ thống Backend & Cloud Integration (Trọng tâm)
Để nâng tầm dự án lên quy mô thương mại, việc tích hợp các dịch vụ đám mây là ưu tiên hàng đầu:
-   **Authentication (AWS Cognito)**: Triển khai hệ thống đăng nhập/đăng ký người chơi bảo mật, cho phép lưu trữ tiến trình game (Cloud Save) xuyên suốt nhiều thiết bị.
-   **Database (MongoDB Free Tier)**: Xây dựng cơ sở dữ liệu để lưu trữ Player Profile, lịch sử trận đấu và cấu hình nạp từ server thay vì chỉ nạp cục bộ từ JSON.

#### 2. Mở rộng Hệ sinh thái Game
-   **Map Editor & UGC**: Cung cấp công cụ cho phép người chơi tự tạo bản đồ thông qua định dạng JSON và chia sẻ chúng lên cộng đồng.
-   **Hệ thống Boss & AI nâng cao**: Phát triển các Boss có khả năng sử dụng kỹ năng đặc biệt (giải bùa chú, hồi máu cho lính) để thách thức chiến thuật của người chơi.
-   **Hệ thống Merge Tier 3**: Mở rộng cây tiến hóa (Evolution Tree) với các công thức phức tạp, yêu cầu tài nguyên hiếm từ các màn chơi đặc biệt.

#### 3. Tối ưu hóa & Chuyên nghiệp hóa UI/UX
-   **VFX/SFX High-end**: Thay thế các Visual giả lập bằng hệ thống Particle chuyên nghiệp và âm thanh không gian.
-   **UI Dynamic**: Chuyển đổi các Panel cơ bản sang giao diện người dùng chuyển động (Motion UI) để mang lại cảm giác cao cấp (Premium feel).

> [!IMPORTANT]
> Tầm nhìn của tôi là không chỉ dừng lại ở việc tạo ra một trò chơi, mà là xây dựng một **hệ thống có khả năng vận hành ổn định trên đám mây**, dễ dàng bảo trì và mở rộng quy mô người dùng.