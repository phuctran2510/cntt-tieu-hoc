# 📚 Ứng dụng CNTT trong Giáo dục Tiểu học

> **Giáo trình toàn tập 45 tiết** — Phiên bản 2024–2026

Website tra cứu giáo trình môn **Ứng dụng CNTT trong Giáo dục Tiểu học** dành cho giáo viên tiểu học và sinh viên sư phạm tiểu học.

## 🌐 Demo

**[👉 Xem trực tiếp tại đây](https://yourusername.github.io/cntt-tieu-hoc/)**

## ✨ Tính năng

- 📖 **Toàn bộ 45 tiết học** với nội dung chi tiết, phương pháp, công cụ
- 🗂️ **6 Chương học** có thể điều hướng dễ dàng
- 🔍 **Tìm kiếm toàn văn** theo từ khóa, loại tiết, chương
- 📋 **Lịch học 45 tiết** — bản đồ tổng quan và timeline
- 📱 Giao diện responsive, sidebar điều hướng thông minh

## 🗂️ Nội dung 6 chương

| Chương | Tiêu đề | Tiết |
|--------|---------|------|
| 1 | Tổng quan CNTT trong GDTH | 1–7 |
| 2 | Công cụ thiết kế bài giảng & học liệu số | 8–17 |
| 3 | Nền tảng dạy học trực tuyến & tương tác | 18–27 |
| 4 | Đánh giá số & Dữ liệu học tập | 28–34 |
| 5 | AI & Công nghệ mới trong GDTH | 35–41 |
| 6 | Thực hành tổng hợp & Đánh giá cuối khóa | 42–45 |

## 🚀 Cài đặt và chạy

### Yêu cầu
- Node.js ≥ 18
- npm ≥ 9

### Cài đặt

```bash
git clone https://github.com/yourusername/cntt-tieu-hoc.git
cd cntt-tieu-hoc
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:5173/cntt-tieu-hoc/`

### Build production

```bash
npm run build
```

## 🌍 Deploy lên GitHub Pages

### Bước 1: Tạo repository

1. Tạo repo mới tên `cntt-tieu-hoc` trên GitHub
2. Push code lên:

```bash
git init
git add .
git commit -m "Initial commit: 45-lesson CNTT curriculum"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/cntt-tieu-hoc.git
git push -u origin main
```

### Bước 2: Bật GitHub Pages

1. Vào **Settings** → **Pages**
2. Source: chọn **GitHub Actions**
3. Push code lên `main` → GitHub Actions sẽ tự build và deploy

### Bước 3: Cập nhật URL

Trong `vite.config.js`, đổi `base`:
```js
base: '/cntt-tieu-hoc/',  // tên repo của bạn
```

Trong `package.json`, đổi `homepage`:
```json
"homepage": "https://YOURUSERNAME.github.io/cntt-tieu-hoc"
```

## 🛠️ Công nghệ sử dụng

- **React 18** + Vite
- **React Router DOM v6** (SPA navigation)
- **Lexend Font** (Google Fonts)
- **GitHub Actions** (CI/CD)
- **GitHub Pages** (hosting)

## 📝 Phù hợp với

- Chương trình GDPT 2018
- Thông tư 32/2018/TT-BGDĐT
- Khung năng lực số DigComp 2.2
- UNESCO ICT-CFT Version 3.0

## 👨‍🏫 Đối tượng

- Giáo viên tiểu học
- Sinh viên sư phạm tiểu học
- Giảng viên đào tạo GV

---

Made with ❤️ for Vietnamese primary education teachers
