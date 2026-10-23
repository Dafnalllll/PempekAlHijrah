<template>
  <div class="space-y-6">
    <!-- Header & Statistics Cards (Stitch v1.1) -->
    <div class="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span class="text-xs font-bold text-gold-secondary uppercase tracking-wider">Modul Pemrosesan Utama</span>
          <h1 class="text-xl sm:text-2xl font-bold text-teal-primary mt-1">Kelola & Pemrosesan Pesanan</h1>
          <p class="text-xs text-gray-500 mt-0.5">Kelola antrean pengiriman, validasi transfer, dan cetak label alamat frozen food.</p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="bulkActionPrint"
            class="px-3.5 py-2 bg-warm-bg border border-gray-300 text-gray-700 font-semibold rounded-xl text-xs hover:bg-gray-100 transition-colors"
          >
            🖨️ Cetak Label Terpilih ({{ selectedOrderIds.length }})
          </button>
          <button
            @click="bulkActionExport"
            class="px-3.5 py-2 bg-teal-primary text-white font-bold rounded-xl text-xs hover:bg-teal-primary/90 transition-colors shadow-xs"
          >
            📊 Export Excel (CSV)
          </button>
        </div>
      </div>

      <!-- Summary Status Bar -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div class="bg-amber-50 border border-amber-200 p-3.5 rounded-xl">
          <p class="text-[10px] font-bold text-amber-800 uppercase">Menunggu Ongkir</p>
          <p class="text-lg font-bold text-amber-900 mt-1">{{ waitingOngkirCount }}</p>
        </div>
        <div class="bg-blue-50 border border-blue-200 p-3.5 rounded-xl">
          <p class="text-[10px] font-bold text-blue-800 uppercase">Perlu Verifikasi</p>
          <p class="text-lg font-bold text-blue-900 mt-1">{{ needVerificationCount }}</p>
        </div>
        <div class="bg-indigo-50 border border-indigo-200 p-3.5 rounded-xl">
          <p class="text-[10px] font-bold text-indigo-800 uppercase">Siap Kemas</p>
          <p class="text-lg font-bold text-indigo-900 mt-1">{{ readyToPackCount }}</p>
        </div>
        <div class="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
          <p class="text-[10px] font-bold text-emerald-800 uppercase">Total Hari Ini</p>
          <p class="text-lg font-bold text-emerald-900 mt-1">{{ orders.length }}</p>
        </div>
      </div>

      <!-- Filters & Search Bar -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
        <div>
          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Cari Pemesan / No. Invoice</label>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari nama atau nomor pesanan..."
            class="w-full p-2.5 bg-warm-bg border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
          />
        </div>

        <div>
          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Filter Status</label>
          <select
            v-model="statusFilter"
            class="w-full p-2.5 bg-warm-bg border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
          >
            <option value="ALL">Semua Status</option>
            <option value="WAITING_SELLER_CONFIRMATION">Menunggu Konfirmasi / Ongkir</option>
            <option value="WAITING_PAYMENT">Menunggu Pembayaran</option>
            <option value="PAYMENT_CONFIRMED">Pembayaran Dikonfirmasi</option>
            <option value="PROCESSING">Sedang Diproses (Dapur)</option>
            <option value="SHIPPED">Dalam Pengiriman</option>
            <option value="COMPLETED">Selesai</option>
            <option value="CANCELLED">Dibatalkan</option>
          </select>
        </div>

        <div>
          <label class="block text-[10px] font-bold text-gray-500 uppercase mb-1">Filter Ekspedisi / Kurir</label>
          <select
            v-model="expeditionFilter"
            class="w-full p-2.5 bg-warm-bg border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
          >
            <option value="ALL">Semua Ekspedisi</option>
            <option value="Paxel">Paxel Cold Chain (Frozen)</option>
            <option value="GoSend">GoSend / Grab Instant</option>
            <option value="JNE">JNE YES / Regular</option>
            <option value="Kurir Dapur">Kurir Dapur Hijrah</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Orders Table with Checkboxes -->
    <div class="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
      <div v-if="filteredOrders.length === 0" class="text-center py-16 px-4 space-y-3">
        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-xl text-gray-400">
          🔍
        </div>
        <p class="text-sm font-bold text-gray-700">Tidak ada pesanan yang sesuai dengan filter.</p>
        <button
          @click="resetFilters"
          class="px-4 py-2 bg-teal-primary text-white text-xs font-bold rounded-xl hover:bg-teal-primary/90 transition-colors"
        >
          Reset Filter
        </button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
              <th class="p-4 w-10 text-center">
                <input
                  type="checkbox"
                  @change="toggleSelectAll"
                  :checked="isAllSelected"
                  class="w-4 h-4 text-teal-primary rounded border-gray-300 focus:ring-teal-primary"
                />
              </th>
              <th class="p-4">No. Invoice & Waktu</th>
              <th class="p-4">Pelanggan & Kontak</th>
              <th class="p-4">Item & Pengiriman</th>
              <th class="p-4 text-right">Total Bayar</th>
              <th class="p-4">Status</th>
              <th class="p-4 text-center">Aksi Cepat</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 text-xs">
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              class="hover:bg-gray-50 transition-colors"
              :class="selectedOrderIds.includes(order.id) ? 'bg-amber-50/50' : ''"
            >
              <td class="p-4 text-center">
                <input
                  type="checkbox"
                  v-model="selectedOrderIds"
                  :value="order.id"
                  class="w-4 h-4 text-teal-primary rounded border-gray-300 focus:ring-teal-primary"
                />
              </td>
              <td class="p-4">
                <p class="font-bold text-teal-primary text-sm">{{ order.orderNumber }}</p>
                <p class="text-[11px] text-gray-500 mt-0.5">{{ order.createdAt }}</p>
              </td>
              <td class="p-4">
                <p class="font-bold text-gray-900">{{ order.customerName }}</p>
                <p class="text-[11px] text-gray-600">WA: {{ order.customerWhatsapp }}</p>
                <p class="text-[10px] text-gray-500 mt-0.5">KOTA: {{ order.city }}</p>
              </td>
              <td class="p-4">
                <p class="font-semibold text-gray-800">{{ order.items.length }} jenis produk frozen</p>
                <p class="text-[11px] text-emerald-700 font-medium truncate max-w-xs">{{ order.shippingMethod || 'Pengiriman Standar' }}</p>
              </td>
              <td class="p-4 text-right">
                <p class="font-bold text-gray-900">
                  {{ order.grandTotal !== null ? formatRupiah(order.grandTotal) : formatRupiah(order.subtotal) + ' (±)' }}
                </p>
                <p v-if="order.shippingCost === null" class="text-[10px] text-amber-600 font-medium">Ongkir belum ditentukan</p>
              </td>
              <td class="p-4">
                <OrderStatusBadge :status="order.status" />
              </td>
              <td class="p-4 text-center">
                <button
                  @click="openDetail(order)"
                  class="px-3.5 py-2 bg-teal-primary hover:bg-teal-primary/90 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  Detail & Proses
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <OrderDetailModal
      v-if="activeOrder"
      :order="activeOrder"
      @close="activeOrder = null"
      @updated="activeOrder = null"
    />
  </div>
</template>

<script setup lang="ts">
import type { Order } from '~/types/order';

definePageMeta({
  layout: 'admin'
});

const { orders } = useOrders();
const { formatRupiah } = useCurrency();

const searchQuery = ref('');
const statusFilter = ref<string>('ALL');
const expeditionFilter = ref<string>('ALL');
const activeOrder = ref<Order | null>(null);
const selectedOrderIds = ref<string[]>([]);

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.recipientName.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      statusFilter.value === 'ALL' || order.status === statusFilter.value;

    const matchesExpedition =
      expeditionFilter.value === 'ALL' ||
      (order.shippingMethod && order.shippingMethod.toLowerCase().includes(expeditionFilter.value.toLowerCase()));

    return matchesSearch && matchesStatus && matchesExpedition;
  });
});

const waitingOngkirCount = computed(() =>
  orders.value.filter(o => o.shippingCost === null || o.status === 'WAITING_SELLER_CONFIRMATION').length
);

const needVerificationCount = computed(() =>
  orders.value.filter(o => o.status === 'WAITING_PAYMENT').length
);

const readyToPackCount = computed(() =>
  orders.value.filter(o => o.status === 'PAYMENT_CONFIRMED' || o.status === 'PROCESSING').length
);

const isAllSelected = computed(() => {
  return filteredOrders.value.length > 0 && selectedOrderIds.value.length === filteredOrders.value.length;
});

const toggleSelectAll = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    selectedOrderIds.value = filteredOrders.value.map(o => o.id);
  } else {
    selectedOrderIds.value = [];
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  statusFilter.value = 'ALL';
  expeditionFilter.value = 'ALL';
};

const openDetail = (order: Order) => {
  activeOrder.value = order;
};

const bulkActionPrint = () => {
  if (selectedOrderIds.value.length === 0) {
    alert('Pilih minimal satu pesanan untuk mencetak label alamat.');
    return;
  }
  alert(`Mencetak label alamat untuk ${selectedOrderIds.value.length} pesanan terpilih (Mode Simulasi Thermal).`);
};

const bulkActionExport = () => {
  alert('Data pesanan berhasil diexport ke format CSV / Excel (Simulasi).');
};
</script>
