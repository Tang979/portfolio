---
title: "Block Puzzle"
layout: "project"
weight: 3
---

**Block Puzzle** là tựa game block puzzle cổ điển trên mobile. Người chơi đặt các khối hình thức lên lưới, xóa các hàng để đạt điểm và kéo dài thời gian chơi. Độ khó tăng dần thông qua sự tiến độ cấp độ, với cơ chế booster được thiết kế và cân bằng qua lặp lại playtesting.

---

## 1. Tong quan Du an

- **The loai:** Puzzle (Block / Luoi)
- **Nen tang:** Mobile (Android / iOS)
- **Tech Stack:** Unity, C#, JSON, PlayerPrefs
- **Lien ket:** [Github](https://github.com/nguyenkhacnhat203-dev/BlockPuzzle) | [Video Gameplay](https://www.youtube.com/shorts/lrzIIYXpP3U) | [Demo](https://tang979.itch.io/block-puzzle) | [Tai APK](https://github.com/Tang979/GDD_APK_Block_Puzzle/releases)

### Muc tieu thiet ke

Mang lai trai nghiem dat block don gian de hoc nhung co y nghia tien bo. Moi cap do tro thiet chet luoi va hinh dang block moi, thach thuc nguoi choi ke hoach vi tri dat chien luoc trong khong gian luoi han che.

---

## 2. Thiet ke Tro choi

### Co che cot loi

- **Vong lap Dat Block:** Nguoi choi keo cac hinh dang block len luoi, xoa hang va cot day de dat point va bo trong luong.
- **Dieu kien thang/thua:** Dat diem muc tieu truoc khi luoi bi day de thang; khong the dat bat ky block con lai de thua.
- **Cong tien do:** Cap do tang kich thuoc luoi, tro thanh hinh dang block bao nhieu va chuan diem chinh xac hon se tien bo.

### Thiet ke cap do

- Du lieu cap do (kich thuoc luoi, tap block, muc tieu diem) duoc dinh nghia trong JSON de lap lai nhanh.
- Cap do som dung luoi mo voi hinh dang don gian; cap do sau tro nghich can va rong han chiet hon.
- Do kho tang dan thong qua phuc tap luoi va yeu cau diem thay vi ap suat thoi gian.

### Can bang tro choi

- **He thong Booster:** Undo, Rotate va Clear Line giup nguoi choi phuc hoi tu dat vi tri khong tot khong pha vo khang nang giai cap do.
- **Hinh thuc diem:** Diem tang theo so hang xoa cung luc, thuc thuc xoa nhieu hang thang thiet.
- **Dieu chinh do kho:** Lap qua playtesting de can bang ty le hoan thanh voi muc do phai phat cua nguoi choi.

### Playtesting & Lap lai

- Thuc hien cac phien playtesting de xac thuc phan bo tap block va khang nang giai luoi.
- Dieu chinh ty le sinh block va khang nang booster dua vao hanh vi nguoi choi quan duoc.
- Tro chinh ngach diem de duong duong trang tri thong qua cac level khac nhau.

---

## 3. Cong viec thuc hien

- Thiet ke vong lap luot choi cot loi, quy tắc va dieu kien thang/thua tu khien nghiem den prototype.
- Ke hoach he thong booster (Undo, Rotate, Clear Line) va kinh te tai nguyen trong tro choi.
- Viet Tai lieu Thiet ke Tro choi (GDD) ghi luu co che, cau truc cap do va tham so can bang.
- Lap lai co che va do kho thong qua cac chu ky playtesting co cau truc.
- Prototype trong Unity/C# voi cau hinh cap do duoc dieu chinh qua JSON.

---

## 4. Tai lieu Thiet ke Tro choi (GDD)

Viet GDD bao gom:

- Vong lap luot choi cot loi va dieu kien thang/thua
- Kich thuoc luoi cap do, tap block va muc tieu diem
- Dinh nghia booster, chi phi va hieu ung
- Tham so tien do do kho
- Khung man hinh UI va so do luong tro choi

---
