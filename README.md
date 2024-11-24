# RO-CC
- Projek Route Optimization Bagian Divisi Cloud Computing


## Syarat
- Node.js terinstal (unduh di [nodejs.org](https://nodejs.org))


## Instalasi

### 1. Clone Repository
Pertama kita donlowad repository dari github
```bash
git clone https://github.com/Route-Optimization-C242-RO01/RO-CC.git
```

### 2. Instal Dependensi
Jalankan perintah berikut untuk menginstal dependensi pada projek RO-CC
```bash
npm install
```
Penginstalan berhasil ketika folder node_modules sudah muncul pada direktori anda

### 3. File .env
Buat file baru dengan nama .env atau
Buka file .env.example, copy lalu isinya pastekan ke file .env
isikan nama access token, nama database, username database, host, port,  password, pada file .env
```bash
ACCESS_TOKEN_SECRET = 
DB_USERNAME =
DB_PASSWORD = 
DB_NAME = 
DB_HOST =
PORT = 
URL_MODEL = 
```

### 4. Create Database
Jalankan perintah berikut untuk membuat database migration: 
```bash
npx sequelize-cli db:migrate
```
```bash
npx sequelize-cli db:seed:all
```
Pastikan sudah menjalankan & aktifkan XAMPP serta membuat database contoh "db_ro"

### 5. Run Program
Untuk menjalankan api jalankan perintah di terminal, pastikan sudah pernah install nodemon sebelumnya
```bash
npm run start
```
