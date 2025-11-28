# 🚀 Quick Start - Finanze App

## Prerequisiti
- PHP 8+
- MySQL
- Node.js e pnpm

## Avvio

### 1. Database
```bash
mysql -u root -p
source database/schema.sql
source database/seed.sql
```

### 2. Backend
```bash
cd backend
php -S localhost:8000
```

### 3. Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

Apri `http://localhost:5173`
