# PRD — Admin Pempek Al Hijrah
**Versi:** 1.1  
**Basis desain:** Ekspor Google Stitch `stitch_pempek_al_hijrah_storefront` yang diberikan pengguna  
**Stack frontend:** Nuxt 4, Vue 3 Composition API (`<script setup>`), TypeScript, Tailwind CSS v4  
**Cakupan:** Dashboard, Pesanan Masuk, Inventaris Paket Frozen

> **Prinsip sumber:** Struktur dan elemen UI di bawah diambil dari HTML ekspor Stitch. Angka, nama pelanggan, nomor pesanan, nomor rekening, harga, stok, status operasional, klaim penyimpanan, dan nama layanan pada mockup diperlakukan sebagai data contoh sampai diverifikasi oleh pemilik usaha.

---

## 1. Tujuan Produk

Membangun panel admin yang membantu pengelola Pempek Al Hijrah:
- memantau kondisi operasional toko;
- memeriksa pesanan dan menentukan ongkir;
- mengelola komunikasi konfirmasi pesanan melalui WhatsApp;
- memantau ketersediaan paket frozen, stok bahan, dan catatan batch produksi.

Tiga halaman utama:
1. **Dashboard / Panel Operasional** — `/admin`
2. **Pesanan Masuk** — `/admin/pesanan`
3. **Inventaris** — `/admin/inventaris`

Gunakan satu layout admin bersama yang konsisten dengan desain Stitch, dengan sidebar navigasi dan header admin.

## 2. Sumber Desain Stitch yang Digunakan

### 2.1 Dashboard / Panel Operasional
Folder: `admin_portal_manajemen_pesanan_pempek_al_hijrah/`  
File acuan: `screen.png` dan `code.html`

Elemen yang terlihat pada HTML:
- Navigasi: Ringkasan Dashboard, Kelola Pesanan Masuk, Inventaris Paket Frozen, Kembali ke Beranda Toko.
- Indikator sistem aktif/siap menerima order.
- Panel “Panel Operasional Dapur & Pesanan Toko”.
- Tombol “Perbarui Data” dan waktu pembaruan.
- Statistik pesanan hari ini, pesanan perlu tindakan WhatsApp, omzet bulan ini, dan stok frozen siap kirim.
- Daftar Pesanan Masuk dengan filter status.
- Tabel berisi ID/waktu pesanan, pelanggan, rincian paket, tipe kirim, subtotal, status, dan tindakan.
- Panel “Input Ongkir & Buat WA Konfirmasi” dengan data pesanan terpilih, pilihan biaya ongkir, total tagihan, preview pesan WhatsApp, salin teks, kirim tagihan, dan tandai transfer.
- Informasi jadwal/batch dapur dan rekening tujuan tagihan WhatsApp.

**Interpretasi produk:** jadikan halaman ini Dashboard operasional. Untuk menjaga ruang lingkup tiga halaman tetap jelas, daftar pesanan di dashboard berfungsi sebagai ringkasan dan akses cepat; pengelolaan daftar secara penuh ada di Pesanan Masuk.

### 2.2 Pesanan Masuk
Folder: `admin_portal_kelola_pesanan_masuk/`  
File acuan: `screen.png` dan `code.html`

Elemen yang terlihat pada HTML:
- Header “Kelola & Pemrosesan Pesanan”.
- Statistik antrean menunggu ongkir, perlu verifikasi, siap kemas, dan total hari ini.
- Pencarian dan filter status.
- Filter ekspedisi: Paxel Cold Chain, GoSend/Grab, JNE YES, dan Kurir Dapur Hijrah.
- Pilihan tanggal, pilih semua, cetak label alamat, kirim pengingat WhatsApp massal, dan export Excel.
- Tabel pesanan berisi invoice/pemesan, item frozen, pengiriman, total bayar, status, dan aksi operasional.
- Instruksi tim dapur dan pengemasan.
- Panel pemeriksaan cepat untuk pesanan yang dipilih, termasuk bukti transfer, alamat, validasi, cetak, kirim resi via WhatsApp, dan pratinjau struk thermal.

**Interpretasi produk:** halaman ini adalah area kerja utama untuk memproses setiap pesanan, bukan hanya melihat daftar. Aksi cetak, export, WhatsApp, bukti transfer, dan resi harus dianggap belum aktif sampai tersedia implementasi yang benar.

### 2.3 Inventaris
Folder: `admin_portal_inventaris_paket_frozen/`  
File acuan: `screen.png` dan `code.html`

Elemen yang terlihat pada HTML:
- Header “Manajemen Inventaris & Stok Frozen Pack”.
- Aksi “Opname Stok Freezer”, “Atur Peringatan Stok Tipis”, dan “Catat Batch Masak Baru”.
- Statistik total siap jual, kapasitas freezer, utilisasi freezer, peringatan kritis, stok daging ikan tenggiri, dan stok cuko.
- Keterangan SOP pengemasan vakum dan penyimpanan.
- Katalog SKU dan status ketersediaan freezer dengan kolom SKU/detail paket, komposisi/varian, harga satuan, stok saat ini, status buffer, dan aksi manajemen.
- Riwayat batch masak dapur.
- Log keluar/masuk stok, contoh pesanan yang mengalokasikan stok, catatan restok, dan pemeriksaan suhu cold storage.

**Interpretasi produk:** halaman inventaris pada desain Stitch lebih luas daripada daftar produk jadi saja. Ia mencakup stok paket siap jual, beberapa bahan/komponen, batch dapur, serta log stok. Untuk tahap pertama, pisahkan dengan jelas data yang benar-benar akan dikelola dan bagian yang masih berupa mockup.

---

## 3. Peran dan Asumsi

- Pengguna utama: pengelola/admin toko.
- Ekspor Stitch menampilkan label “Pengelola Toko Superadmin”, tetapi hak akses dan kebutuhan role belum didefinisikan; jangan membangun sistem role sebelum dikonfirmasi.
- Untuk tahap frontend, data dapat menggunakan mock data.
- Jika backend belum tersedia, semua perubahan bersifat simulasi dan harus diberi penanda.
- Tidak ada data mock yang boleh dipresentasikan sebagai pesanan, omzet, rekening, pelanggan, atau stok produksi yang sebenarnya.

## 4. Halaman 1 — Dashboard / Panel Operasional

**Rute:** `/admin`

### Tujuan
Memberikan ringkasan operasional toko dan menampilkan pesanan yang membutuhkan perhatian admin.

### Komponen yang harus dirancang
1. **Admin shell**
   - Sidebar: Dashboard, Kelola Pesanan Masuk, Inventaris Paket Frozen.
   - Link kembali ke storefront.
   - Header halaman dan indikator status sistem.
2. **Panel operasional**
   - Judul panel operasional dapur dan pesanan.
   - Tombol Perbarui Data.
   - Waktu pembaruan data, jika tersedia.
3. **Kartu statistik**
   - Pesanan Hari Ini.
   - Perlu Tindakan WhatsApp.
   - Omzet Bulan Ini.
   - Stok Frozen Siap Kirim.
4. **Daftar Pesanan Masuk ringkas**
   - Filter status seperti Semua, Menunggu Konfirmasi, Dikonfirmasi, Diproses Dapur, dan Selesai.
   - Kolom ID/waktu, pelanggan, rincian paket, tipe pengiriman, subtotal, status, tindakan.
   - Pagination jika data melebihi batas tampilan.
5. **Panel input ongkir dan konfirmasi WhatsApp**
   - Nomor pesanan dan data pelanggan yang dipilih.
   - Subtotal produk.
   - Input ongkir.
   - Opsi tarif hanya boleh berasal dari konfigurasi yang disahkan, bukan angka contoh Stitch.
   - Total tagihan final.
   - Preview pesan WhatsApp.
   - Aksi salin pesan dan buka WhatsApp.
   - Aksi tandai transfer hanya setelah aturan verifikasi pembayaran disepakati.
6. **Info dapur**
   - Ringkasan batch produksi dan statusnya.
   - Informasi rekening pembayaran hanya jika sudah diverifikasi pemilik usaha.

### Persyaratan fungsional
- **FR-D-01:** Dashboard menampilkan kartu statistik dari satu sumber data.
- **FR-D-02:** Daftar pesanan dashboard hanya menampilkan ringkasan dan menyediakan jalan ke halaman Pesanan Masuk.
- **FR-D-03:** Admin dapat memilih pesanan untuk melihat panel ringkas.
- **FR-D-04:** Subtotal berasal dari item pesanan; total final dihitung hanya jika ongkir sudah diketahui.
- **FR-D-05:** Jika ongkir belum diketahui, tampilkan status menunggu penentuan ongkir, bukan Rp0 atau gratis.
- **FR-D-06:** Preview WhatsApp menampilkan draft yang dapat disalin/dibuka; sistem tidak boleh mengklaim pesan terkirim otomatis.
- **FR-D-07:** Tombol Perbarui Data menampilkan state loading dan feedback; pada mode mock hanya menyegarkan tampilan simulasi.
- **FR-D-08:** Statistik omzet hanya boleh dipakai dengan label demo sampai rumus dan sumber datanya disetujui.
- **FR-D-09:** Data kosong menampilkan empty state.
- **FR-D-10:** Panel batch/rekening tidak menampilkan data contoh sebagai informasi produksi.

### Perhitungan
- `subtotal = jumlah subtotal semua item`
- `totalFinal = subtotal + ongkir` hanya setelah ongkir disahkan.
- Jika ongkir belum tersedia, total final tetap `null` dan UI menampilkan “Menunggu Ongkir”.

---

## 5. Halaman 2 — Pesanan Masuk

**Rute:** `/admin/pesanan`

### Tujuan
Mendukung pemrosesan pesanan dari pengecekan data, ongkir, verifikasi pembayaran, persiapan paket, sampai pengiriman/arsip sesuai proses bisnis yang telah disepakati.

### Komponen yang harus dirancang
1. **Ringkasan status**
   - Menunggu Ongkir.
   - Perlu Verifikasi.
   - Siap Kemas.
   - Total Hari Ini.
2. **Kontrol pencarian/filter**
   - Pencarian pesanan/pelanggan.
   - Filter status.
   - Filter ekspedisi.
   - Filter tanggal.
3. **Aksi massal**
   - Pilih pesanan.
   - Cetak label alamat.
   - Kirim pengingat WhatsApp massal.
   - Export Excel.
4. **Tabel pesanan**
   - Nomor pesanan/invoice.
   - Pemesan dan nomor kontak.
   - Item frozen dan berat jika data tersedia.
   - Metode pengiriman dan alamat tujuan ringkas.
   - Subtotal, ongkir, total bayar.
   - Status.
   - Aksi operasional.
5. **Panel detail/pemeriksaan cepat**
   - Detail pesanan dan alamat lengkap.
   - Bukti transfer bila tersedia.
   - Data nominal transfer untuk diverifikasi admin.
   - Tombol validasi pembayaran.
   - Pratinjau struk/label.
   - Input resi dan aksi kirim resi.
   - Catatan pengemasan sesuai metode pengiriman.

### Persyaratan fungsional
- **FR-PI-01:** Pesanan terbaru ditampilkan lebih dahulu secara default.
- **FR-PI-02:** Pencarian dan filter status, ekspedisi, serta tanggal memperbarui daftar.
- **FR-PI-03:** Admin dapat memilih satu pesanan dan membuka detail tanpa kehilangan konteks daftar.
- **FR-PI-04:** Ongkir dan total ditampilkan dengan status sementara/final yang benar.
- **FR-PI-05:** Bukti transfer hanya ditandai valid setelah pemeriksaan manual oleh admin; UI mock tidak boleh mengesahkan transaksi nyata.
- **FR-PI-06:** Perubahan status mengikuti transisi yang disetujui.
- **FR-PI-07:** Aksi massal hanya berjalan pada pesanan yang dipilih dan meminta konfirmasi sebelum aksi yang berdampak.
- **FR-PI-08:** Cetak label, export Excel, pengiriman WhatsApp, dan input resi memiliki state yang jelas. Jika belum diimplementasikan, tampilkan sebagai demo/disabled dengan alasan.
- **FR-PI-09:** Panel detail menampilkan instruksi pengemasan sesuai metode pengiriman hanya setelah SOP dikonfirmasi.
- **FR-PI-10:** Hasil filter kosong dan daftar kosong memiliki empty state.
- **FR-PI-11:** Semua perubahan status tercermin konsisten pada daftar dan panel detail selama sesi mock.
- **FR-PI-12:** Nomor telepon, alamat, dan bukti transfer hanya ditampilkan kepada admin yang berwenang saat autentikasi/otorisasi diterapkan.

### Status UI awal
Desain Stitch menampilkan label seperti:
- Menunggu Ongkir & WA.
- Menunggu Bukti Transfer.
- Sudah Bayar & Siap Kemas.
- Sedang Dikemas/Diproses.
- Sedang Dikirim.
- Selesai.

Gunakan label ini sebagai kandidat status UI, lalu tetapkan daftar final dan transisi sebelum backend. Hindari memiliki dua label yang sebenarnya mewakili status yang sama tanpa aturan jelas.

### Aksi yang memerlukan integrasi nyata
- Membuka WhatsApp dengan pesan terformat.
- Mengirim pengingat WhatsApp massal.
- Verifikasi bukti transfer.
- Cetak label/struk thermal.
- Export Excel.
- Menyimpan nomor resi.
- Mengubah status di sistem pusat.

---

## 6. Halaman 3 — Inventaris Paket Frozen

**Rute:** `/admin/inventaris`

### Tujuan
Memantau stok paket siap jual dan informasi inventaris terkait proses produksi/pengemasan frozen food.

### Komponen yang harus dirancang berdasarkan Stitch
1. **Aksi utama**
   - Opname Stok Freezer.
   - Atur Peringatan Stok Tipis.
   - Catat Batch Masak Baru.
2. **Kartu statistik**
   - Total Siap Jual.
   - Kapasitas Freezer.
   - Utilisasi Freezer.
   - Peringatan Kritis.
   - Stok bahan ikan tenggiri.
   - Stok cuko botolan.
3. **SOP pengemasan/penyimpanan**
   - Area informasi prosedur sebagai konten yang dapat dikonfigurasi.
   - Semua klaim suhu, masa simpan, dan ketahanan perjalanan harus diverifikasi sebelum dipublikasikan.
4. **Katalog SKU**
   - SKU.
   - Nama/detail paket.
   - Komposisi/varian.
   - Harga satuan.
   - Stok saat ini dan satuan.
   - Ambang/buffer minimum.
   - Status ketersediaan.
   - Aksi Update Stok dan Riwayat.
5. **Riwayat batch masak**
   - Nama batch/produk.
   - Status batch.
   - Output produksi.
   - Catatan proses.
   - Waktu.
6. **Log keluar/masuk stok**
   - Jenis perubahan: stok keluar, restok, opname, atau penyesuaian.
   - Item dan jumlah.
   - Waktu.
   - Referensi pesanan/batch bila tersedia.
   - Catatan.
7. **Pemantauan suhu cold storage**
   - Nilai sensor dan status hanya jika data sensor nyata terintegrasi.
   - Jika belum ada sensor/API, tampilkan data simulasi dengan label yang jelas.

### Persyaratan fungsional
- **FR-I-01:** Inventaris menampilkan ringkasan dan daftar SKU dari satu sumber data.
- **FR-I-02:** Admin dapat mencari/filter SKU berdasarkan nama, SKU, dan status stok.
- **FR-I-03:** Admin dapat memperbarui stok dengan memasukkan jumlah dan alasan perubahan.
- **FR-I-04:** Perubahan stok menghasilkan catatan riwayat dalam state mock.
- **FR-I-05:** Admin dapat mengatur ambang stok minimum.
- **FR-I-06:** Produk dengan stok nol ditandai Habis; produk di bawah/tepat ambang ditandai Stok Menipis; stok di atas ambang ditandai Aman/Tersedia.
- **FR-I-07:** Admin dapat memulai form pencatatan batch produksi.
- **FR-I-08:** Batch menampilkan status, output, waktu, dan catatan.
- **FR-I-09:** Kartu kapasitas dan utilisasi dihitung hanya jika kapasitas freezer dan jumlah terpakai memiliki definisi/satuan yang konsisten.
- **FR-I-10:** Data sensor suhu diberi label simulasi jika tidak berasal dari perangkat/API nyata.
- **FR-I-11:** Data produk, bahan baku, batch, dan log stok dibedakan agar satuan tidak tercampur.
- **FR-I-12:** Aksi opname dan perubahan stok meminta konfirmasi sebelum menyimpan.
- **FR-I-13:** Semua aksi hanya mengubah mock state sampai backend tersedia.
- **FR-I-14:** Empty state ditampilkan untuk katalog, batch, dan log yang kosong.

### Model stok yang disarankan
Untuk tiap SKU:
- `id`
- `sku`
- `name`
- `variantOrComposition`
- `unitPrice`
- `stockQuantity`
- `stockUnit` (misalnya pack atau botol)
- `minimumStock`
- `status`
- `isActive`

Untuk bahan baku, gunakan model/unit terpisah (misalnya kilogram atau liter). Jangan menjumlahkan pack, botol, kilogram, dan liter menjadi satu angka total tanpa konversi yang sah.

Untuk catatan stok:
- `id`
- `itemId`
- `movementType`
- `quantity`
- `unit`
- `reason`
- `referenceId?`
- `createdAt`

Untuk batch:
- `id`
- `batchCode`
- `productOrComponent`
- `outputQuantity`
- `unit`
- `status`
- `notes?`
- `createdAt`

---

## 7. Aturan Status dan Data

### 7.1 Ongkir dan total
- `shippingCost: null` berarti ongkir belum diketahui.
- `grandTotal: null` berarti total final belum disepakati.
- Jangan gunakan angka `0` untuk merepresentasikan ongkir yang belum diketahui.
- Total final hanya dihitung setelah ongkir dikonfirmasi.

### 7.2 Format uang
Gunakan formatter Rupiah terpusat dengan `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })`.

### 7.3 Status pesanan
Simpan status dalam nilai kode konsisten, lalu petakan ke label Bahasa Indonesia di satu helper agar label di Dashboard dan Pesanan Masuk tidak berbeda.

### 7.4 Data simulasi
Data contoh Stitch (misalnya jumlah pesanan, omzet, nama pelanggan, nomor telepon, harga ongkir, rekening, status freezer, atau suhu) tidak boleh dijadikan data produksi tanpa validasi.

---

## 8. Struktur File Nuxt 4 yang Disarankan

```text
app/
├── layouts/
│   └── admin.vue
├── components/
│   └── admin/
│       ├── AdminSidebar.vue
│       ├── AdminHeader.vue
│       ├── StatCard.vue
│       ├── OrderStatusBadge.vue
│       ├── OrdersTable.vue
│       ├── OrderDetailPanel.vue
│       ├── ShippingCostForm.vue
│       ├── WhatsAppMessagePreview.vue
│       ├── InventorySummary.vue
│       ├── InventoryTable.vue
│       ├── StockMovementForm.vue
│       ├── BatchList.vue
│       └── BatchForm.vue
├── composables/
│   ├── useAdminOrders.ts
│   ├── useInventory.ts
│   ├── useProductionBatches.ts
│   └── useCurrency.ts
├── pages/
│   └── admin/
│       ├── index.vue
│       ├── pesanan.vue
│       └── inventaris.vue
└── types/
    ├── order.ts
    ├── inventory.ts
    └── production.ts
```

Ini rekomendasi; sesuaikan dengan struktur Nuxt yang sudah ada.

## 9. Desain dan UX

- Gunakan screenshot dan `code.html` dari masing-masing folder Stitch sebagai acuan visual utama.
- Pertahankan sidebar, header, kartu statistik, tabel, badge status, dan panel detail yang memang terlihat pada sumber.
- Gunakan warna, tipografi, ikon, jarak, radius, dan copywriting dari HTML Stitch; jangan menggantinya dengan desain admin generik tanpa alasan.
- Pastikan tabel tetap terbaca pada desktop dan beralih ke layout kartu/scroll terkontrol pada layar kecil.
- Status harus memiliki teks, bukan warna saja.
- Dialog konfirmasi untuk aksi destruktif/perubahan penting.
- Label, error, fokus keyboard, dan tombol harus aksesibel.

## 10. Nonfungsional

- **NFR-01:** Responsif pada desktop, tablet, dan mobile.
- **NFR-02:** Komponen statistik, tabel, badge, dan form reusable.
- **NFR-03:** Mock data dipisahkan dari komponen UI agar mudah diganti API.
- **NFR-04:** Semua tombol penting memiliki perilaku nyata dalam simulasi atau dinonaktifkan dengan alasan.
- **NFR-05:** Tidak mengklaim real-time, pengiriman WhatsApp otomatis, pembayaran tervalidasi, cetak fisik, atau penyimpanan permanen tanpa integrasi.
- **NFR-06:** Data pribadi pelanggan dan bukti pembayaran tidak ditampilkan di luar konteks yang diperlukan.
- **NFR-07:** Perhitungan total dan stok menggunakan tipe angka dan satuan yang konsisten.

## 11. Kriteria Penerimaan

### Dashboard
- [ ] Sidebar menavigasikan ke tiga halaman admin.
- [ ] Statistik dan daftar pesanan memakai sumber data mock yang konsisten.
- [ ] Admin dapat memilih pesanan dan melihat ringkasan.
- [ ] Ongkir yang belum diketahui tidak tampil sebagai gratis/Rp0.
- [ ] Preview pesan WhatsApp dapat disalin atau dibuka sebagai draft jika fitur disimulasikan.
- [ ] Data mock/omzet diberi label demo.

### Pesanan Masuk
- [ ] Pencarian dan filter status/ekspedisi/tanggal bekerja.
- [ ] Detail pesanan menampilkan item, alamat, biaya, status, dan data yang tersedia.
- [ ] Ongkir/total sementara dibedakan dari nilai final.
- [ ] Aksi massal hanya berlaku pada pesanan terpilih.
- [ ] Bukti transfer tidak otomatis dianggap valid.
- [ ] Tombol cetak/export/WhatsApp/resi memiliki feedback atau penjelasan jika belum terintegrasi.

### Inventaris
- [ ] Ringkasan dan tabel SKU konsisten.
- [ ] Stok dan satuan ditampilkan dengan jelas.
- [ ] Ambang stok minimum dapat diubah dalam simulasi.
- [ ] Update stok dan opname tercatat di log mock.
- [ ] Batch produksi memiliki status, output, dan waktu.
- [ ] Data sensor diberi label simulasi jika tidak terhubung ke sensor nyata.
- [ ] Satuan pack, botol, kg, dan liter tidak dijumlahkan secara tidak valid.

### Umum
- [ ] Visual mengikuti screenshot/HTML Stitch.
- [ ] Layout responsif dan empty state tersedia.
- [ ] Tidak ada aksi utama yang diam tanpa feedback.
- [ ] Tidak ada konten mock yang disajikan sebagai fakta operasional.

## 12. Tahapan Implementasi

1. **Audit desain Stitch:** buka screenshot dan HTML tiga folder sumber; catat warna, spacing, komponen, dan responsivitas.
2. **Admin shell:** layout, sidebar, header, routes, tipe data, mock data, helper status dan uang.
3. **Dashboard:** kartu statistik, daftar pesanan ringkas, panel ongkir/WhatsApp, batch dapur.
4. **Pesanan Masuk:** filter, tabel, panel detail, aksi status, preview transfer/label/resi.
5. **Inventaris:** ringkasan, tabel SKU, update stok, riwayat, batch, status sensor mock.
6. **Konsistensi state:** pastikan perubahan mock di satu area terlihat di area terkait.
7. **QA visual dan fungsional:** cocokkan dengan Stitch, uji mobile, validasi, empty states, dan seluruh kriteria penerimaan.

## 13. Keputusan yang Harus Dikonfirmasi

1. Apakah Dashboard hanya ringkasan atau juga harus menyertakan panel input ongkir/konfirmasi seperti di Stitch?
2. Status pesanan final dan transisi status yang diperbolehkan.
3. Bagaimana admin memverifikasi pembayaran dan apakah bukti transfer diunggah oleh pelanggan.
4. Daftar kurir dan rumus/opsi ongkir resmi.
5. Nomor WhatsApp resmi dan template pesan yang disetujui.
6. Apakah cetak label/struk dan export Excel diperlukan pada versi pertama.
7. Apakah inventaris meliputi produk jadi saja atau juga bahan baku.
8. Kapan stok berkurang: saat pesanan dibuat, setelah pembayaran dikonfirmasi, atau saat mulai diproses.
9. Kapasitas freezer, satuan inventaris, ambang stok minimum, dan arti utilisasi.
10. Apakah data suhu berasal dari sensor nyata atau hanya tampilan manual.
11. SOP pengemasan, batas waktu pengiriman, dan klaim masa simpan yang benar.
12. Role admin dan batas akses ke data pelanggan/rekening.

## 14. Kesimpulan

PRD ini menyelaraskan tiga halaman admin dengan ekspor Google Stitch yang diberikan:
- **Dashboard:** `admin_portal_manajemen_pesanan_pempek_al_hijrah`
- **Pesanan Masuk:** `admin_portal_kelola_pesanan_masuk`
- **Inventaris:** `admin_portal_inventaris_paket_frozen`

Gunakan file `screen.png` dan `code.html` dari masing-masing folder sebagai sumber visual. Implementasi awal boleh memakai mock data, tetapi harus menandai simulasi secara jelas. Semua kebijakan bisnis, nilai harga/stok, ongkir, rekening, status pembayaran, SOP pengemasan, dan data suhu harus diverifikasi sebelum produksi.
