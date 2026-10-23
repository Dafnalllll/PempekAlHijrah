<script setup lang="ts">
import { useOrders } from '~/composables/useOrders'
import { useCurrency } from '~/composables/useCurrency'
import AppHeader from '~/components/landing/AppHeader.vue'
import AppFooter from '~/components/landing/AppFooter.vue'
import { ClipboardList, ArrowRight, Package, Calendar, ChevronRight, ShoppingBag } from 'lucide-vue-next'

const { orders, getStatusLabel, getStatusBadgeClass } = useOrders()
const { formatRupiah } = useCurrency()

useHead({
  title: 'Pesanan Saya — Pempek Al Hijrah',
  meta: [
    { name: 'description', content: 'Daftar riwayat dan progres pesanan pempek frozen Al Hijrah Anda.' }
  ]
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
        <span class="text-teal-primary">Pesanan Saya</span>
      </nav>

      <!-- Page Title -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="font-serif text-3xl sm:text-4xl font-bold text-teal-primary">Pesanan Saya</h1>
          <p class="mt-1 text-sm text-muted">
            Daftar pesanan pempek frozen yang telah Anda ajukan beserta status progresnya.
          </p>
        </div>

        <NuxtLink
          to="/#katalog"
          class="inline-flex items-center gap-2 bg-teal-primary hover:bg-teal-light text-white px-5 py-3 rounded-xl text-xs font-semibold shadow-sm transition"
        >
          <ShoppingBag class="w-4 h-4 text-gold-secondary" />
          <span>Belanja Lagi</span>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-if="orders.length === 0" class="bg-white rounded-3xl p-12 text-center border border-neutral-border shadow-sm max-w-2xl mx-auto my-12">
        <div class="w-20 h-20 rounded-3xl bg-warm-bg text-teal-primary flex items-center justify-center mx-auto mb-6 shadow-sm border border-neutral-border">
          <ClipboardList class="w-10 h-10 text-gold-secondary" />
        </div>
        <h2 class="font-serif text-2xl font-bold text-teal-primary">Belum Ada Pesanan</h2>
        <p class="mt-3 text-sm text-muted max-w-md mx-auto">
          Anda belum pernah mengajukan pesanan. Silakan pilih paket pempek favorit Anda di katalog.
        </p>
        <div class="mt-8">
          <NuxtLink
            to="/#katalog"
            class="inline-flex items-center gap-2 bg-teal-primary hover:bg-teal-light text-white px-8 py-3.5 rounded-xl font-semibold shadow-md transition"
          >
            <span>Jelajahi Katalog Paket</span>
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-border shadow-sm hover:shadow-md transition duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <!-- Left: Meta & Items -->
          <div class="space-y-3">
            <div class="flex flex-wrap items-center gap-3">
              <span class="font-serif font-bold text-lg text-teal-primary">{{ order.orderNumber }}</span>
              <span
                class="px-3 py-1 rounded-full text-xs font-bold border"
                :class="getStatusBadgeClass(order.status)"
              >
                {{ getStatusLabel(order.status) }}
              </span>
            </div>

            <div class="flex items-center gap-2 text-xs text-muted">
              <Calendar class="w-4 h-4 text-goal-secondary" />
              <span>Dibuat pada {{ order.createdAt }}</span>
            </div>

            <!-- Items mini preview -->
            <div class="flex items-center gap-2 pt-2">
              <Package class="w-4 h-4 text-teal-primary" />
              <span class="text-xs font-medium text-charcoal">
                {{ order.items.map(i => `${i.quantity}x ${i.name}`).join(', ') }}
              </span>
            </div>
          </div>

          <!-- Right: Total & Action -->
          <div class="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-border">
            <div class="text-left md:text-right">
              <p class="text-xs text-muted">Estimasi Total</p>
              <p class="font-serif font-bold text-xl text-teal-primary">
                {{ formatRupiah(order.grandTotal ?? order.subtotal) }}
              </p>
              <p v-if="order.shippingCost === null" class="text-[10px] text-amber-700 font-medium">
                * Belum termasuk ongkir
              </p>
            </div>

            <NuxtLink
              :to="`/pesanan-saya/${order.id}`"
              class="inline-flex items-center gap-2 bg-teal-primary hover:bg-teal-light text-white px-6 py-3 rounded-xl text-xs font-semibold shadow-sm transition"
            >
              <span>Lihat Detail & Progres</span>
              <ChevronRight class="w-4 h-4" />
            </NuxtLink>
          </div>

        </div>
      </div>

    </main>

    <AppFooter />
  </div>
</template>
