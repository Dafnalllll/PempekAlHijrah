<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrders } from '~/composables/useOrders'
import { useCurrency } from '~/composables/useCurrency'
import AppHeader from '~/components/landing/AppHeader.vue'
import AppFooter from '~/components/landing/AppFooter.vue'
import { ClipboardList, ArrowLeft, Phone, Package, MapPin, User, CheckCircle2, Clock, Truck, ShieldCheck, AlertCircle } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { getOrderById, getStatusLabel, getStatusBadgeClass } = useOrders()
const { formatRupiah } = useCurrency()

const orderId = computed(() => route.params.id as string)
const order = computed(() => getOrderById(orderId.value))

const whatsappNumber = '6281234567891'
const whatsappUrl = computed(() => {
  if (!order.value) return '#'
  const msg = encodeURIComponent(`Halo Pempek Al Hijrah, saya ingin mengkonfirmasi pesanan dengan nomor *${order.value.orderNumber}* atas nama ${order.value.recipientName}.`)
  return `https://wa.me/${whatsappNumber}?text=${msg}`
})

// Timeline steps configuration
const timelineSteps = [
  { key: 'WAITING_SELLER_CONFIRMATION', title: 'Pesanan Diajukan', desc: 'Pesanan telah diterima dan menunggu konfirmasi penjual.' },
  { key: 'WAITING_PAYMENT', title: 'Menunggu Pembayaran', desc: 'Penjual mengonfirmasi ketersediaan & ongkir.' },
  { key: 'PROCESSING', title: 'Sedang Diproses & Dikemas', desc: 'Pempek divakum dan disiapkan dengan ice pack.' },
  { key: 'SHIPPED', title: 'Dalam Pengiriman', desc: 'Pesanan diserahkan ke kurir menuju alamat tujuan.' },
  { key: 'COMPLETED', title: 'Selesai', desc: 'Pesanan telah diterima dengan selamat.' }
]

const currentStepIndex = computed(() => {
  if (!order.value) return 0
  switch (order.value.status) {
    case 'WAITING_SELLER_CONFIRMATION': return 0
    case 'WAITING_PAYMENT':
    case 'PAYMENT_CONFIRMED': return 1
    case 'PROCESSING': return 2
    case 'SHIPPED': return 3
    case 'COMPLETED': return 4
    default: return 0
  }
})

useHead({
  title: order.value ? `Detail Pesanan ${order.value.orderNumber} — Pempek Al Hijrah` : 'Pesanan Tidak Ditemukan — Pempek Al Hijrah'
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-warm-bg text-charcoal">
    <AppHeader />

    <main class="grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-xs font-semibold text-muted mb-8">
        <NuxtLink to="/" class="hover:text-teal-primary transition">Beranda</NuxtLink>
        <span>/</span>
        <NuxtLink to="/pesanan-saya" class="hover:text-teal-primary transition">Pesanan Saya</NuxtLink>
        <span>/</span>
        <span class="text-teal-primary">Detail & Progres</span>
      </nav>

      <!-- Not Found State -->
      <div v-if="!order" class="bg-white rounded-3xl p-12 text-center border border-neutral-border shadow-sm max-w-xl mx-auto my-12">
        <div class="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle class="w-8 h-8" />
        </div>
        <h2 class="font-serif text-2xl font-bold text-teal-primary">Pesanan Tidak Ditemukan</h2>
        <p class="mt-2 text-sm text-muted">
          Pesanan dengan referensi tersebut tidak ditemukan atau telah dihapus dari riwayat simulasi.
        </p>
        <div class="mt-6">
          <NuxtLink
            to="/pesanan-saya"
            class="inline-flex items-center gap-2 bg-teal-primary text-white px-6 py-3 rounded-xl font-semibold text-xs shadow-sm transition"
          >
            <ArrowLeft class="w-4 h-4" />
            <span>Kembali ke Daftar Pesanan</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Order Detail Content -->
      <div v-else class="space-y-8">
        
        <!-- Header Banner & Actions -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-3">
              <span class="font-serif font-bold text-2xl text-teal-primary">{{ order.orderNumber }}</span>
              <span
                class="px-3.5 py-1 rounded-full text-xs font-bold border"
                :class="getStatusBadgeClass(order.status)"
              >
                {{ getStatusLabel(order.status) }}
              </span>
            </div>
            <p class="text-xs text-muted">Dibuat pada {{ order.createdAt }}</p>
          </div>

          <div class="flex items-center gap-3">
            <NuxtLink
              to="/pesanan-saya"
              class="inline-flex items-center gap-2 text-xs font-semibold text-teal-primary bg-white border border-neutral-border px-4 py-3 rounded-xl hover:border-teal-primary transition"
            >
              <ArrowLeft class="w-4 h-4" />
              <span>Semua Pesanan</span>
            </NuxtLink>

            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-wahtsapp hover:bg-whatsapp-hover text-white px-5 py-3 rounded-xl text-xs font-semibold shadow-sm transition"
            >
              <Phone class="w-4 h-4 fill-current" />
              <span>Konfirmasi via WhatsApp</span>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Timeline & Items (7 cols) -->
          <div class="lg:col-span-7 space-y-8">
            
            <!-- Timeline Progres -->
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-border shadow-sm">
              <h3 class="font-serif font-bold text-lg text-teal-primary mb-6 flex items-center gap-2">
                <Clock class="w-5 h-5 text-goal-secondary" />
                <span>Timeline Progres Pesanan</span>
              </h3>

              <div class="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-border">
                <div
                  v-for="(step, idx) in timelineSteps"
                  :key="idx"
                  class="flex items-start gap-4 relative"
                >
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold transition-all shadow-sm"
                    :class="idx <= currentStepIndex ? 'bg-teal-primary text-goal-secondary' : 'bg-neutral-border text-muted'"
                  >
                    <CheckCircle2 v-if="idx < currentStepIndex" class="w-4 h-4" />
                    <span v-else>{{ idx + 1 }}</span>
                  </div>

                  <div>
                    <h4
                      class="font-bold text-sm"
                      :class="idx <= currentStepIndex ? 'text-teal-primary' : 'text-muted'"
                    >
                      {{ step.title }}
                    </h4>
                    <p class="text-xs text-muted mt-0.5">{{ step.desc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Items List -->
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-border shadow-sm">
              <h3 class="font-serif font-bold text-lg text-teal-primary mb-6 flex items-center gap-2">
                <Package class="w-5 h-5 text-goal-secondary" />
                <span>Daftar Produk Pesanan</span>
              </h3>

              <div class="space-y-4 divide-y divide-neutral-border">
                <div v-for="item in order.items" :key="item.id" class="pt-4 first:pt-0 flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-xl object-cover bg-warm-bg border border-neutral-border" />
                    <div>
                      <h4 class="font-serif font-bold text-teal-primary text-sm">{{ item.name }}</h4>
                      <p class="text-xs text-muted mt-0.5">{{ item.quantity }} pcs × {{ formatRupiah(item.unitPrice) }}</p>
                    </div>
                  </div>
                  <span class="font-serif font-bold text-teal-primary text-base">{{ formatRupiah(item.unitPrice * item.quantity) }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Shipping & Cost Summary (5 cols) -->
          <div class="lg:col-span-5 space-y-8">
            
            <!-- Shipping & Recipient Info -->
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-border shadow-sm space-y-5">
              <h3 class="font-serif font-bold text-lg text-teal-primary border-b border-neutral-border pb-4 flex items-center gap-2">
                <Truck class="w-5 h-5 text-goal-secondary" />
                <span>Informasi Pengiriman</span>
              </h3>

              <div class="space-y-4 text-sm">
                <div>
                  <p class="text-xs text-muted uppercase tracking-wider font-semibold">Metode Distribusi</p>
                  <p class="font-medium text-charcoal mt-0.5">{{ order.shippingMethod || 'Pengiriman Standar' }}</p>
                </div>

                <div>
                  <p class="text-xs text-muted uppercase tracking-wider font-semibold">Penerima & Kontak</p>
                  <p class="font-medium text-charcoal mt-0.5">{{ order.recipientName }} ({{ order.recipientPhone }})</p>
                </div>

                <div>
                  <p class="text-xs text-muted uppercase tracking-wider font-semibold">Alamat Tujuan</p>
                  <p class="font-medium text-charcoal mt-0.5 leading-relaxed">{{ order.shippingAddress }}, {{ order.city }}</p>
                </div>

                <div v-if="order.deliveryNote">
                  <p class="text-xs text-muted uppercase tracking-wider font-semibold">Catatan Pesanan</p>
                  <p class="font-medium text-charcoal mt-0.5 italic">"{{ order.deliveryNote }}"</p>
                </div>
              </div>
            </div>

            <!-- Cost Summary -->
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-border shadow-lg">
              <h3 class="font-serif font-bold text-lg text-teal-primary border-b border-neutral-border pb-4">
                Rincian Pembayaran
              </h3>

              <div class="mt-6 space-y-4 text-sm">
                <div class="flex justify-between text-muted">
                  <span>Subtotal Produk</span>
                  <span class="font-semibold text-charcoal">{{ formatRupiah(order.subtotal) }}</span>
                </div>
                <div class="flex justify-between text-muted items-center">
                  <span>Ongkos Kirim</span>
                  <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                    {{ order.shippingCost !== null ? formatRupiah(order.shippingCost) : 'Dikonfirmasi Penjual' }}
                  </span>
                </div>
              </div>

              <div class="mt-6 pt-6 border-t border-neutral-border">
                <div class="flex justify-between items-center">
                  <span class="font-serif font-bold text-teal-primary text-lg">Total Akhir</span>
                  <span class="font-serif font-bold text-2xl text-teal-primary">
                    {{ formatRupiah(order.grandTotal ?? order.subtotal) }}
                  </span>
                </div>
                <p class="text-[11px] text-muted mt-1">
                  * Status ongkir dan total akhir diperbarui setelah dikonfirmasi admin via WhatsApp.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

    <AppFooter />
  </div>
</template>
