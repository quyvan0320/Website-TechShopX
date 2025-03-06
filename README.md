# Giới thiệu

Một dự án e-Commerce được phát triển bằng các công nghệ ReactJS, Redux Toolkit, RTK Query, NodeJS, MongoDB và sử dụng thư viện **@paypal/react-paypal-js** để tích hợp thanh toán bằng Paypal. Trang có các chức năng cơ bản của như giỏ hàng, thêm sửa xóa sản phẩm, tìm kiếm, v.v

# Chạy dự án trong môi trường phát triển

Chạy cả **backend** và **frontend** cùng lúc với package concurrently:

```
"scripts": {
  "dev": "concurrently \"npm run backend\" \"npm run frontend\"",
  "backend": "nodemon backend/index.js",
  "frontend": "npm run dev --prefix frontend"
}
```

```js
npm run dev
```
Lệnh này sẽ:

- Chạy backend bằng nodemon (tự động reload khi code thay đổi).

- Chạy frontend bằng npm run dev trong thư mục frontend.

# Biến môi trường

Tạo file .env ở thư mục gốc và thêm các biến môi trường:

```js
PORT=your_port
MONGO_URL=your_mongodb
JWT_SECRET=your_jwt_secret
NODE_ENV=production
PAYPAL_CLIENT_ID=your_paypal_client_id
EMAIL_USER=your_email
EMAIL_PASS=your_password_email
```

# Build dự án

Nếu muốn build frontend, chạy:

```
npm run build
```

Lệnh này sẽ:

- Cài đặt các dependencies cho backend và frontend.

- Build frontend để chuẩn bị deploy.

# Chạy dự án trong môi trường production

Sau khi build xong, chạy backend bằng:

```
npm run start
```

Backend sẽ chạy trên Node.js mà không có `nodemon`.

#  Công nghệ sử dụng

- **Frontend**: React.js, Redux Toolkit, Redux Toolkit Query, Tailwind CSS, React Paypal

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Bcryptjs

- **Authentication**: JSON Web Token (JWT)

# Tài khoản truy cập website role admin

**Email:** admin@gmail.com    
**Mật Khẩu:** 123123

# Tài khoản thanh toán Paypal

sb-8zzxa34659181@personal.example.com  
b@1R.>Ac