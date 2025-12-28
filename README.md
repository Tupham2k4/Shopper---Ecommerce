# 🛍️ E-Commerce Website

Một ứng dụng thương mại điện tử hoàn chỉnh được xây dựng với React, Node.js và MongoDB. Dự án bao gồm frontend cho khách hàng, admin panel để quản lý sản phẩm và đơn hàng, cùng với RESTful API backend.

## 📋 Mục Lục

- [Tính Năng](#tính-năng)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Cài Đặt](#cài-đặt)
- [Cách Sử Dụng](#cách-sử-dụng)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Tác Giả](#tác-giả)

## ✨ Tính Năng

### Frontend (Khách Hàng)
- 🏪 **Cửa hàng trực tuyến** - Duyệt và tìm kiếm sản phẩm theo danh mục
- 🛒 **Giỏ hàng** - Thêm, xóa, cập nhật số lượng sản phẩm
- 💳 **Thanh toán** - Trang checkout với thông tin khách hàng và phương thức thanh toán
- 👤 **Đăng ký/Đăng nhập** - Xác thực người dùng với JWT
- 📱 **Responsive Design** - Tối ưu cho mọi thiết bị

### Admin Panel
- ➕ **Quản lý sản phẩm** - Thêm, xóa, cập nhật sản phẩm
- 📦 **Danh sách đơn hàng** - Xem tất cả đơn hàng của khách hàng
- 📤 **Upload hình ảnh** - Tải lên và quản lý hình ảnh sản phẩm
- 📊 **Dashboard** - Giao diện quản trị trực quan

### Backend
- 🔐 **Xác thực người dùng** - JWT-based authentication
- 🗄️ **Database** - MongoDB với Mongoose ODM
- 📁 **File Upload** - Multer cho việc upload hình ảnh
- 🔒 **Bảo mật** - CORS, middleware xác thực
- 📡 **RESTful API** - API endpoints chuẩn REST

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **React** ^19.2.3
- **React Router DOM** ^7.11.0
- **React Context API** - Quản lý state giỏ hàng
- **CSS3** - Styling và responsive design

### Admin Panel
- **React** ^19.2.0
- **Vite** ^7.2.4 - Build tool nhanh
- **React Router DOM** ^7.11.0

### Backend
- **Node.js** - Runtime environment
- **Express.js** ^5.2.1 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** ^9.0.2 - ODM cho MongoDB
- **JSON Web Token** ^9.0.3 - Authentication
- **Multer** ^2.0.2 - File upload middleware
- **CORS** ^2.8.5 - Cross-origin resource sharing

## 📁 Cấu Trúc Dự Án

```
E-commerce/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── Components/    # React components
│   │   ├── Context/       # Context API (ShopContext)
│   │   ├── Pages/         # Page components
│   │   └── ...
│   └── package.json
│
├── admin/            # Admin panel (React + Vite)
│   ├── src/
│   │   ├── Components/    # Admin components
│   │   ├── Pages/         # Admin pages
│   │   └── ...
│   └── package.json
│
└── backend/          # Node.js backend server
    ├── index.js      # Main server file
    ├── upload/       # Uploaded images storage
    └── package.json
```

## 🚀 Cài Đặt

### Yêu Cầu Hệ Thống
- Node.js (v16 hoặc cao hơn)
- MongoDB (Local hoặc MongoDB Atlas)
- npm hoặc yarn

### Bước 1: Clone Repository
```bash
git clone <repository-url>
cd E-commerce
```

### Bước 2: Cài Đặt Dependencies cho Backend
```bash
cd backend
npm install
```

### Bước 3: Cài Đặt Dependencies cho Frontend
```bash
cd ../frontend
npm install
```

### Bước 4: Cài Đặt Dependencies cho Admin Panel
```bash
cd ../admin
npm install
```

### Bước 5: Cấu Hình Backend

Mở file `backend/index.js` và cập nhật MongoDB connection string:

```javascript
mongoose.connect("mongodb+srv://your-username:your-password@cluster.mongodb.net/e-commerce");
```

Hoặc sử dụng MongoDB local:
```javascript
mongoose.connect("mongodb://localhost:27017/e-commerce");
```

## 🎯 Cách Sử Dụng

### Chạy Backend Server
```bash
cd backend
node index.js
```
Server sẽ chạy tại `http://localhost:4000`

### Chạy Frontend
```bash
cd frontend
npm start
```
Ứng dụng sẽ mở tại `http://localhost:3000`

### Chạy Admin Panel
```bash
cd admin
npm run dev
```
Admin panel sẽ chạy tại `http://localhost:5173` (hoặc port khác mà Vite chỉ định)

## 📡 API Endpoints

### Products
- `GET /allproducts` - Lấy tất cả sản phẩm
- `POST /addproduct` - Thêm sản phẩm mới (Admin)
- `POST /removeproduct` - Xóa sản phẩm (Admin)
- `GET /newcollections` - Lấy sản phẩm mới
- `GET /popularinwomen` - Lấy sản phẩm phổ biến

### User Authentication
- `POST /signup` - Đăng ký tài khoản mới
- `POST /login` - Đăng nhập

### Cart (Yêu cầu authentication)
- `POST /addtocart` - Thêm sản phẩm vào giỏ hàng
- `POST /removefromcart` - Xóa sản phẩm khỏi giỏ hàng
- `POST /getcart` - Lấy giỏ hàng của user
- `POST /clearcart` - Xóa toàn bộ giỏ hàng

### Orders
- `POST /placeorder` - Đặt hàng mới
- `GET /allorders` - Lấy tất cả đơn hàng (Admin)

### File Upload
- `POST /upload` - Upload hình ảnh sản phẩm
- `GET /images/:filename` - Lấy hình ảnh đã upload

## 🎨 Tính Năng Chi Tiết

### Trang Checkout
- Form nhập thông tin khách hàng (Họ tên, Email, Địa chỉ)
- Hiển thị tóm tắt đơn hàng
- Chọn phương thức thanh toán (Tiền mặt / Chuyển khoản ngân hàng)
- Thông báo thanh toán thành công
- Tự động xóa giỏ hàng sau khi thanh toán

### Admin Panel
- **Add Product**: Thêm sản phẩm mới với hình ảnh
- **Product List**: Xem và quản lý tất cả sản phẩm
- **Order List**: Xem danh sách đơn hàng với thông tin chi tiết:
  - Mã đơn hàng
  - Thông tin khách hàng
  - Danh sách sản phẩm
  - Tổng tiền
  - Phương thức thanh toán
  - Trạng thái đơn hàng
  - Ngày đặt hàng

## 🔒 Bảo Mật

- JWT-based authentication
- Password hashing (cần implement trong production)
- CORS configuration
- Protected routes với middleware
- Input validation

## 📝 Ghi Chú

- Đảm bảo MongoDB đang chạy trước khi start backend server
- File upload được lưu trong thư mục `backend/upload/images/`
- JWT secret key hiện tại là `"secret_ecom"` - nên thay đổi trong production
- Port mặc định: Backend (4000), Frontend (3000), Admin (5173)

## 🚧 Cải Tiến Trong Tương Lai

- [ ] Tìm kiếm và lọc sản phẩm
- [ ] Đánh giá và bình luận sản phẩm
- [ ] Wishlist (Danh sách yêu thích)
- [ ] Thanh toán trực tuyến (Stripe, PayPal)
- [ ] Email notifications
- [ ] Quản lý trạng thái đơn hàng (pending, shipping, delivered)
- [ ] Dashboard với thống kê
- [ ] Pagination cho danh sách sản phẩm và đơn hàng



