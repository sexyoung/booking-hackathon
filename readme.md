## Booking Hackathon Respository

### 環境需求
- [PHP 7 or up](http://php.net/)
- [Composer](https://getcomposer.org/)
- [Laravel 5.4 or up](https://laravel.com)
- [Node 6.9.1 or up](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/zh-Hans/)

### 安裝步驟
先 clone 專案到你的電腦
```sh
git clone https://github.com/sexyoung/booking-hackathon.git
```

### 進到 booking-hackathon 資料夾
```sh
cd booking-hackathon
```

### 安裝 composer 套件
```sh
composer install
```

### 進到 client 資料夾
```sh
cd client
```

### 安裝 前端套件
```sh
yarn
```

### 跑後端 server
先到專案根目錄，然後
```sh
php artison serve
```

### 跑前端 server
先到client目錄，然後
```sh
yarn start
```

### deploy production
先到client目錄，然後
```sh
yarn run build
```

然後去專案根目錄
```sh
php artison serve
```

### 目錄說明
```
app/
bootstrap/
client/ ← 前端開發區
  src/
    app/
      ...
      routes.js ← 後端路由
  test/
  ...
config/
database/
public/
resources/
routes/
  ...
  web.php  ← backend 路由
  api.php  ← backend api 路由
  ...
storage/
tests/
.env
```
