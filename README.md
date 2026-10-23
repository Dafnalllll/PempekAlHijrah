# Pempek Al-Hijrah

Website toko pempek frozen Pempek Al-Hijrah. Aplikasi ini menyediakan katalog produk dan alur pemesanan untuk pelanggan, serta dashboard simulasi untuk membantu pengelolaan pesanan, stok, dan produksi.

> **Catatan:** aplikasi saat ini berjalan dalam mode demo/simulasi. Data disimpan di `localStorage` browser, belum menggunakan API atau database server, belum memproses pembayaran secara otomatis, dan halaman admin belum dilindungi autentikasi. Jangan gunakan data demo ini sebagai sistem operasional produksi atau untuk menyimpan informasi sensitif.

## Fitur

### Website pelanggan

- Landing page dengan informasi produk, keunggulan, cara pemesanan, pengiriman, testimoni, dan ajakan untuk memesan.
- Katalog paket pempek dengan informasi harga dan produk.
- Keranjang belanja: tambah produk, ubah jumlah, hapus item, dan melihat subtotal.
- Formulir pemesanan dengan validasi nama, nomor WhatsApp, email opsional, alamat, kota, dan informasi penerima.
- Riwayat pesanan dan halaman detail untuk melihat status serta rincian pesanan.
- Navigasi responsif untuk perangkat desktop dan ponsel.
- Testimoni bergerak horizontal otomatis; animasi menghormati pengaturan reduced motion perangkat.

### Dashboard admin simulasi

Dashboard admin tersedia melalui `/admin` dan menggunakan layout admin tersendiri.

- **Ringkasan (`/admin`)**: ringkasan pesanan, omzet estimasi, stok siap jual, dan konfirmasi ongkir pesanan.
- **Pesanan (`/admin/pesanan`)**: cari dan filter pesanan, ubah status, proses aksi pesanan, cetak label simulasi, dan ekspor data CSV.
- **Inventaris (`/admin/inventaris`)**: kelola katalog SKU, status ketersediaan, stok, pergerakan stok, opname simulasi, dan catatan batch produksi.

## Teknologi

- [Nuxt](https://nuxt.com/) 4 dan Vue 3 dengan TypeScript.
- [Tailwind CSS](https://tailwindcss.com/) 4 melalui plugin Vite.
- [Lucide Vue Next](https://lucide.dev/) untuk ikon.
- [Anime.js](https://animejs.com/) untuk animasi antarmuka.
- `localStorage` untuk persistensi data demo di browser.

## Persyaratan

- Node.js versi **22.21 atau lebih baru pada lini 22**, atau versi **24.11 atau lebih baru pada lini 24**.
- npm (disarankan menggunakan versi yang disertakan dengan instalasi Node.js).

Versi Node.js yang lebih lama dapat menampilkan peringatan kompatibilitas dari Nuxt.

## Menjalankan proyek

Pasang dependensi:

```bash
npm install
```

Jalankan server pengembangan:

```bash
npm run dev
```

Buka alamat yang ditampilkan di terminal (biasanya [http://localhost:3000](http://localhost:3000)).

## Perintah yang tersedia

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan Nuxt. |
| `npm run build` | Membuat build produksi. |
| `npm run preview` | Menjalankan preview dari build produksi. |
| `npm run generate` | Membuat output situs statis. |
| `npm run postinstall` | Menyiapkan berkas dan tipe Nuxt; dijalankan otomatis setelah instalasi npm. |

Untuk melihat hasil build secara lokal:

```bash
npm run build
npm run preview
```

## Halaman dan rute

| Rute | Keterangan |
| --- | --- |
| `/` | Landing page dan katalog produk. |
| `/keranjang` | Keranjang belanja pelanggan. |
| `/formulir-pemesanan` | Formulir checkout dan pengiriman. |
| `/pesanan-saya` | Daftar pesanan pelanggan. |
| `/pesanan-saya/:id` | Detail pesanan berdasarkan ID atau nomor pesanan. |
| `/admin` | Dashboard ringkasan admin. |
| `/admin/pesanan` | Pengelolaan dan pemrosesan pesanan. |
| `/admin/inventaris` | Pengelolaan SKU, stok, dan batch produksi. |

## Struktur proyek

```text
app/
├── assets/css/          # CSS global dan konfigurasi gaya
├── components/
│   ├── landing/         # Bagian-bagian landing page pelanggan
│   └── ...              # Komponen admin, status, modal, dan loading
├── composables/         # State dan fungsi bersama untuk cart, order, stok, dan format harga
├── data/                # Data katalog awal
├── layouts/             # Layout halaman, termasuk layout admin
├── pages/               # Rute pelanggan dan admin
└── types/               # Tipe TypeScript untuk produk, pesanan, cart, dan produksi
nuxt.config.ts           # Konfigurasi Nuxt dan plugin Tailwind Vite
package.json             # Dependensi dan perintah npm
```

## Penyimpanan dan data demo

State aplikasi dikelola oleh composables di `app/composables/`. Untuk pengalaman demo, beberapa data awal dapat tersedia ketika browser belum memiliki data tersimpan. Perubahan selanjutnya disimpan di `localStorage` browser:

- `pempek_cart` — isi keranjang.
- `pempek_orders` — pesanan.
- `pempek_inventory` — katalog dan stok.
- `pempek_batches` — batch produksi.
- `pempek_movements` — pergerakan stok.

Karena penyimpanan ini hanya berlaku pada browser/perangkat yang sama, data tidak otomatis tersinkron antar pengguna atau perangkat. Menghapus data situs/browser dapat menghapus data demo. Ekspor CSV hanya mengunduh data; aplikasi belum mengirim data ke layanan eksternal.

## Status pengembangan

Fitur antarmuka dan alur demo sudah tersedia. Sebelum digunakan sebagai toko produksi, aplikasi masih memerlukan backend dan database, autentikasi/otorisasi admin, validasi dan penyimpanan pesanan di server, integrasi pembayaran, serta pengujian dan konfigurasi deployment.

Untuk informasi deployment Nuxt, lihat [dokumentasi deployment Nuxt](https://nuxt.com/docs/getting-started/deployment).
