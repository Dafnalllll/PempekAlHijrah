# PRD — Frontend Landing Page Pempek Al Hijrah

**Versi:** 1.0
**Status:** Draft untuk ditinjau
**Fokus:** Frontend landing page saja
**Framework:** Nuxt 4
**UI framework:** Vue 3 Composition API (`<script setup>`)
**Bahasa:** TypeScript
**Styling:** Tailwind CSS v4
**Referensi desain:** Google Stitch — Pempek Al Hijrah Storefront

---

## 1. Ringkasan Produk

Pempek Al Hijrah merupakan usaha kuliner yang menyediakan produk pempek frozen untuk konsumen rumah tangga dan pelanggan yang ingin menikmati makanan khas Palembang secara praktis.

Landing page menjadi halaman utama untuk memperkenalkan usaha, menampilkan pilihan produk, menjelaskan keunggulan produk dan informasi pengiriman, serta mengarahkan pengunjung ke kanal pemesanan.

Pengembangan pada tahap ini difokuskan sepenuhnya pada frontend. Implementasi harus mengikuti desain Google Stitch yang tersedia, dengan mempertahankan identitas visual, struktur halaman, tipografi, warna, fotografi, dan komponen antarmuka yang telah dirancang.

## 2. Tujuan Produk

1. Mengimplementasikan desain Google Stitch menjadi halaman web yang dapat digunakan.
2. Menampilkan informasi produk secara menarik, terstruktur, dan mudah dipahami.
3. Menyediakan navigasi yang memudahkan pengunjung menjelajahi konten.
4. Mengarahkan calon pelanggan menuju katalog dan kanal pemesanan WhatsApp.
5. Memastikan tampilan konsisten pada desktop, tablet, dan perangkat mobile.
6. Membangun fondasi frontend yang mudah dikembangkan untuk fitur berikutnya.

## 3. Target Pengguna

### 3.1 Konsumen rumah tangga

Pengunjung yang mencari pempek frozen untuk konsumsi pribadi atau keluarga.

### 3.2 Penggemar kuliner khas Palembang

Pengunjung yang ingin mengetahui pilihan paket, komposisi, dan karakteristik produk.

### 3.3 Calon pelanggan dari luar kota

Pengunjung yang membutuhkan informasi awal mengenai pengiriman dan ingin berkonsultasi dengan penjual.

## 4. Ruang Lingkup

### 4.1 In Scope

- Header dan navigasi.
- Hero section.
- Bagian keunggulan produk.
- Katalog ringkas produk unggulan dan kartu produk.
- Panduan pemesanan.
- Informasi pengiriman lokal dan luar kota.
- Bagian Tentang Kami.
- CTA pemesanan melalui WhatsApp.
- Footer.
- Responsive layout.
- Interaksi navigasi dan tombol yang relevan.
- Pengelolaan data produk sementara pada frontend.
- Optimasi aset gambar dan metadata dasar SEO.

### 4.2 Out of Scope

- Backend dan API bisnis.
- Database PostgreSQL dan Prisma.
- Autentikasi pengguna/admin dan dashboard admin.
- CRUD produk dan pengelolaan stok.
- Keranjang belanja persisten.
- Checkout dan penyimpanan pesanan.
- Pembayaran online.
- Pelacakan status pesanan.
- Integrasi WhatsApp Business API.

> Elemen visual keranjang atau formulir pemesanan dalam ekspor Stitch tidak otomatis menjadi fitur fungsional pada tahap ini. Implementasinya ditinjau berdasarkan kebutuhan dan batas ruang lingkup.

## 5. Struktur Halaman dan Persyaratan Fungsional

### 5.1 Header dan Navigasi

**Tujuan:** Memberikan identitas merek dan akses cepat ke bagian halaman.

**Elemen:**

- Logo dan nama Pempek Al Hijrah.
- Navigasi Beranda.
- Navigasi Katalog.
- Navigasi Tentang Kami.
- Navigasi Cara Pemesanan.
- CTA Pesan via WhatsApp.
- Menu mobile.

**Persyaratan:**

- Navigasi internal mengarah ke section yang benar.
- Menu mobile dapat dibuka dan ditutup.
- Header tidak menutupi konten saat pengguna berpindah section.
- Nomor WhatsApp harus dikonfirmasi sebelum dipublikasikan.

### 5.2 Hero Section

**Tujuan:** Memperkenalkan produk dan mengarahkan pengunjung ke katalog.

**Konten acuan desain:**

- Headline: “Nikmatnya Pempek, Kapan Saja di Rumah.”
- Deskripsi singkat tentang pempek frozen.
- Foto produk utama.
- CTA “Jelajahi Paket Pempek”.
- CTA “Pesan via WhatsApp”.

**Persyaratan:**

- Headline menjadi elemen visual utama.
- Foto menggunakan aset dari Stitch atau aset resmi usaha.
- CTA katalog mengarah ke section katalog.
- CTA WhatsApp menggunakan nomor bisnis terverifikasi.
- Layout menyesuaikan ukuran layar tanpa mengorbankan keterbacaan.

### 5.3 Keunggulan Produk

**Tujuan:** Menjelaskan nilai produk kepada calon pelanggan.

Konten yang tercantum pada desain dapat mencakup:

- Kemasan frozen.
- Informasi bahan atau olahan ikan.
- Cuko yang disertakan dalam paket.
- Kemudahan pemesanan melalui WhatsApp.

**Persyaratan:**

- Keunggulan disajikan melalui komponen visual yang konsisten.
- Ikon, judul, dan deskripsi memiliki hierarki jelas.
- Klaim bahan, keamanan pangan, kesegaran, dan halal harus diverifikasi sebelum publikasi.

### 5.4 Katalog Produk Unggulan

**Tujuan:** Memperkenalkan pilihan paket pempek yang tersedia.

Kategori yang muncul pada desain harus diperiksa kembali pada aset Stitch. Contoh kategori yang pernah tercantum: Paket Pempek Mini, Paket Pempek Keluarga, dan Paket Pempek Komplit.

Kartu produk dapat berisi:

- Foto produk.
- Nama paket.
- Deskripsi singkat.
- Komposisi paket.
- Berat atau jumlah produk.
- Informasi cuko.
- Harga.
- Tombol detail produk.
- CTA pemesanan sesuai fitur yang tersedia.

**Persyaratan:**

- Data produk disimpan secara terpusat di frontend, bukan ditulis berulang pada setiap komponen.
- Harga menggunakan format Rupiah.
- Foto produk sesuai dengan aset yang tersedia.
- Kartu memiliki ukuran dan jarak yang konsisten.
- Grid menyesuaikan jumlah kolom berdasarkan lebar layar.
- Data yang belum diverifikasi tidak ditampilkan sebagai fakta resmi.
- Katalog pada tahap ini merupakan tampilan frontend; pengelolaan database tidak termasuk.

### 5.5 Panduan Pemesanan

**Tujuan:** Menjelaskan proses pemesanan secara ringkas.

Tahapan yang direncanakan:

1. Pilih paket.
2. Lengkapi pesanan.
3. Konfirmasi melalui WhatsApp.

**Persyaratan:**

- Setiap tahap memiliki ikon atau penanda visual.
- Deskripsi singkat dan mudah dipahami.
- Alur harus sesuai fitur yang benar-benar tersedia.
- Jangan mengarahkan pengguna ke checkout yang belum diimplementasikan.

### 5.6 Informasi Pengiriman

**Tujuan:** Menyampaikan informasi awal mengenai pengiriman.

**Konten:**

- Pengiriman lokal.
- Pengiriman luar kota.
- Catatan koordinasi pengiriman frozen food.
- CTA konsultasi dengan penjual.

**Persyaratan:**

- Informasi dibedakan berdasarkan jenis pengiriman.
- Layout tetap mudah dipahami pada mobile.
- Tarif, cakupan wilayah, kurir, estimasi waktu, dan kebijakan pengiriman harus dikonfirmasi sebelum dipublikasikan sebagai informasi resmi.

### 5.7 Tentang Kami

**Tujuan:** Memperkenalkan identitas dan karakter usaha Pempek Al Hijrah.

**Konten:**

- Cerita singkat usaha.
- Identitas kuliner khas Palembang.
- Karakteristik produk.
- Nilai usaha yang relevan dengan pengalaman pelanggan.

**Persyaratan:**

- Mengikuti gaya editorial pada desain Stitch.
- Tidak menambahkan klaim bisnis tanpa informasi resmi.

### 5.8 CTA Penutup

**Tujuan:** Mengarahkan pengunjung yang tertarik untuk mengambil tindakan.

**Komponen:**

- Headline ajakan.
- Deskripsi singkat.
- Tombol pemesanan melalui WhatsApp.

**Persyaratan:**

- CTA mudah ditemukan dan memiliki kontras memadai.
- Nomor WhatsApp sudah diverifikasi.
- Tidak memberi kesan bahwa pesanan sudah tersimpan jika fitur penyimpanan belum ada.

### 5.9 Footer

**Komponen:**

- Logo atau nama usaha.
- Deskripsi singkat.
- Navigasi cepat.
- Kontak WhatsApp.
- Jam layanan jika tersedia dan telah dikonfirmasi.
- Informasi hak cipta.

**Persyaratan:**

- Tampilan konsisten dengan design system.
- Tautan memiliki tujuan yang benar.
- Tidak menggunakan data contoh saat website dipublikasikan.

## 6. Design System

Implementasi wajib mengikuti `DESIGN.md`, screenshot, dan aset desain yang tersedia dalam ekspor Google Stitch.

### 6.1 Warna

| Elemen       | Token          | Hex         |
| ------------ | -------------- | ----------- |
| Primary      | Deep Teal      | `#15353B` |
| Secondary    | Warm Gold      | `#D9A34A` |
| Background   | Warm Off-white | `#FAF8F2` |
| WhatsApp CTA | WhatsApp Green | `#25D366` |
| Surface      | White          | `#FFFFFF` |
| Body text    | Charcoal       | `#262626` |
| Muted text   | Gray           | `#777777` |
| Border       | Neutral border | `#EAE5D9` |

Jika warna pada screenshot aktual berbeda dari token tertulis, tinjau perbedaannya sebelum mengubah design system.

### 6.2 Tipografi

- **Playfair Display:** headline, judul section, dan elemen editorial.
- **Plus Jakarta Sans:** body text, navigasi, label, tombol, dan informasi produk.
- Harga menggunakan Plus Jakarta Sans dengan bobot tebal.
- Font dimuat secara efisien dengan fallback yang sesuai.

### 6.3 Layout dan Spacing

- Container desktop dengan lebar maksimum sekitar 1200 px.
- Gutter desktop sekitar 20 px dan margin luar desktop sekitar 32 px.
- Gutter mobile sekitar 12 px dan margin luar mobile sekitar 16 px.
- Spacing antarsection mengikuti ritme vertikal desain Stitch.
- Kartu menggunakan sudut membulat dan bayangan lembut.
- Foto produk menggunakan rasio konsisten sesuai aset.

Angka tersebut merupakan acuan desain, bukan batas kaku untuk setiap komponen.

### 6.4 Komponen UI

- Primary button.
- Secondary button.
- WhatsApp button.
- Product card.
- Icon container.
- Navigation item.
- Section heading.
- CTA section.
- Footer link.

Komponen harus dapat digunakan kembali dan memiliki gaya konsisten.

## 7. Teknologi dan Arsitektur Frontend

### 7.1 Stack

- Nuxt 4.
- Vue 3 Composition API dengan `<script setup>`.
- TypeScript.
- Tailwind CSS v4.
- Lucide Vue Next jika ikon Lucide dibutuhkan.

### 7.2 Struktur Folder Awal

```text
app/
├── app.vue
├── assets/
│   ├── css/
│   │   └── main.css
│   └── images/
├── components/
│   └── landing/
│       ├── AppHeader.vue
│       ├── HeroSection.vue
│       ├── BenefitsSection.vue
│       ├── ProductSection.vue
│       ├── OrderingSection.vue
│       ├── ShippingSection.vue
│       ├── AboutSection.vue
│       ├── ClosingCTA.vue
│       └── AppFooter.vue
├── pages/
│   └── index.vue
└── layouts/
    └── default.vue
```

Struktur ini merupakan rancangan awal. Buat file ketika diperlukan agar tidak menghasilkan komponen kosong atau abstraksi berlebihan.

### 7.3 Prinsip Implementasi

- Gunakan `<script setup lang="ts">`.
- Pisahkan section utama menjadi komponen yang dapat digunakan kembali.
- Hindari menaruh seluruh landing page dalam satu file `app.vue`.
- Pisahkan data produk sementara dari markup komponen.
- Gunakan semantic HTML.
- Gunakan utility class Tailwind secara konsisten.
- Jangan menambahkan framework UI lain tanpa kebutuhan jelas.
- Jangan memasang dependensi backend untuk pekerjaan frontend ini.

## 8. Persyaratan Responsivitas

### Desktop

- Navigasi horizontal.
- Hero dengan komposisi teks dan visual sesuai desain.
- Katalog berbentuk grid.
- Jarak dan proporsi section seimbang.

### Tablet

- Grid menyesuaikan ruang.
- Teks dan gambar tidak bertumpuk.
- Navigasi tetap mudah digunakan.

### Mobile

- Navigasi ringkas.
- Hero mudah dibaca.
- Katalog satu atau dua kolom sesuai lebar layar.
- CTA nyaman disentuh.
- Tidak ada horizontal overflow.
- Informasi penting tidak bergantung pada hover.

## 9. Interaksi Frontend

Interaksi dalam ruang lingkup:

- Navigasi ke section tertentu.
- Buka/tutup menu mobile.
- Tombol CTA katalog dan WhatsApp.
- Efek hover, focus, dan active.
- Scroll ke bagian halaman dengan perilaku yang sesuai.
- Tautan detail produk apabila tujuan dan perilakunya sudah ditetapkan.

Tombol yang belum memiliki fungsi nyata tidak boleh memberi kesan seolah-olah transaksi berhasil.

## 10. Persyaratan Nonfungsional

### 10.1 Performa

- Optimalkan gambar produk.
- Hindari pemuatan aset yang tidak digunakan.
- Gunakan lazy loading untuk gambar di bawah area awal jika sesuai.
- Minimalkan JavaScript tambahan.
- Pastikan halaman dimuat tanpa error kompilasi.

### 10.2 Aksesibilitas

- Alt text untuk gambar informatif.
- Kontras teks memadai.
- Fokus keyboard terlihat.
- Tombol memiliki label jelas.
- Hierarki heading tepat.
- Menu mobile dapat digunakan melalui keyboard.

### 10.3 SEO Dasar

- Page title relevan.
- Meta description.
- Heading terstruktur.
- Alt text gambar.
- Bahasa halaman Bahasa Indonesia.
- Open Graph metadata jika diperlukan.

## 11. Kriteria Penerimaan

- [ ] Struktur section sesuai desain Google Stitch.
- [ ] Warna dan tipografi mengikuti design system.
- [ ] Aset gambar sesuai desain.
- [ ] Navigasi internal bekerja.
- [ ] Menu mobile berfungsi.
- [ ] Kartu produk konsisten.
- [ ] CTA memiliki tujuan yang benar.
- [ ] Tautan WhatsApp menggunakan nomor valid.
- [ ] Tampilan diuji pada desktop, tablet, dan mobile.
- [ ] Tidak ada horizontal overflow pada viewport yang diuji.
- [ ] Tidak ada error kompilasi Nuxt atau error JavaScript yang mengganggu.
- [ ] Informasi belum terverifikasi tidak dipublikasikan sebagai fakta.
- [ ] Metadata SEO dasar tersedia.

## 12. Risiko dan Mitigasi

| Risiko                                        | Mitigasi                                                      |
| --------------------------------------------- | ------------------------------------------------------------- |
| Hasil berbeda dari Stitch                     | Gunakan HTML, screenshot, dan `DESIGN.md` sebagai referensi |
| Struktur komponen terlalu kompleks            | Pecah komponen berdasarkan section yang jelas                 |
| Aset gambar tidak ditemukan atau tidak sesuai | Inventarisasi aset sebelum implementasi                       |
| Harga atau komposisi produk keliru            | Gunakan data yang telah dikonfirmasi                          |
| CTA mengarah ke fitur belum tersedia          | Validasi tujuan seluruh tautan                                |
| Tampilan mobile tidak konsisten               | Uji beberapa ukuran viewport                                  |
| Klaim kualitas tidak terverifikasi            | Konfirmasi dengan pemilik usaha                               |

## 13. Tahapan Pengembangan

### Tahap 1 — Analisis aset

- Membaca HTML beranda Stitch.
- Memetakan section.
- Menginventarisasi foto, logo, dan font.
- Memahami komponen dan interaksi.

### Tahap 2 — Fondasi UI

- Menyiapkan font global.
- Menetapkan warna dan token desain.
- Menyiapkan layout dan container.
- Membuat komponen tombol dan elemen bersama.

### Tahap 3 — Implementasi section

- Header.
- Hero.
- Keunggulan produk.
- Katalog ringkas.
- Panduan pemesanan.
- Informasi pengiriman.
- Tentang Kami.
- CTA penutup.
- Footer.

### Tahap 4 — Interaksi dan responsivitas

- Navigasi desktop dan mobile.
- CTA.
- Penyesuaian layout.
- Pengujian aksesibilitas dasar.

### Tahap 5 — Pengujian dan penyempurnaan

- Membandingkan hasil dengan Stitch.
- Memperbaiki perbedaan visual.
- Menguji aset dan viewport.
- Memeriksa console dan terminal.

## 14. Batas Akhir Proyek Tahap Ini

Deliverable tahap ini adalah landing page frontend Pempek Al Hijrah yang:

1. Diimplementasikan menggunakan Nuxt 4, Vue 3, TypeScript, dan Tailwind CSS v4.
2. Mengikuti desain Google Stitch yang tersedia.
3. Memiliki navigasi dan interaksi dasar yang berfungsi.
4. Responsif dan siap dikembangkan lebih lanjut.
5. Tidak bergantung pada backend atau database untuk menampilkan konten dasar.

Integrasi database, pemrosesan pesanan, checkout, dan dashboard admin menjadi pekerjaan terpisah setelah landing page selesai dan disetujui.

**Prinsip utama:** implementasikan desain yang sudah ada secara akurat, jaga struktur kode tetap terorganisasi, dan selesaikan frontend landing page sebelum memperluas ruang lingkup.
