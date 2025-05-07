# YuTub Downloader

## 📦 Requirements

- Python 3.8+
- bun atau npm
---

# Jalankan backend terlebih dahulu

### Masuk ke direktori script
```bash
cd script
```

## 🐍 Buat Virtual Environment

### Windows (CMD/PowerShell)
```bash
python -m venv .venv
.venv\Scripts\activate
```

### Linux/macOS
```bash
python3 -m venv .venv
source .venv/bin/activate
```

## Install Dependensi
```bash
pip install -r requirements.txt
```

## Jalankan server
```bash
uvicorn ytd:app --reload
```

## Jalankan Frontend

### Masuk ke direktori ytui
```bash
cd ytui
```

### Instal package

**NPM**
```bash
npm install
```

**BUN**
```bash
bun install
```

### Jalankan website

**NPM**
```bash
npm run dev
```

**BUN**
```bash
bun run dev
```
