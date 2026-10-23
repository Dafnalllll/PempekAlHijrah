<template>
  <div class="space-y-6">
    <!-- Panel Operasional Dapur & Pesanan Toko Header -->
    <div class="bg-white rounded-2xl p-6 border border-gray-200/85 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div class="flex items-center space-x-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-xs font-bold text-teal-primary uppercase tracking-wider">Panel Operasional Dapur & Pesanan Toko</span>
        </div>
        <h1 class="text-xl sm:text-2xl font-bold text-teal-primary mt-1">Dashboard Pengelola Pempek Al-Hijrah</h1>
        <p class="text-xs text-gray-500 mt-0.5">Terakhir diperbarui: {{ lastUpdatedText }} &bull; Sistem pemesanan aktif (Mode Simulasi)</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="refreshData"
          :disabled="isRefreshing"
          class="px-4 py-2.5 rounded-xl bg-warm-bg border border-gray-300 hover:bg-gray-100 text-teal-primary font-bold text-xs flex items-center space-x-2 transition-colors"
        >
          <svg :class="['w-4 h-4', isRefreshing ? 'animate-spin' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ isRefreshing ? 'Memperbarui...' : 'Perbarui Data' }}</span>
        </button>
        <NuxtLink
          to="/admin/pesanan"
          class="px-4 py-2.5 rounded-xl bg-teal-primary hover:bg-teal-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
        >
          Kelola Pesanan
        </NuxtLink>
      </div>
    </div>

    <!-- Stat Cards Grid (Stitch Spec v1.1) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Pesanan Hari Ini"
        :value="todayOrdersCount"
        subtext="Total masuk hari ini"
        iconBgClass="bg-teal-100 text-teal-primary"
      >
        <template #icon>🛒</template>
      </StatCard>

      <StatCard
        title="Perlu Tindakan WhatsApp"
        :value="waitingWhatsAppCount"
        subtext="Menunggu ongkir & konfirmasi"
        iconBgClass="bg-amber-100 text-amber-800"
      >
        <template #icon>💬</template>
      </StatCard>

      <StatCard
        title="Omzet Bulan Ini (Demo)"
        :value="formatRupiah(estimatedOmzet)"
        subtext="Akumulasi simulasi"
        iconBgClass="bg-emerald-100 text-emerald-800"
      >
        <template #icon>💰</template>
      </StatCard>

      <StatCard
        title="Stok Frozen Siap Kirim"
        :value="totalReadyStock + ' pack'"
        subtext="Tersedia di freezer"
        iconBgClass="bg-purple-100 text-purple-800"
      >
        <template #icon>❄️</template>
      </StatCard>
    </div>

    <!-- Main Content Layout: Orders List & WhatsApp/Shipping Cost Panel -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left 2 Cols: Orders Summary List -->
      <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-teal-primary text-base">Daftar Pesanan Masuk (Ringkasan)</h3>
          <NuxtLink to="/admin/pesanan" class="text-xs font-semibold text-teal-primary hover:underline">
            Lihat Semua &rarr;
          </NuxtLink>
        </div>

        <div v-if="orders.length === 0" class="text-center py-12 text-gray-500 text-xs">
          Belum ada pesanan masuk.
        </div>

        <div v-else class="overflow-x-auto flex-1">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase">
                <th class="pb-3">No. Pesanan</th>
                <th class="pb-3">Pelanggan</th>
                <th class="pb-3">Subtotal</th>
                <th class="pb-3">Status</th>
                <th class="pb-3 text-right">Pilih untuk Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-xs">
              <tr
                v-for="order in orders"
                :key="order.id"
                @click="selectedOrder = order"
                class="hover:bg-gray-50 cursor-pointer transition-colors"
                :class="selectedOrder?.id === order.id ? 'bg-amber-50/70 font-semibold' : ''"
              >
                <td class="py-3 font-bold text-teal-primary">{{ order.orderNumber }}</td>
                <td class="py-3">
                  <p class="font-semibold text-gray-800">{{ order.customerName }}</p>
                  <p class="text-[10px] text-gray-500">{{ order.city }}</p>
                </td>
                <td class="py-3 font-bold text-gray-900">
                  {{ formatRupiah(order.subtotal) }}
                </td>
                <td class="py-3">
                  <OrderStatusBadge :status="order.status" />
                </td>
                <td class="py-3 text-right">
                  <button
                    @click.stop="selectedOrder = order"
                    class="px-3 py-1.5 rounded-lg bg-teal-primary text-white text-[10px] font-bold hover:bg-teal-primary/90 transition-colors"
                  >
                    Set Ongkir & WA
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right 1 Col: Input Ongkir & Buat WA Konfirmasi Panel -->
      <div class="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col space-y-4">
        <h3 class="font-bold text-teal-primary text-base border-b pb-3">Input Ongkir & Buat WA Konfirmasi</h3>

        <div v-if="!selectedOrder" class="text-center py-16 text-gray-400 text-xs space-y-2">
          <div class="text-2xl">👆</div>
          <p>Pilih salah satu pesanan di tabel sebelah kiri untuk mengatur ongkos kirim dan membuat pesan WhatsApp.</p>
        </div>

        <div v-else class="space-y-4 text-xs">
          <div class="bg-warm-bg p-3.5 rounded-xl border border-gray-200 space-y-1">
            <p class="text-[10px] text-gray-500 font-bold uppercase">Pesanan Terpilih</p>
            <p class="font-bold text-sm text-teal-primary">{{ selectedOrder.orderNumber }}</p>
            <p class="font-semibold text-gray-800">Pemesan: {{ selectedOrder.customerName }} ({{ selectedOrder.customerWhatsapp }})</p>
            <p class="text-gray-600">Alamat: {{ selectedOrder.shippingAddress }}, {{ selectedOrder.city }}</p>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal Produk</span>
              <span class="font-bold">{{ formatRupiah(selectedOrder.subtotal) }}</span>
            </div>

            <div>
              <label class="block font-semibold text-gray-700 mb-1">Masukkan Biaya Ongkir (Rp)</label>
              <input
                type="number"
                v-model.number="inputShipping"
                placeholder="Contoh: 15000"
                class="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
              />
            </div>

            <div class="flex justify-between text-sm font-bold border-t pt-2 border-gray-200 text-teal-primary">
              <span>Total Tagihan Final</span>
              <span>{{ formatRupiah(selectedOrder.subtotal + (inputShipping || 0)) }}</span>
            </div>
          </div>

          <!-- WhatsApp Preview Box -->
          <div class="space-y-1">
            <label class="block font-semibold text-gray-700">Preview Pesan WhatsApp ke Pelanggan</label>
            <textarea
              readonly
              rows="5"
              class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-[11px] text-gray-700 resize-none"
              :value="whatsappMessageText"
            ></textarea>
          </div>

          <div class="space-y-2 pt-2">
            <button
              @click="saveShippingAndPricing"
              class="w-full py-2.5 bg-teal-primary hover:bg-teal-primary/90 text-white font-bold rounded-xl uppercase tracking-wider transition-colors shadow-xs"
            >
              Simpan Ongkir & Perbarui Status
            </button>

            <a
              :href="whatsappShareUrl"
              target="_blank"
              class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-xs"
            >
              <span>📲 Buka WhatsApp & Kirim Pesan</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Dapur & Bank Info Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Dapur Batch Summary -->
      <div class="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-3">
        <h3 class="font-bold text-teal-primary text-sm uppercase tracking-wider">Ringkasan Dapur & Batch Produksi</h3>
        <p class="text-xs text-gray-500">Informasi batch memasak dan pengemasan vakum hari ini.</p>
        <div class="space-y-2 pt-1">
          <div v-for="batch in batches.slice(0, 2)" :key="batch.id" class="p-3 bg-warm-bg border border-gray-200 rounded-xl flex justify-between items-center text-xs">
            <div>
              <p class="font-bold text-teal-primary">{{ batch.batchCode }} - {{ batch.productOrComponent }}</p>
              <p class="text-[10px] text-gray-500">{{ batch.notes }}</p>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
              {{ batch.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Rekening Bank Info -->
      <div class="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-3">
        <h3 class="font-bold text-teal-primary text-sm uppercase tracking-wider">Informasi Rekening Pembayaran Resmi</h3>
        <p class="text-xs text-gray-500">Gunakan rekening resmi berikut untuk tagihan WhatsApp pelanggan.</p>
        <div class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
          <p class="font-bold text-emerald-900">Bank Central Asia (BCA) &bull; 1234567890</p>
          <p class="text-emerald-800 text-[11px]">Atas Nama: Pempek Al-Hijrah Official</p>
          <p class="text-[10px] text-emerald-700 italic pt-1">Harap verifikasi bukti transfer manual sebelum mengubah status ke Pembayaran Dikonfirmasi.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '~/types/order';

definePageMeta({
  layout: 'admin'
});

const { orders, updateOrderPricing, updateOrderStatus } = useOrders();
const { products } = useInventory();
const { batches } = useProductionBatches();
const { formatRupiah } = useCurrency();

const isRefreshing = ref(false);
const lastUpdatedText = ref('Baru saja');
const selectedOrder = ref<Order | null>(null);
const inputShipping = ref<number>(0);

// Set initial selected order if available
const initialOrder = orders.value[0];
if (initialOrder && !selectedOrder.value) {
  selectedOrder.value = initialOrder;
  inputShipping.value = initialOrder.shippingCost || 15000;
}

watch(selectedOrder, (newOrd) => {
  if (newOrd) {
    inputShipping.value = newOrd.shippingCost !== null ? newOrd.shippingCost : 15000;
  }
});

const todayOrdersCount = computed(() => orders.value.length);
const waitingWhatsAppCount = computed(() =>
  orders.value.filter(o => o.status === 'WAITING_SELLER_CONFIRMATION' || o.shippingCost === null).length
);
const estimatedOmzet = computed(() =>
  orders.value.reduce((acc, o) => acc + (o.grandTotal || o.subtotal), 0)
);
const totalReadyStock = computed(() =>
  products.value.reduce((acc, p) => acc + p.stock, 0)
);

const whatsappMessageText = computed(() => {
  if (!selectedOrder.value) return '';
  const o = selectedOrder.value;
  const ship = inputShipping.value || 0;
  const total = o.subtotal + ship;
  return `Halo Kak *${o.customerName}*, Terima kasih telah memesan di *Pempek Al-Hijrah*!\n\nNo. Pesanan: *${o.orderNumber}*\nSubtotal Produk: ${formatRupiah(o.subtotal)}\nOngkir (${o.city}): ${formatRupiah(ship)}\n*Total Tagihan: ${formatRupiah(total)}*\n\nSilakan transfer pembayaran ke Rekening BCA 1234567890 (a.n. Pempek Al-Hijrah) dan kirimkan bukti transfer ke WhatsApp ini ya Kak. Terima kasih! 🙏`;
});

const whatsappShareUrl = computed(() => {
  if (!selectedOrder.value) return '#';
  const phone = selectedOrder.value.customerWhatsapp.replace(/^0/, '62');
  return `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessageText.value)}`;
});

const saveShippingAndPricing = () => {
  if (!selectedOrder.value) return;
  const ship = inputShipping.value >= 0 ? inputShipping.value : 0;
  const grand = selectedOrder.value.subtotal + ship;
  updateOrderPricing(selectedOrder.value.id, ship, grand);
  updateOrderStatus(selectedOrder.value.id, 'WAITING_PAYMENT');
  alert('Ongkos kirim berhasil disimpan dan status pesanan diperbarui menjadi Menunggu Pembayaran.');
};

const refreshData = () => {
  isRefreshing.value = true;
  setTimeout(() => {
    isRefreshing.value = false;
    const now = new Date();
    lastUpdatedText.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;
  }, 800);
};
</script>
