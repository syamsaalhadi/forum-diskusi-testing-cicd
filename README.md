# Forum Diskusi — React + Redux

Aplikasi forum diskusi untuk submission "Membangun Aplikasi React dengan Redux".

## Fitur Utama
- Registrasi & login akun
- Melihat daftar thread beserta filter kategori
- Melihat detail thread beserta komentar
- Membuat thread baru
- Membuat komentar pada thread
- Loading indicator saat memuat data dari API
- Upvote / downvote pada thread dan komentar (dengan optimistic UI update)
- Halaman leaderboard
- Notifikasi error/sukses dengan `react-toastify`

## Stack
- React 19 + Vite (react-dom, bukan react-native)
- Redux (classic action/reducer/thunk) + react-redux
- React Router v7
- Tailwind CSS v4
- react-toastify (React Ecosystem)
- ESLint dengan Airbnb JavaScript Style Guide
- Jest + React Testing Library (unit & integration test)
- Cypress (end-to-end test)
- GitHub Actions (CI) + Vercel (CD)

## Struktur Folder
```
src/
  components/   -> komponen UI reusable
  pages/        -> halaman (route)
  states/       -> state management (action & reducer per domain, terpisah dari UI)
  hooks/        -> custom hooks
  utils/        -> helper (api.js, formatter tanggal, dll)
```

## Menjalankan Proyek
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Lint
```bash
npm run lint
```

## Konfigurasi API
Base URL API diatur di `src/utils/api.js`:
```
https://forum-api.dicoding.dev/v1
```

## Testing

### Unit & Integration Test (Jest + React Testing Library)
Mencakup pengujian reducer, thunk (async action), dan komponen React.
```bash
npm test
```

### End-to-End Test (Cypress)
Menguji alur login aplikasi secara utuh di browser. Perintah ini otomatis menjalankan
dev server lalu membuka Cypress dalam mode headless.
```bash
npm run e2e
```

Untuk membuka Cypress Test Runner secara interaktif (dev server harus sudah berjalan
lewat `npm run dev`):
```bash
npm run cy:open
```

## CI/CD
- **Continuous Integration**: setiap pull request ke branch `master` otomatis menjalankan
  test Jest dan Cypress melalui GitHub Actions (`.github/workflows/ci.yml`).
- **Continuous Deployment**: setiap push ke `master` otomatis di-deploy ke Vercel.
- Branch `master` diproteksi — merge hanya bisa dilakukan setelah semua status check lolos
  dan mendapat approval review.

# forum-diskusi-testing-cicd
