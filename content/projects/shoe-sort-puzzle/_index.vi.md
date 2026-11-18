---
title: "Shoe Sort Puzzle"
layout: "project"
weight: 2
---

**Shoe Sort Puzzle** là tựa game giải đố sắp xếp trên nền tảng di động. Người chơi cần di chuyển các chiếc giày để ghép (match) 3 chiếc giống nhau vào cùng một hộp (box) nhằm loại bỏ chúng khỏi màn chơi trước khi hết thời gian.

---

## 1. Tổng quan Dự án

- **Thể loại:** Puzzle (Match-3 / Sắp xếp)
- **Nền tảng:** Mobile (Android / iOS)
- **Tech Stack:** Unity, C#, JSON, DOTween, PlayerPrefs
- **Liên kết:** [Github](https://github.com/nguyenkhacnhat203-dev/Shoe_Sort_Puzzle) | [Video Gameplay](https://youtube.com/shorts/KJ3jWdtoe6w) | [Demo](https://tang979.itch.io/shoe-sort-puzzle) | [Tải APK](https://github.com/Tang979/GDD_APK_Shoe_Sort_Puzzle/releases)

### Mục tiêu thiết kế

Mang lại trải nghiệm giải đố đơn giản nhưng thu hút, tập trung vào khả năng quan sát và sắp xếp. Mỗi cấp độ có giới hạn thời gian động dựa trên độ khó, mang lại sự dễ tiếp cận nhưng cũng đầy thử thách.

---

## 2. Thiết kế Trò chơi

### Cơ chế cốt lõi

- **Vòng lặp Match-3 Sắp xếp:** Người chơi kéo và thả giày vào hộp, loại bỏ nhóm 3 giày giống nhau để tiến bộ.
- **Điều kiện thắng/thua:** Loại bỏ tất cả giày trước khi đồng hồ hết giờ để thắng; hết giờ hoặc hết bước đi hợp lệ để thua.
- **Cong tiến độ:** Giới hạn thời gian tăng theo độ khó cấp độ, thúc đẩy thách thức khi người chơi thành thạo cơ chế sắp xếp.

### Thiết kế màn chơi

- Các cấp độ được định nghĩa qua JSON, cho phép lặp lại nhanh chóng về số lượng hộp, phân phối giày và giới hạn thời gian mà không cần thay đổi code.
- Mỗi cấp độ đảm bảo ít nhất một bước đi hợp lệ đầu tiên và tránh sinh sẵn ba giày đã khớp, đảm bảo khởi đầu công bằng.
- Độ khó tăng dần thông qua nhiều hộp hơn, nhiều loại giày hơn và giới hạn thời gian chặt chẽ hơn.

### Cân bằng trò chơi & Kinh tế

- **Hệ thống Booster:** Magnet, Shuffle và Add Box được thiết kế để giải quyết trạng thái kẹt mà không phá vỡ khả năng giải level.
- **Hệ thống tài nguyên:** Tim (sức lực) và Vàng (tiền tệ) với phục hồi theo thời gian; Tim bị trừ khi thua hoặc thoát giữa chừng.
- **Điều chỉnh độ khó:** Lặp qua các phiên playtesting để tối ưu hóa tỷ lệ hoàn thành và độ dài phiên chơi.

### Playtesting & Lặp lại

- Thực hiện các phiên playtesting có cấu trúc để xác thực khả năng giải level và nhận thức độ khó.
- Điều chỉnh khả năng sử dụng booster và chi phí tài nguyên dựa trên hành vi người quan sát được và điểm thoát game.
- Tinh chỉnh cửa sổ popup UI và thời điểm gợi ý để giảm thiểu trở ngại cho người chơi mới.

---

## 3. Công việc thực hiện

Trong dự án này, tôi đã phụ trách xây dựng toàn bộ gameplay chính và các hệ thống lõi:

- **Khởi tạo dữ liệu màn chơi:** Đọc dữ liệu level từ JSON để thiết lập số lượng hộp, giày và phân phối ngẫu nhiên vào hộp/kệ (shelf) sao cho hợp lệ.
- **Hệ thống Input:** Phát triển cả cơ chế Drag & Drop và Tap-to-move, xử lý xung đột linh hoạt.
- **Game State Manager:** Quản lý các trạng thái game (Menu, OnGame, Pause, Win, Lose) và đồng bộ TimeScale. Input chỉ được nhận trong trạng thái OnGame.
- **Hệ thống Booster:** Xây dựng logic cho các kỹ năng hỗ trợ (Magnet, Shuffle, Add Box) an toàn với trạng thái game.
- **Resource & Energy System:** Quản lý Timers hồi Tim, vàng (Gold), và logic trừ Tim khi thua, replay, hoặc thoát giữa chừng.
- **UI & Flow:** Xây dựng flow mua Tim, Booster qua popup và hệ thống tự động gợi ý (Hint).

---

## 4. Tài liệu Thiết kế Trò chơi (GDD)

Viết Tài liệu Thiết kế Trò chơi toàn diện bao gồm:

- Vòng lặp lối chơi lõi và điều kiện thắng/thua
- Cấu trúc cấp độ và tham số tiến độ
- Định nghĩa booster, chi phí và hiệu ứng
- Kinh tế tài nguyên (Tim/Vàng) và tốc độ phục hồi
- Khung màn hình UI và sơ đồ luồng trò chơi

---

## 5. Thử thách Kỹ thuật

### 5.1. Xử lý khởi tạo ngẫu nhiên hợp lệ

Thiết kế thuật toán để phân phối giày ngẫu nhiên nhưng vẫn đảm bảo:

- Không sinh sẵn 3 giày giống nhau trong cùng 1 hộp.
- Luôn tồn tại ít nhất 1 ô trống để người chơi có thể bắt đầu di chuyển.

### 5.2. Quản lý luồng dữ liệu (Box và Shelf)

Phát triển logic đồng bộ giữa khu vực Box và Shelf. Sau mỗi lần match, giày chờ từ Shelf sẽ được đẩy lên Box, kèm theo hoạt ảnh mượt mà và cập nhật hàng chờ mới mà không gây lỗi trạng thái.

### 5.3. Xử lý xung đột Input & Animation

Sử dụng **DOTween** để xử lý hoạt ảnh mượt mà. Hệ thống phải đảm bảo trạng thái logic chỉ cập nhật sau khi animation kết thúc và ngăn chặn lỗi khi người chơi thao tác quá nhanh hoặc dùng song song cả Drag & Drop và Click/Tap.

### 5.4. Thiết kế logic Booster an toàn

Các Booster (như Shuffle hay Add Box) thay đổi trực tiếp cấu trúc dữ liệu của màn chơi. Tôi phải thiết kế kiến trúc sao cho sau khi Booster chạy, trạng thái gameplay vẫn luôn hợp lệ và không gây crash game.

---

{{< youtube id="KJ3jWdtoe6w" >}}
