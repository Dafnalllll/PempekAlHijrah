<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
    <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden my-8 flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="p-6 bg-teal-primary text-white flex items-center justify-between">
        <div>
          <span class="text-xs text-gold-secondary font-bold uppercase tracking-wider">Detail Pesanan</span>
          <h2 class="text-lg font-bold">{{ order.orderNumber }}</h2>
        </div>
        <button
          @click="$emit('close')"
          class="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body Content -->
      <div class="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-charcoal">
        <!-- Status & Time -->
        <div class="flex flex-wrap items-center justify-between bg-warm-bg p-4 rounded-xl border border-gray-200 gap-4">
          <div>
            <p class="text-xs text-gray-500 font-medium">Waktu Pemesanan</p>
            <p class="font-semibold text-gray-800">{{ order.createdAt }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 font-medium mb-1">Status Saat Ini</p>
            <OrderStatusBadge :status="order.status" />
          </div>
        </div>

        <!-- Customer & Recipient Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 class="font-bold text-charcoal mb-2 text-xs uppercase tracking-wider">Informasi Pemesan</h4>
            <p class="font-semibold">{{ order.customerName }}</p>
            <p class="text-xs text-gray-600 mt-0.5">WhatsApp: {{ order.customerWhatsapp }}</p>
            <p v-if="order.customerEmail" class="text-xs text-gray-600 mt-0.5">Email: {{ order.customerEmail }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 class="font-bold text-charcoal mb-2 text-xs uppercase tracking-wider">Pengiriman & Penerima</h4>
            <p class="font-semibold">{{ order.recipientName }} ({{ order.recipientPhone }})</p>
            <p class="text-xs text-gray-600 mt-0.5">{{ order.shippingAddress }}, {{ order.city }}</p>
            <p class="text-xs font-medium text-emerald-700 mt-1">Metode: {{ order.shippingMethod || 'Standar' }}</p>
          </div>
        </div>

        <!-- Delivery Note -->
        <div v-if="order.deliveryNote" class="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900">
          <span class="font-bold">Catatan Pemesan:</span> {{ order.deliveryNote }}
        </div>

        <!-- Ordered Items Table -->
        <div>
          <h4 class="font-bold text-charcoal mb-3 text-xs uppercase tracking-wider">Ditemukan Item ({{ order.items.length }})</h4>
          <div class="border border-gray-200 rounded-xl overflow-hidden">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-100 text-xs font-bold text-gray-700 border-b border-gray-200">
                  <th class="p-3">Produk</th>
                  <th class="p-3 text-center">Qty</th>
                  <th class="p-3 text-right">Harga Satuan</th>
                  <th class="p-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 text-xs">
                <tr v-for="item in order.items" :key="item.id || item.productId">
                  <td class="p-3 flex items-center space-x-3">
                    <img v-if="item.image" :src="item.image" class="w-10 h-10 object-cover rounded-lg border" />
                    <div>
                      <p class="font-bold text-charcoal">{{ item.name }}</p>
                      <p v-if="item.variantLabel" class="text-[10px] text-gray-500">{{ item.variantLabel }}</p>
                    </div>
                  </td>
                  <td class="p-3 text-center font-semibold">{{ item.quantity }}</td>
                  <td class="p-3 text-right">{{ formatRupiah(item.unitPrice) }}</td>
                  <td class="p-3 text-right font-bold">{{ formatRupiah(item.unitPrice * item.quantity) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Financial Summary -->
        <div class="bg-warm-bg p-4 rounded-xl border border-gray-200 space-y-2">
          <div class="flex justify-between text-xs">
            <span class="text-gray-600">Subtotal Produk</span>
            <span class="font-semibold">{{ formatRupiah(order.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-xs items-center">
            <span class="text-gray-600">Ongkos Kirim</span>
            <span class="font-semibold text-emerald-700">
              {{ order.shippingCost !== null ? formatRupiah(order.shippingCost) : 'Belum ditentukan / Menunggu konfirmasi' }}
            </span>
          </div>
          <div class="flex justify-between text-sm font-bold border-t pt-2 border-gray-200 text-charcoal">
            <span>Total Akhir (Grand Total)</span>
            <span>{{ order.grandTotal !== null ? formatRupiah(order.grandTotal) : 'Sementara (Menunggu ongkir)' }}</span>
          </div>
        </div>

        <!-- Admin Action Form: Update Status & Pricing -->
        <div class="border-t pt-4 space-y-4">
          <h4 class="font-bold text-charcoal text-xs uppercase tracking-wider">Tindakan & Pengaturan Admin</h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Status Update -->
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1">Ubah Status Pesanan</label>
              <select
                v-model="selectedStatus"
                class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
              >
                <option value="WAITING_SELLER_CONFIRMATION">Menunggu Konfirmasi Penjual</option>
                <option value="WAITING_PAYMENT">Menunggu Pembayaran</option>
                <option value="PAYMENT_CONFIRMED">Pembayaran Dikonfirmasi</option>
                <option value="PROCESSING">Sedang Diproses</option>
                <option value="SHIPPED">Dalam Pengiriman</option>
                <option value="COMPLETED">Selesai</option>
                <option value="CANCELLED">Dibatalkan</option>
              </select>
            </div>

            <!-- Shipping Cost Input -->
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1">Set Ongkos Kirim (Rp)</label>
              <input
                type="number"
                v-model.number="inputShippingCost"
                placeholder="Contoh: 15000"
                class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
              />
            </div>
          </div>

          <!-- Tracking Number if Shipped -->
          <div v-if="selectedStatus === 'SHIPPED'">
            <label class="block text-xs font-semibold text-gray-700 mb-1">Nomor Resi / Catatan Kurir</label>
            <input
              type="text"
              v-model="inputTracking"
              placeholder="Contoh: JNE-OK-982137 atau Kurir Instant Pak Budi"
              class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
            />
          </div>

          <button
            @click="handleSave"
            class="w-full py-3 bg-teal-primary hover:bg-teal-primary/90 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Simpan Perubahan Pesanan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order, OrderStatus } from '~/types/order';

const props = defineProps<{
  order: Order;
}>();

const emit = defineEmits(['close', 'updated']);

const { updateOrderStatus, updateOrderPricing, updateTracking } = useOrders();
const { formatRupiah } = useCurrency();

const selectedStatus = ref<OrderStatus>(props.order.status);
const inputShippingCost = ref<number>(props.order.shippingCost !== null ? props.order.shippingCost : 0);
const inputTracking = ref<string>(props.order.trackingNumber || '');

const handleSave = () => {
  updateOrderStatus(props.order.id, selectedStatus.value);
  
  const shipping = inputShippingCost.value >= 0 ? inputShippingCost.value : 0;
  const grand = props.order.subtotal + shipping;
  updateOrderPricing(props.order.id, shipping, grand);

  if (inputTracking.value.trim()) {
    updateTracking(props.order.id, inputTracking.value.trim());
  }

  emit('updated');
  emit('close');
};
</script>
