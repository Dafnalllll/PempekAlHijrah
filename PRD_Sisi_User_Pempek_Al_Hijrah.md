# Product Requirements Document (PRD)
## Sisi User — Keranjang, Pesanan Saya, Progres Pesanan, dan Formulir Pemesanan
**Proyek:** Website Pempek Al Hijrah  
**Versi:** 1.0  
**Cakupan:** Frontend sisi pelanggan (user-facing)  
**Stack:** Nuxt 4, Vue 3 Composition API (`<script setup>`), TypeScript, Tailwind CSS v4  
**Acuan desain:** Ekspor Google Stitch storefront Pempek Al Hijrah yang disertakan bersama proyek

---

## 1. Ringkasan Produk

PRD ini mendefinisikan empat halaman sisi pelanggan yang melengkapi landing page dan katalog Pempek Al Hijrah:

1. **Keranjang** — meninjau, mengubah jumlah, menghapus produk, dan melihat ringkasan belanja.
2. **Formulir Pemesanan** — mengisi data pemesan, penerima, alamat pengiriman, metode distribusi, dan catatan untuk penjual sebelum mengajukan pesanan.
3. **Pesanan Saya** — melihat daftar pesanan yang pernah dibuat beserta status ringkasnya.
4. **Progres Pesanan Saya** — melihat detail satu pesanan, tahap pemrosesan, ringkasan produk, informasi pengiriman, dan tindakan lanjutan.

Tujuan utamanya adalah membuat alur pemesanan mudah dipahami dan transparan. Pengguna harus memahami bahwa **mengajukan pesanan belum berarti pesanan dikonfirmasi atau dibayar**. Ongkos kirim dan total akhir dapat menunggu konfirmasi penjual.

### 1.1 Prinsip produk

- Informasi produk dan harga ditampilkan konsisten di seluruh halaman.
- Data yang diminta dari pelanggan dibatasi pada kebutuhan pemesanan dan pengiriman.
- Status pesanan menggunakan label yang jelas dan konsisten.
- Tindakan penting seperti mengosongkan keranjang atau mengirim pesanan harus memiliki konfirmasi/umpan balik yang jelas.
- Tampilan harus responsif untuk ponsel, tablet, dan desktop.
- Desain mengikuti ekspor Stitch sebagai referensi visual; PRD ini tidak menggantikan desain tersebut.

---

## 2. Sasaran dan Pengguna

### 2.1 Sasaran

- Memungkinkan pelanggan memeriksa kembali produk sebelum memesan.
- Mengurangi kesalahan data pemesan dan alamat tujuan.
- Menjelaskan subtotal produk, status ongkir, dan estimasi total dengan transparan.
- Memberikan akses yang mudah ke riwayat dan progres pesanan.
- Menyediakan tindakan lanjutan yang sesuai dengan status pesanan.

### 2.2 Pengguna utama

Pelanggan yang ingin membeli produk frozen Pempek Al Hijrah, baik untuk pengiriman lokal maupun luar kota.

### 2.3 Indikator keberhasilan

- Pengguna dapat mengubah isi keranjang tanpa kebingungan.
- Formulir menandai input wajib dan menampilkan pesan validasi yang relevan.
- Pengguna menerima nomor/referensi pesanan dan status awal setelah pesanan berhasil dibuat.
- Pengguna dapat menemukan pesanan dari halaman Pesanan Saya dan membuka detail progresnya.
- Status ongkir dan total yang belum final tidak ditampilkan seolah-olah sudah pasti.

---

## 3. Ruang Lingkup

### 3.1 Termasuk

- UI dan navigasi empat halaman.
- Data produk statis/mock untuk tahap implementasi frontend.
- Interaksi lokal di sisi frontend untuk keranjang, input formulir, filter sederhana, dan konfirmasi.
- Validasi sisi klien pada formulir.
- Tampilan status pesanan, timeline progres, ringkasan produk, dan data pengiriman menggunakan data mock.
- State loading, kosong, berhasil, dan error yang diperlukan agar UI dapat diuji.
- Layout responsif dan aksesibilitas dasar.

### 3.2 Tidak termasuk pada tahap frontend ini

- Backend, database, autentikasi, dan penyimpanan pesanan permanen.
- Integrasi nyata dengan sistem admin.
- Kalkulasi ongkos kirim otomatis atau integrasi API kurir.
- Pembayaran online, verifikasi pembayaran, atau pemotongan saldo.
- Pelacakan kurir real-time.
- Pengiriman notifikasi otomatis melalui WhatsApp.
- Upload bukti penerimaan paket dan proses konfirmasi paket diterima. Halaman konfirmasi penerimaan pada ekspor Stitch diperlakukan sebagai fitur lanjutan di luar empat halaman PRD ini.

> **Catatan implementasi:** Karena backend belum termasuk cakupan, data pada tahap ini dapat menggunakan mock data atau state frontend. Jangan mengklaim pesanan tersimpan permanen atau status diperbarui secara real-time. Tandai perilaku simulasi dengan jelas selama pengembangan.

---

## 4. Alur Pengguna Utama

1. Pengguna memilih produk dari katalog dan menambahkannya ke keranjang.
2. Pengguna membuka **Keranjang** untuk meninjau item, jumlah, subtotal, dan estimasi total sementara.
3. Pengguna memilih **Lanjut ke Pemesanan**.
4. Pengguna melengkapi **Formulir Pemesanan** dan meninjau kembali ringkasan.
5. Pengguna menekan **Buat Pesanan** setelah validasi berhasil.
6. UI menampilkan konfirmasi bahwa pesanan berhasil diajukan, nomor pesanan contoh, dan status awal **Menunggu Konfirmasi Penjual**.
7. Pengguna dapat membuka **Pesanan Saya** untuk melihat daftar pesanan.
8. Pengguna memilih salah satu pesanan untuk membuka **Progres Pesanan Saya** dan melihat timeline serta detailnya.

### 4.1 Navigasi ant halaman

- Keranjang → Formulir Pemesanan.
- Formulir Pemesanan → Keranjang (kembali untuk mengubah item).
- Formulir Pemesanan → Progres Pesanan (setelah simulasi pembuatan pesanan berhasil).
- Pesanan Saya → Progres Pesanan (melalui tombol/detail pesanan).
- Progres Pesanan → Pesanan Saya.
- Keranjang kosong → Katalog/Belanja Lagi.
- Semua halaman mempertahankan header, navigasi utama, dan footer yang konsisten dengan desain storefront.

---

## 5. Persyaratan Fungsional

## 5.1 Halaman Keranjang

### Tujuan
Memberi pengguna kontrol untuk memeriksa dan mengubah produk yang akan dipesan sebelum masuk ke formulir pemesanan.

### Komponen UI
- Breadcrumb: Beranda / Keranjang Belanja.
- Judul dan jumlah item di keranjang.
- Daftar item: gambar, nama produk, ringkasan/varian, harga satuan, kontrol jumlah, subtotal item, dan aksi hapus.
- Aksi **Lanjut Belanja**, **Kosongkan Keranjang**, dan **Lanjut ke Pemesanan**.
- Panel ringkasan: subtotal produk, ongkos kirim, biaya tambahan jika memang berlaku, dan estimasi total.
- Informasi bahwa ongkos kirim akan dikonfirmasi penjual jika tarif belum tersedia.
- Panel petunjuk penyimpanan/penyajian jika mengikuti desain Stitch.
- State keranjang kosong.

### Persyaratan
- FR-KR-01: Sistem menampilkan semua item yang berada di state keranjang.
- FR-KR-02: Pengguna dapat menambah dan mengurangi jumlah item.
- FR-KR-03: Jumlah item tidak boleh kurang dari 1 melalui kontrol kuantitas; menghapus item dilakukan melalui aksi hapus.
- FR-KR-04: Subtotal item dihitung sebagai harga satuan × jumlah.
- FR-KR-05: Subtotal keseluruhan diperbarui ketika kuantitas atau isi keranjang berubah.
- FR-KR-06: Pengguna dapat menghapus satu item.
- FR-KR-07: Aksi **Kosongkan Keranjang** meminta konfirmasi sebelum menghapus semua item.
- FR-KR-08: Jika keranjang kosong, daftar produk diganti dengan empty state dan CTA menuju katalog.
- FR-KR-09: Ongkos kirim yang belum diketahui ditampilkan sebagai **Dikonfirmasi Penjual** atau label setara, bukan angka rekaan.
- FR-KR-10: Estimasi total menampilkan subtotal produk dan catatan bahwa ongkir belum termasuk jika ongkir belum dikonfirmasi.
- FR-KR-11: Tombol **Lanjut ke Pemesanan** tersedia ketika keranjang berisi item.
- FR-KR-12: Tombol lanjut belanja membawa pengguna kembali ke katalog/halaman belanja.

### Aturan perhitungan
- `subtotalItem = hargaSatuan × jumlah`
- `subtotalProduk = jumlah seluruh subtotalItem`
- Jika ongkir belum diketahui: `estimasiTotal = subtotalProduk`, dengan label **Belum termasuk ongkir**.
- Jangan menambahkan biaya kemasan atau biaya lain kecuali nilainya sudah dikonfirmasi sebagai kebijakan bisnis.

### State yang harus tersedia
- Keranjang berisi item.
- Keranjang kosong.
- Dialog konfirmasi pengosongan.
- Kuantitas berubah.
- Item berhasil dihapus.

---

## 5.2 Halaman Formulir Pemesanan

### Tujuan
Mengumpulkan data pemesan dan pengiriman yang diperlukan untuk mengajukan pesanan.

### Komponen UI
- Breadcrumb dan indikator langkah: Keranjang → Data & Pengiriman → Konfirmasi.
- Bagian **Data Pemesan**:
  - Nama lengkap (wajib).
  - Nomor WhatsApp aktif (wajib).
  - Email (opsional).
- Bagian **Informasi Pengiriman**:
  - Pilihan metode distribusi, misalnya pengiriman lokal dan luar kota, mengikuti opsi yang telah disetujui pemilik toko.
  - Toggle/checkbox **Data penerima sama dengan pemesan**.
  - Nama penerima.
  - Nomor HP penerima.
  - Alamat lengkap dan patokan.
  - Kota/wilayah tujuan.
  - Kode pos jika diperlukan.
  - Catatan untuk penjual (opsional).
- Panel informasi ongkos kirim.
- Ringkasan pesanan: produk, kuantitas, subtotal produk, ongkir, estimasi total.
- CTA **Buat Pesanan Sekarang**.
- CTA sekunder untuk menghubungi admin jika pengguna perlu bertanya.

### Persyaratan
- FR-FP-01: Formulir menampilkan data produk dan subtotal dari keranjang.
- FR-FP-02: Nama lengkap wajib diisi.
- FR-FP-03: Nomor WhatsApp wajib diisi dan divalidasi secara dasar.
- FR-FP-04: Email bersifat opsional; jika diisi, formatnya harus valid.
- FR-FP-05: Alamat lengkap wajib diisi.
- FR-FP-06: Kota/wilayah tujuan wajib diisi untuk membantu penjual menentukan ongkir.
- FR-FP-07: Jika **Data penerima sama dengan pemesan** aktif, field penerima diisi dari data pemesan dan tetap dapat disesuaikan jika desain final mengizinkan.
- FR-FP-08: Pengguna dapat memilih metode distribusi dari opsi yang benar-benar disediakan toko.
- FR-FP-09: Catatan untuk penjual bersifat opsional.
- FR-FP-10: Pesan validasi muncul dekat field yang bermasalah dan menggunakan bahasa yang mudah dipahami.
- FR-FP-11: Jika validasi gagal, formulir tidak melanjutkan ke langkah pembuatan pesanan.
- FR-FP-12: Ringkasan pesanan diperbarui berdasarkan isi keranjang.
- FR-FP-13: Jika ongkir belum dihitung, UI menampilkan status **Menunggu Konfirmasi Penjual** dan total sebagai sementara.
- FR-FP-14: Sebelum submit, pengguna dapat kembali ke keranjang untuk memperbaiki item.
- FR-FP-15: Setelah submit valid pada mode simulasi, UI membuat referensi pesanan mock dan mengarahkan pengguna ke halaman Progres Pesanan.
- FR-FP-16: Klik tombol submit menampilkan state loading/disabled agar tidak mudah terjadi pengajuan ganda.
- FR-FP-17: Tampilkan penjelasan bahwa pengajuan pesanan tidak otomatis berarti pembayaran selesai atau pesanan telah dikonfirmasi.

### Validasi dasar
- Nama: setelah trim tidak boleh kosong.
- WhatsApp: wajib diisi; validasi format dasar nomor telepon, dengan dukungan awalan `+62` atau `08` jika format tersebut disetujui.
- Email: validasi format jika diisi.
- Alamat lengkap: tidak boleh kosong.
- Kota/wilayah: tidak boleh kosong.
- Kuantitas dan ringkasan produk harus berasal dari state keranjang, bukan input bebas pengguna.

### Perilaku checkbox penerima
- Aktif: salin nama dan nomor pemesan ke field penerima.
- Nonaktif: field penerima dapat diisi berbeda.
- Jika pengguna mengubah data pemesan saat checkbox aktif, field penerima mengikuti data pemesan.
- Jangan menghapus input penerima tanpa pemberitahuan ketika checkbox diubah.

### Catatan bisnis
Metode kurir, cakupan wilayah, biaya pengiriman, estimasi waktu, nomor WhatsApp resmi, dan aturan pembayaran harus dikonfirmasi oleh pemilik toko. Jangan menganggap teks contoh pada mockup sebagai kebijakan final tanpa validasi.

---

## 5.3 Halaman Pesanan Saya

### Tujuan
Menyediakan daftar pesanan yang dapat ditinjau pengguna dan menjadi pintu masuk ke detail progres tiap pesanan.

### Komponen UI
- Judul **Pesanan Saya**.
- Ringkasan jumlah pesanan bila relevan.
- Daftar/kartu pesanan yang berisi:
  - Nomor pesanan.
  - Tanggal pengajuan.
  - Ringkasan item atau jumlah jenis produk.
  - Total sementara/final dengan label yang tepat.
  - Status pesanan.
  - CTA **Lihat Detail/Progres**.
- Filter status atau tab sederhana bila sesuai dengan desain final.
- Empty state saat belum ada pesanan.
- CTA untuk kembali berbelanja.

### Persyaratan
- FR-PS-01: Sistem menampilkan daftar pesanan yang tersedia pada state frontend.
- FR-PS-02: Setiap kartu pesanan menampilkan nomor pesanan dan tanggal pengajuan.
- FR-PS-03: Setiap kartu menampilkan status ringkas.
- FR-PS-04: Nilai total diberi label **Sementara** jika ongkir atau total akhir belum dikonfirmasi.
- FR-PS-05: Pengguna dapat membuka detail/progres pesanan tertentu.
- FR-PS-06: Jika ada filter status, daftar diperbarui sesuai status yang dipilih.
- FR-PS-07: Jika belum ada pesanan, tampilkan pesan bahwa belum ada pesanan dan CTA kembali ke katalog.
- FR-PS-08: Urutan default menampilkan pesanan terbaru terlebih dahulu.
- FR-PS-09: Jika status tidak tersedia, tampilkan label fallback yang aman dan jangan mengasumsikan pesanan selesai.
- FR-PS-10: Dalam mode frontend-only, jelaskan bahwa daftar menggunakan data simulasi dan belum tersinkron dengan server.

### Status ringkas yang disarankan
- Menunggu Konfirmasi Penjual.
- Menunggu Pembayaran.
- Pembayaran Dikonfirmasi.
- Sedang Diproses.
- Dalam Pengiriman.
- Selesai.
- Dibatalkan.

Status di atas adalah usulan model UI; daftar final dan transisi status harus disepakati sebelum integrasi backend.

---

## 5.4 Halaman Progres Pesanan Saya

### Tujuan
Memberikan detail satu pesanan dan memperlihatkan tahapan prosesnya dengan jelas.

### Komponen UI
- Breadcrumb: Beranda / Pesanan Saya / Detail Pesanan.
- Nomor pesanan, waktu dibuat, dan status saat ini.
- Banner ringkasan status.
- Timeline progres.
- Ringkasan produk: nama, varian, kuantitas, harga satuan, subtotal.
- Rincian biaya: subtotal produk, ongkir, biaya lain jika resmi berlaku, total sementara/final.
- Informasi penerima dan alamat pengiriman.
- Informasi metode pengiriman dan nomor resi jika sudah tersedia.
- CTA kontekstual sesuai status, misalnya:
  - **Konfirmasi via WhatsApp** setelah pengajuan, jika alur WhatsApp telah disetujui.
  - **Hubungi Admin** jika perlu bantuan.
  - **Lihat Semua Pesanan** untuk kembali ke daftar.
- Tips penyimpanan/penyajian jika dipertahankan dari desain Stitch.

### Persyaratan
- FR-PP-01: Halaman menerima identitas/referensi pesanan yang dipilih.
- FR-PP-02: Menampilkan nomor pesanan, waktu pengajuan, dan status saat ini.
- FR-PP-03: Timeline menunjukkan tahap yang sudah dilewati, tahap aktif, dan tahap yang belum tercapai.
- FR-PP-04: Tahap aktif harus konsisten dengan status ringkas yang ditampilkan.
- FR-PP-05: Menampilkan item, kuantitas, harga, subtotal, dan total dengan label sementara/final yang tepat.
- FR-PP-06: Jika ongkir belum diketahui, tampilkan **Menunggu Perhitungan Admin** atau teks setara; jangan membuat nilai ongkir.
- FR-PP-07: Menampilkan data pengiriman yang tersedia tanpa menampilkan data sensitif berlebihan.
- FR-PP-08: Nomor resi dan kurir hanya ditampilkan jika data tersebut tersedia.
- FR-PP-09: Tombol **Lihat Semua Pesanan** mengarah ke Pesanan Saya.
- FR-PP-10: Jika pesanan tidak ditemukan pada data mock, tampilkan state tidak ditemukan dan CTA kembali ke Pesanan Saya.
- FR-PP-11: Jika tombol WhatsApp disediakan, gunakan nomor resmi yang sudah diverifikasi dan isi pesan dengan nomor pesanan serta konteks yang relevan. Jangan mengklaim pesan terkirim otomatis; pengguna tetap harus mengirimnya dari WhatsApp.
- FR-PP-12: Pada frontend-only, timeline adalah data simulasi, bukan pelacakan real-time.

### Timeline awal yang disarankan
1. **Pesanan Dibuat** — pesanan diajukan oleh pelanggan.
2. **Menunggu Konfirmasi Penjual** — penjual memeriksa stok dan menghitung ongkir.
3. **Menunggu Pembayaran / Pembayaran Dikonfirmasi** — tahap ini mengikuti kebijakan pembayaran final.
4. **Sedang Diproses dan Dikemas**.
5. **Dalam Pengiriman** — ditampilkan jika pesanan diserahkan kepada kurir.
6. **Selesai** — pesanan diterima atau diselesaikan sesuai prosedur toko.

**Penting:** Timeline di atas adalah rancangan awal. Jangan menampilkan semua tahap sebagai status yang benar-benar terjadi. Untuk data mock, bedakan tahap aktif, selesai, dan belum dimulai. Tahap pembayaran perlu disesuaikan dengan alur bisnis yang disetujui.

---

## 6. Model Data Frontend (Usulan)

Model berikut hanya untuk menyusun state dan mock data; bukan keputusan skema database.

### 6.1 CartItem
- `id: string`
- `productId: string`
- `name: string`
- `variantLabel?: string`
- `image: string`
- `unitPrice: number`
- `quantity: number`

### 6.2 CustomerForm
- `fullName: string`
- `whatsapp: string`
- `email?: string`
- `recipientSameAsCustomer: boolean`
- `recipientName?: string`
- `recipientPhone?: string`
- `shippingMethod: string`
- `address: string`
- `city: string`
- `postalCode?: string`
- `deliveryNote?: string`

### 6.3 Order (mock)
- `id: string`
- `orderNumber: string`
- `createdAt: string`
- `status: OrderStatus`
- `items: CartItem[]`
- `subtotal: number`
- `shippingCost: number | null`
- `grandTotal: number | null`
- `shippingMethod?: string`
- `recipientName: string`
- `recipientPhone?: string`
- `shippingAddress: string`
- `trackingNumber?: string`

### 6.4 OrderStatus
Gunakan union type yang konsisten, misalnya:
`'WAITING_SELLER_CONFIRMATION' | 'WAITING_PAYMENT' | 'PAYMENT_CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'`

Label Bahasa Indonesia dipetakan melalui satu helper agar label status tidak berbeda antarhalaman.

### 6.5 Aturan nilai total
- `subtotal` dihitung dari semua item.
- `shippingCost: null` berarti ongkir belum diketahui.
- `grandTotal: null` berarti total final belum diketahui.
- Jangan gunakan `0` untuk ongkir yang belum diketahui karena dapat disalahartikan sebagai ongkir gratis.
- Jika ongkir sudah dikonfirmasi, `grandTotal = subtotal + shippingCost + biaya resmi lain (jika ada)`.

---

## 7. Rekomendasi Struktur File Nuxt 4

Struktur berikut merupakan usulan dan boleh disesuaikan dengan struktur proyek yang sudah ada.

```text
app/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── cart/
│   │   ├── CartItem.vue
│   │   ├── CartSummary.vue
│   │   └── EmptyCart.vue
│   ├── order/
│   │   ├── OrderCard.vue
│   │   ├── OrderStatusBadge.vue
│   │   ├── OrderTimeline.vue
│   │   ├── OrderItemsSummary.vue
│   │   └── ShippingAddressCard.vue
│   └── checkout/
│       ├── CustomerForm.vue
│       ├── ShippingForm.vue
│       └── CheckoutSummary.vue
├── composables/
│   ├── useCart.ts
│   ├── useOrders.ts
│   └── useCurrency.ts
├── pages/
│   ├── keranjang.vue
│   ├── formulir-pemesanan.vue
│   ├── pesanan-saya/
│   │   ├── index.vue
│   │   └── [id].vue
│   └── ...
└── types/
    ├── cart.ts
    └── order.ts
```

Rute yang disarankan:
- `/keranjang`
- `/formulir-pemesanan`
- `/pesanan-saya`
- `/pesanan-saya/[id]` — detail/progres pesanan

Gunakan route detail yang sama untuk progres pesanan agar tidak membuat dua halaman berbeda yang menampilkan informasi identik.

---

## 8. Desain dan UX

### 8.1 Konsistensi visual
- Gunakan desain Stitch sebagai acuan utama untuk komposisi, hierarki, warna, tipografi, spacing, dan komponen.
- Pertahankan palet yang telah digunakan pada storefront: Deep Teal `#15353B`, Warm Gold `#D9A34A`, Warm Off-white `#FAF8F2`, WhatsApp Green `#25D366`, putih `#FFFFFF`, dan charcoal `#262626`, kecuali desain final menetapkan perubahan.
- Ikuti penggunaan tipografi Playfair Display untuk heading editorial dan Plus Jakarta Sans untuk body/UI bila font tersebut memang tersedia pada aset desain.
- Gunakan label status yang konsisten dan mudah dipahami.
- Tombol utama harus jelas; tombol sekunder tidak boleh bersaing secara visual.

### 8.2 Responsivitas
- Desktop: daftar item dan panel ringkasan dapat berdampingan jika sesuai mockup.
- Mobile: susun satu kolom; pastikan ringkasan dan CTA tidak menutupi isi halaman.
- Kontrol jumlah, tombol hapus, dan tombol submit harus nyaman disentuh.
- Hindari horizontal overflow pada tabel/kartu, alamat panjang, dan nomor pesanan.

### 8.3 Aksesibilitas
- Semua input memiliki label yang terlihat.
- Pesan error terhubung secara visual dengan field terkait.
- Status tidak dibedakan hanya melalui warna; gunakan teks dan/atau ikon.
- Tombol dan kontrol dapat digunakan dengan keyboard.
- Gambar produk memiliki teks alternatif yang sesuai.

---

## 9. Persyaratan Nonfungsional

- NFR-01: Halaman harus bekerja pada versi terbaru browser Chrome, Edge, Firefox, dan Safari yang umum digunakan.
- NFR-02: UI harus responsif untuk lebar ponsel hingga desktop.
- NFR-03: Komponen berulang seperti badge status, ringkasan harga, dan kartu pesanan harus reusable.
- NFR-04: Perhitungan harga dilakukan dari angka numerik, lalu diformat sebagai Rupiah menggunakan formatter terpusat.
- NFR-05: Data mock dan state simulasi harus dipisahkan dari komponen presentasi agar mudah diganti saat backend tersedia.
- NFR-06: Tidak boleh ada nomor WhatsApp, tarif kurir, klaim produk, atau aturan pembayaran yang dibuat-buat.
- NFR-07: Semua state tombol penting (normal, hover/focus, loading, disabled) perlu dirancang.
- NFR-08: Tidak ada klaim bahwa data tersimpan permanen, status real-time, atau WhatsApp otomatis terkirim selama belum ada integrasi backend.

---

## 10. Kriteria Penerimaan

### Keranjang
- [ ] Pengguna dapat menambah/mengurangi kuantitas dan melihat subtotal diperbarui.
- [ ] Pengguna dapat menghapus satu item.
- [ ] Kosongkan Keranjang meminta konfirmasi.
- [ ] Empty state muncul ketika tidak ada item.
- [ ] Ongkir yang belum diketahui tidak ditampilkan sebagai Rp0 atau gratis.

### Formulir Pemesanan
- [ ] Field wajib ditandai dengan jelas.
- [ ] Validasi nama, WhatsApp, alamat, dan kota berjalan.
- [ ] Email boleh kosong tetapi harus valid jika diisi.
- [ ] Data penerima dapat disamakan dengan data pemesan.
- [ ] Ringkasan produk sesuai dengan keranjang.
- [ ] Total diberi label sementara jika ongkir belum diketahui.
- [ ] Submit valid menghasilkan satu pesanan mock dan navigasi ke detail progres.
- [ ] Submit menampilkan loading/disabled untuk mengurangi pengajuan ganda.

### Pesanan Saya
- [ ] Daftar pesanan menampilkan nomor, tanggal, status, dan total dengan label yang tepat.
- [ ] Pesanan terbaru ditampilkan lebih dahulu.
- [ ] Pengguna dapat membuka detail pesanan.
- [ ] Empty state menyediakan jalan kembali ke katalog.

### Progres Pesanan
- [ ] Detail produk, penerima, alamat, dan status tampil konsisten.
- [ ] Timeline menandai tahap selesai, aktif, dan belum dimulai secara berbeda.
- [ ] Ongkir dan total final tidak direkayasa.
- [ ] Pengguna dapat kembali ke daftar pesanan.
- [ ] Data tidak ditemukan menghasilkan state yang jelas.
- [ ] CTA WhatsApp, jika ada, tidak mengklaim pesan telah terkirim.

### Umum
- [ ] Seluruh halaman responsif.
- [ ] Header/footer konsisten dengan landing page.
- [ ] Seluruh aksi utama dapat dicoba tanpa backend menggunakan mode simulasi yang jelas.
- [ ] Tidak ada tautan utama yang mati.

---

## 11. Tahapan Implementasi yang Disarankan

1. **Fondasi state dan tipe data** — definisikan CartItem, Order, status, formatter Rupiah, dan data mock.
2. **Keranjang** — daftar item, kuantitas, hapus, kosongkan, ringkasan, empty state.
3. **Formulir Pemesanan** — field, validasi, metode pengiriman, data penerima, ringkasan, submit simulasi.
4. **Pesanan Saya** — daftar mock, status badge, filter opsional, empty state.
5. **Progres Pesanan** — detail pesanan, timeline, rincian biaya, data pengiriman, CTA kontekstual.
6. **Integrasi navigasi dan pengujian** — cek seluruh alur dari keranjang sampai detail pesanan.
7. **Pemeriksaan visual** — cocokkan tampilan dengan ekspor Google Stitch pada desktop dan mobile.

---

## 12. Hal yang Perlu Dikonfirmasi Sebelum Integrasi Backend

1. Apakah pelanggan harus login untuk melihat Pesanan Saya, atau pencarian dilakukan menggunakan nomor pesanan dan nomor WhatsApp?
2. Apakah pengajuan pesanan diarahkan ke WhatsApp, disimpan ke server, atau keduanya? Desain saat ini mengindikasikan pesanan diajukan dahulu dan konfirmasi lanjutan dilakukan melalui WhatsApp.
3. Metode pengiriman apa yang benar-benar tersedia untuk lokal dan luar kota?
4. Apakah pembayaran dilakukan setelah penjual mengonfirmasi ongkir dan total?
5. Status pesanan final apa saja dan siapa yang dapat mengubahnya?
6. Apakah email benar-benar dibutuhkan atau hanya opsional?
7. Apakah pengguna boleh membatalkan pesanan, dan sampai status apa?
8. Apakah perlu halaman konfirmasi penerimaan paket terpisah pada fase berikutnya?

---

## 13. Catatan Penting

Ekspor Google Stitch berisi beberapa teks contoh, angka, nama penerima, nomor pesanan, tarif, nomor kontak, dan klaim produk yang tampak sebagai data mockup. Perlakukan nilai tersebut sebagai **konten contoh**, bukan fakta bisnis yang sudah disahkan. Sebelum dipakai di website produksi, verifikasi harga, komposisi paket, klaim halal/komposisi, masa simpan, metode kurir, cakupan pengiriman, jam layanan, nomor WhatsApp, serta prosedur pembayaran dengan pemilik usaha.

**Hasil yang diharapkan dari PRD ini:** implementasi frontend empat halaman yang konsisten secara visual, memiliki alur pelanggan yang dapat diuji, dan siap dihubungkan ke backend pada fase berikutnya tanpa berpura-pura sudah memiliki integrasi nyata.
