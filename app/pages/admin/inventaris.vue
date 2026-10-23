<template>
  <div class="space-y-6">
    <!-- Header & Action Buttons (Stitch v1.1) -->
    <div class="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span class="text-xs font-bold text-gold-secondary uppercase tracking-wider">Modul Freezer & Produksi</span>
          <h1 class="text-xl sm:text-2xl font-bold text-teal-primary mt-1">Manajemen Inventaris & Stok Frozen Pack</h1>
          <p class="text-xs text-gray-500 mt-0.5">Pantau kapasitas freezer, stok paket frozen, bahan baku utama, dan batch memasak dapur.</p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button
            @click="openBatchModal"
            class="px-3.5 py-2.5 bg-teal-primary hover:bg-teal-primary/90 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            + Catat Batch Masak Baru
          </button>
          <button
            @click="opnameStock"
            class="px-3.5 py-2.5 bg-warm-bg border border-gray-300 text-gray-700 font-semibold rounded-xl text-xs hover:bg-gray-100 transition-colors"
          >
            📋 Opname Stok Freezer
          </button>
        </div>
      </div>

      <!-- Stat Cards (Stitch v1.1) -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
        <div class="bg-teal-50 border border-teal-200 p-3.5 rounded-xl">
          <p class="text-[10px] font-bold text-teal-800 uppercase">Total Siap Jual</p>
          <p class="text-lg font-bold text-teal-900 mt-1">{{ totalReadyStock }} pack</p>
        </div>
        <div class="bg-blue-50 border border-blue-200 p-3.5 rounded-xl">
          <p class="text-[10px] font-bold text-blue-800 uppercase">Kapasitas Freezer</p>
          <p class="text-lg font-bold text-blue-900 mt-1">850 Pack</p>
        </div>
        <div class="bg-indigo-50 border border-indigo-200 p-3.5 rounded-xl">
          <p class="text-[10px] font-bold text-indigo-800 uppercase">Utilisasi Freezer</p>
          <p class="text-lg font-bold text-indigo-900 mt-1">{{ freezerUtilization }}%</p>
        </div>
        <div class="bg-rose-50 border border-rose-200 p-3.5 rounded-xl">
          <p class="text-[10px] font-bold text-rose-800 uppercase">Peringatan Kritis</p>
          <p class="text-lg font-bold text-rose-900 mt-1">{{ criticalCount }} SKU</p>
        </div>
        <div class="bg-amber-50 border border-amber-200 p-3.5 rounded-xl">
          <p class="text-[10px] font-bold text-amber-800 uppercase">Stok Daging Tenggiri</p>
          <p class="text-lg font-bold text-amber-900 mt-1">45.5 kg</p>
        </div>
        <div class="bg-purple-50 border border-purple-200 p-3.5 rounded-xl">
          <p class="text-[10px] font-bold text-purple-800 uppercase">Stok Cuko Botolan</p>
          <p class="text-lg font-bold text-purple-900 mt-1">115 Botol</p>
        </div>
      </div>

      <!-- Cold Storage Temperature Banner & SOP Info -->
      <div class="bg-linear-to-r from-sky-900 to-teal-primary text-white p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">
            ❄️
          </div>
          <div>
            <p class="font-bold">Pemantauan Sensor Cold Storage (Freezer Utama)</p>
            <p class="text-[11px] text-sky-200 mt-0.5">Suhu Aktual: <span class="font-bold text-emerald-300">-18.4°C</span> &bull; Status: Terjaga Normal (SOP Vakum -18°C)</p>
          </div>
        </div>
        <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px]">
          Suhu Aman Terkontrol
        </span>
      </div>
    </div>

    <!-- SKU Catalog Table -->
    <div class="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden space-y-4">
      <div class="p-6 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 class="font-bold text-teal-primary text-base">Katalog Paket Frozen & Status Buffer</h3>
          <p class="text-xs text-gray-500">Kelola ketersediaan produk, harga, dan ambang batas stok minimum.</p>
        </div>
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari SKU / Nama Paket..."
            class="w-full sm:w-60 p-2.5 bg-warm-bg border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
          />
          <button
            @click="openAddModal"
            class="px-4 py-2.5 bg-teal-primary text-white font-bold rounded-xl text-xs hover:bg-teal-primary/90 transition-colors shrink-0"
          >
            + Tambah SKU
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
              <th class="p-4">SKU & Nama Paket</th>
              <th class="p-4">Kategori / Komposisi</th>
              <th class="p-4 text-right">Harga Satuan</th>
              <th class="p-4 text-center">Stok Saat Ini</th>
              <th class="p-4">Status Buffer</th>
              <th class="p-4 text-center">Aksi Manajemen</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 text-xs">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition-colors">
              <td class="p-4 flex items-center space-x-3">
                <img v-if="product.imageUrl" :src="product.imageUrl" class="w-11 h-11 object-cover rounded-xl border shrink-0" />
                <div>
                  <p class="font-bold text-charcoal text-sm">{{ product.name }}</p>
                  <p class="text-[10px] text-gray-500 font-mono mt-0.5">{{ product.sku || 'PAH-SKU' }}</p>
                </div>
              </td>
              <td class="p-4">
                <p class="font-semibold text-gray-800">{{ product.category || 'Paket Frozen' }}</p>
                <p class="text-[10px] text-gray-500 truncate max-w-xs">{{ product.weight || '± 500 gram' }}</p>
              </td>
              <td class="p-4 text-right font-bold text-gray-900">
                {{ formatRupiah(product.price) }}
              </td>
              <td class="p-4 text-center">
                <div class="inline-flex items-center space-x-2">
                  <button
                    @click="adjustStock(product, -1)"
                    class="w-6 h-6 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span class="font-bold text-sm w-8 text-center">{{ product.stock }}</span>
                  <button
                    @click="adjustStock(product, 1)"
                    class="w-6 h-6 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </td>
              <td class="p-4">
                <StockStatusBadge :status="getStockStatus(product)" />
              </td>
              <td class="p-4 text-center">
                <div class="flex items-center justify-center space-x-2">
                  <button
                    @click="openEditModal(product)"
                    class="px-3 py-1.5 bg-gray-100 hover:bg-teal-primary hover:text-white font-semibold rounded-xl text-xs transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    @click="openStatusModal(product)"
                    class="px-3 py-1.5 font-semibold rounded-xl text-xs transition-colors"
                    :class="product.isActive ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'"
                  >
                    {{ product.isActive ? 'Nonaktifkan' : 'Aktifkan' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Production Batches & Stock Movements Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Production Batches -->
      <div class="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-teal-primary text-base">Riwayat Batch Masak Dapur</h3>
          <span class="text-xs text-gray-500 font-medium">{{ batches.length }} batch tercatat</span>
        </div>

        <div class="space-y-3">
          <div v-for="batch in batches" :key="batch.id" class="p-3.5 bg-warm-bg border border-gray-200 rounded-xl space-y-1.5">
            <div class="flex justify-between items-center">
              <span class="font-bold text-teal-primary text-xs">{{ batch.batchCode }} &bull; {{ batch.productOrComponent }}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                {{ batch.status }}
              </span>
            </div>
            <p class="text-xs text-gray-700">Output: <span class="font-bold text-gray-900">{{ batch.outputQuantity }} {{ batch.unit }}</span></p>
            <p class="text-[11px] text-gray-500">{{ batch.notes }} &bull; {{ batch.createdAt }}</p>
          </div>
        </div>
      </div>

      <!-- Stock Movements Log -->
      <div class="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-teal-primary text-base">Log Keluar / Masuk Stok</h3>
          <span class="text-xs text-gray-500 font-medium">Mutasi terbaru</span>
        </div>

        <div class="space-y-3">
          <div v-for="mov in movements" :key="mov.id" class="p-3.5 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
            <div class="flex justify-between items-center">
              <span class="font-bold text-gray-900 text-xs">{{ mov.itemName }}</span>
              <span
                class="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                :class="mov.movementType === 'IN' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
              >
                {{ mov.movementType === 'IN' ? '+' : '-' }}{{ mov.quantity }} {{ mov.unit }}
              </span>
            </div>
            <p class="text-xs text-gray-600">Alasan: {{ mov.reason }}</p>
            <p class="text-[10px] text-gray-400">{{ mov.createdAt }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Form Modal -->
    <ProductFormModal
      v-if="modalOpen"
      :product="selectedProduct"
      @close="modalOpen = false"
      @saved="modalOpen = false"
    />

    <!-- Batch Form Modal -->
    <div v-if="batchModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-sm text-charcoal">
        <div class="flex justify-between items-center border-b pb-3">
          <h3 class="font-bold text-lg text-teal-primary">Catat Batch Masak Baru</h3>
          <button @click="batchModalOpen = false" class="text-gray-400 hover:text-gray-600 font-bold text-lg">×</button>
        </div>

        <form @submit.prevent="handleSaveBatch" class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Kode Batch</label>
            <input type="text" v-model="batchForm.batchCode" required class="w-full p-2.5 border rounded-xl text-xs" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Produk / Komponen</label>
            <input type="text" v-model="batchForm.productOrComponent" required class="w-full p-2.5 border rounded-xl text-xs" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1">Jumlah Output</label>
              <input type="number" v-model.number="batchForm.outputQuantity" required min="1" class="w-full p-2.5 border rounded-xl text-xs" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1">Satuan</label>
              <input type="text" v-model="batchForm.unit" required class="w-full p-2.5 border rounded-xl text-xs" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Catatan Produksi</label>
            <textarea v-model="batchForm.notes" rows="2" class="w-full p-2.5 border rounded-xl text-xs" placeholder="Catatan suhu & kualitas..."></textarea>
          </div>

          <div class="pt-3 border-t flex justify-end space-x-2">
            <button type="button" @click="batchModalOpen = false" class="px-4 py-2 border rounded-xl text-xs font-semibold">Batal</button>
            <button type="submit" class="px-5 py-2 bg-teal-primary text-white rounded-xl text-xs font-bold">Simpan Batch</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Form Aktifkan / Nonaktifkan Produk Modal -->
    <div v-if="statusModalOpen && statusProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 text-sm text-charcoal border border-gray-100">
        <div class="flex justify-between items-center border-b pb-3">
          <div class="flex items-center space-x-2">
            <span class="w-2.5 h-2.5 rounded-full" :class="statusForm.targetActive ? 'bg-emerald-500' : 'bg-rose-500'"></span>
            <h3 class="font-bold text-base text-teal-primary">
              {{ statusForm.targetActive ? 'Form Aktifkan Produk' : 'Form Nonaktifkan Produk' }}
            </h3>
          </div>
          <button @click="statusModalOpen = false" class="text-gray-400 hover:text-gray-600 font-bold text-xl leading-none">×</button>
        </div>

        <!-- Product Preview Info -->
        <div class="p-3.5 bg-warm-bg border border-gray-200 rounded-xl flex items-center space-x-3">
          <img v-if="statusProduct.imageUrl" :src="statusProduct.imageUrl" class="w-12 h-12 object-cover rounded-xl border shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-sm text-charcoal truncate">{{ statusProduct.name }}</h4>
            <p class="text-[10px] text-gray-500 font-mono">{{ statusProduct.sku || 'PAH-SKU' }} &bull; Stok: {{ statusProduct.stock }} pack</p>
            <span class="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full" :class="statusProduct.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'">
              Status saat ini: {{ statusProduct.isActive ? 'Aktif di Toko' : 'Nonaktif' }}
            </span>
          </div>
        </div>

        <form @submit.prevent="handleSaveStatus" class="space-y-4">
          <!-- Status Choice -->
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1.5">Pilih Status Baru</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="statusForm.targetActive = true"
                class="p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all"
                :class="statusForm.targetActive ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
              >
                <span>✅ Aktifkan</span>
                <span class="text-[10px] font-normal text-gray-500">Tampil di katalog pemesanan</span>
              </button>

              <button
                type="button"
                @click="statusForm.targetActive = false"
                class="p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all"
                :class="!statusForm.targetActive ? 'border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-500/20' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
              >
                <span>🚫 Nonaktifkan</span>
                <span class="text-[10px] font-normal text-gray-500">Sembunyikan dari pelanggan</span>
              </button>
            </div>
          </div>

          <!-- Reason Selection -->
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Alasan Perubahan Status</label>
            <select
              v-model="statusForm.reasonPreset"
              class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden mb-2"
            >
              <option value="Stok siap jual kembali tersedia di freezer">Stok siap jual kembali tersedia di freezer</option>
              <option value="Stok habis dan sedang dalam proses masak">Stok habis dan sedang dalam proses masak</option>
              <option value="Bahan baku ikan tenggiri sedang terbatas">Bahan baku ikan tenggiri sedang terbatas</option>
              <option value="Pembaruan resep atau kemasan vakum">Pembaruan resep atau kemasan vakum</option>
              <option value="Lainnya (Tulis catatan khusus)">Lainnya (Tulis catatan khusus)</option>
            </select>

            <textarea
              v-if="statusForm.reasonPreset === 'Lainnya (Tulis catatan khusus)'"
              v-model="statusForm.customReason"
              required
              rows="2"
              placeholder="Tuliskan alasan penonaktifan/pengaktifan produk..."
              class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
            ></textarea>
          </div>

          <!-- Confirmation Note -->
          <div class="p-3 rounded-xl text-xs" :class="statusForm.targetActive ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'">
            <p v-if="statusForm.targetActive">
              ℹ️ Produk akan langsung terlihat dan dapat dipesan oleh pelanggan di halaman formulir pemesanan.
            </p>
            <p v-else>
              ⚠️ Produk yang dinonaktifkan tidak akan muncul pada pilihan pemesanan pelanggan sampai diaktifkan kembali.
            </p>
          </div>

          <div class="pt-2 border-t flex justify-end space-x-2">
            <button
              type="button"
              @click="statusModalOpen = false"
              class="px-4 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-5 py-2.5 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              :class="statusForm.targetActive ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'"
            >
              {{ statusForm.targetActive ? 'Konfirmasi Aktifkan' : 'Konfirmasi Nonaktifkan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product';

definePageMeta({
  layout: 'admin'
});

const { products, getStockStatus, updateStock, updateProduct } = useInventory();
const { batches, movements, addBatch, addMovement } = useProductionBatches();
const { formatRupiah } = useCurrency();

const searchQuery = ref('');
const modalOpen = ref(false);
const batchModalOpen = ref(false);
const statusModalOpen = ref(false);
const selectedProduct = ref<Product | null>(null);
const statusProduct = ref<Product | null>(null);

const statusForm = reactive({
  targetActive: false,
  reasonPreset: 'Stok habis dan sedang dalam proses masak',
  customReason: ''
});

const batchForm = reactive({
  batchCode: `BAT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-C`,
  productOrComponent: 'Paket Pempek Komplit & Cuko',
  outputQuantity: 50,
  unit: 'pack',
  status: 'SCHEDULED' as const,
  notes: 'Persiapan produksi batch baru dengan standar vakum.'
});

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (product.sku && product.sku.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

const totalReadyStock = computed(() =>
  products.value.reduce((acc, p) => acc + p.stock, 0)
);

const freezerUtilization = computed(() => {
  const capacity = 850;
  const current = totalReadyStock.value;
  return Math.min(100, Math.round((current / capacity) * 100));
});

const criticalCount = computed(() =>
  products.value.filter(p => getStockStatus(p) === 'OUT_OF_STOCK' || getStockStatus(p) === 'LOW_STOCK').length
);

const openAddModal = () => {
  selectedProduct.value = null;
  modalOpen.value = true;
};

const openEditModal = (product: Product) => {
  selectedProduct.value = product;
  modalOpen.value = true;
};

const openBatchModal = () => {
  batchModalOpen.value = true;
};

const openStatusModal = (product: Product) => {
  statusProduct.value = product;
  statusForm.targetActive = !product.isActive;
  statusForm.reasonPreset = !product.isActive
    ? 'Stok siap jual kembali tersedia di freezer'
    : 'Stok habis dan sedang dalam proses masak';
  statusForm.customReason = '';
  statusModalOpen.value = true;
};

const handleSaveStatus = () => {
  if (!statusProduct.value) return;

  const reason = statusForm.reasonPreset === 'Lainnya (Tulis catatan khusus)'
    ? statusForm.customReason
    : statusForm.reasonPreset;

  updateProduct(statusProduct.value.id, { isActive: statusForm.targetActive });

  addMovement({
    itemId: statusProduct.value.id,
    itemName: statusProduct.value.name,
    movementType: 'ADJUSTMENT',
    quantity: 0,
    unit: 'status',
    reason: `Perubahan status menjadi ${statusForm.targetActive ? 'Aktif' : 'Nonaktif'}: ${reason}`
  });

  statusModalOpen.value = false;
  statusProduct.value = null;
};

const adjustStock = (product: Product, delta: number) => {
  const newStock = product.stock + delta;
  if (newStock >= 0) {
    updateStock(product.id, newStock);
    addMovement({
      itemId: product.id,
      itemName: product.name,
      movementType: delta > 0 ? 'IN' : 'OUT',
      quantity: Math.abs(delta),
      unit: 'pack',
      reason: delta > 0 ? 'Penyesuaian manual tambah stok' : 'Penyesuaian manual kurangi stok'
    });
  }
};

const opnameStock = () => {
  alert('Opname Stok Freezer selesai. Semua pencatatan SKU disinkronkan dengan data sistem (Mode Simulasi).');
};

const handleSaveBatch = () => {
  addBatch({ ...batchForm });
  batchModalOpen.value = false;
  alert('Batch masak baru berhasil dicatat!');
};
</script>
