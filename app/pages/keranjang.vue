<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '~/composables/useCart'
import { useCurrency } from '~/composables/useCurrency'
import AppHeader from '~/components/landing/AppHeader.vue'
import AppFooter from '~/components/landing/AppFooter.vue'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, HelpCircle } from 'lucide-vue-next'

const { cartItems, updateQuantity, removeItem, clearCart, totalItemsCount, subtotalPrice } = useCart()
const { formatRupiah } = useCurrency()

const showClearModal = ref(false)

const confirmClearCart = () => {
  clearCart()
  showClearModal.value = false
}

useHead({
  title: 'Keranjang Belanja — Pempek Al Hijrah',
  meta: [
    { name: 'description', content: 'Tinjau kembali pilihan paket pempek frozen Anda sebelum melanjutkan ke formulir pemesanan.' }
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
        <span class="text-teal-primary">Keranjang Belanja</span>
      </nav>

      <!-- Page Title -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="font-serif text-3xl sm:text-4xl font-bold text-teal-primary">Keranjang Belanja Anda</h1>
          <p class="mt-1 text-sm text-muted">
            {{ totalItemsCount > 0 ? `Anda memiliki ${totalItemsCount} item dalam keranjang.` : 'Keranjang Anda saat ini kosong.' }}
          </p>
        </div>

        <div v-if="cartItems.length > 0" class="flex items-center gap-3">
          <NuxtLink
            to="/#katalog"
            class="inline-flex items-center gap-2 text-xs font-semibold text-teal-primary bg-white border border-gray-300 px-4 py-2.5 rounded-xl hover:border-teal-primary transition shadow-sm"
          >
            <ArrowLeft class="w-4 h-4" />
            <span>Tambah Produk Lain</span>
          </NuxtLink>
          <button
            @click="showClearModal = true"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-xl hover:bg-rose-100 transition"
          >
            <Trash2 class="w-4 h-4" />
            <span>Kosongkan</span>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="cartItems.length === 0" class="bg-white rounded-3xl p-12 text-center border border-neutral-border shadow-sm max-w-2xl mx-auto my-12">
        <div class="w-20 h-20 rounded-3xl bg-warm-bg text-teal-primary flex items-center justify-center mx-auto mb-6 shadow-sm border border-neutral-border">
          <ShoppingBag class="w-10 h-10 text-amber-500" />
        </div>
        <h2 class="font-serif text-2xl font-bold text-teal-primary">Keranjang Belanja Kosong</h2>
        <p class="mt-3 text-sm text-muted max-w-md mx-auto">
          Belum ada produk yang ditambahkan ke keranjang. Mari pilih paket pempek frozen lezat kami untuk keluarga tercinta di rumah.
        </p>
        <div class="mt-8">
          <NuxtLink
            to="/#katalog"
            class="inline-flex items-center gap-2 bg-teal-primary hover:bg-teal-primary/90 text-white px-8 py-3.5 rounded-xl font-semibold shadow-md transition"
          >
            <span>Jelajahi Katalog Paket</span>
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>

      <!-- Cart Content Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Cart Items List (Left 7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-border shadow-sm flex flex-col sm:flex-row items-center gap-4 transition hover:shadow-md"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-neutral-border shrink-0 bg-warm-bg"
            />
            
            <div class="grow text-center sm:text-left">
              <span class="inline-block bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1">
                {{ item.variantLabel || 'Paket Frozen' }}
              </span>
              <h3 class="font-serif font-bold text-teal-primary text-lg">{{ item.name }}</h3>
              <p class="text-xs text-muted mt-0.5">Harga satuan: {{ formatRupiah(item.unitPrice) }}</p>

              <!-- Price & Quantity Controls on Mobile/Desktop -->
              <div class="mt-4 flex flex-wrap items-center justify-between sm:justify-start gap-4">
                <div class="flex items-center border border-neutral-border rounded-xl overflow-hidden bg-neutral-border">
                  <button
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    aria-label="Kurangi kuantitas"
                    class="p-2 text-teal-primary hover:bg-neutral-border transition"
                  >
                    <Minus class="w-4 h-4" />
                  </button>
                  <span class="px-4 font-bold text-sm text-teal-primary">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    aria-label="Tambah kuantitas"
                    class="p-2 text-teal-primary hover:bg-neutral-border transition"
                  >
                    <Plus class="w-4 h-4" />
                  </button>
                </div>

                <button
                  @click="removeItem(item.id)"
                  class="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 transition p-2"
                >
                  <Trash2 class="w-4 h-4" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>

            <!-- Item Subtotal -->
            <div class="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-border w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
              <span class="text-xs text-muted sm:hidden">Subtotal Item:</span>
              <span class="font-serif font-bold text-teal-primary text-lg sm:text-xl">
                {{ formatRupiah(item.unitPrice * item.quantity) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Summary Panel (Right 5 cols) -->
        <div class="lg:col-span-5 sticky top-28">
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-border shadow-lg">
            <h3 class="font-serif font-bold text-teal-primary text-xl border-b border-neutral-border pb-4">
              Ringkasan Belanja
            </h3>

            <div class="mt-6 space-y-4 text-sm">
              <div class="flex justify-between text-muted">
                <span>Total Item</span>
                <span class="font-semibold text-charcoal">{{ totalItemsCount }} pcs</span>
              </div>
              <div class="flex justify-between text-muted">
                <span>Subtotal Produk</span>
                <span class="font-semibold text-charcoal">{{ formatRupiah(subtotalPrice) }}</span>
              </div>
              <div class="flex justify-between text-muted items-center">
                <span>Ongkos Kirim</span>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                  Dikonfirmasi Penjual
                </span>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-neutral-border">
              <div class="flex justify-between items-center">
                <span class="font-serif font-bold text-teal-primary text-lg">Estimasi Total</span>
                <span class="font-serif font-bold text-2xl text-teal-primary">{{ formatRupiah(subtotalPrice) }}</span>
              </div>
              <p class="text-[11px] text-muted mt-1">
                * Belum termasuk ongkos kirim. Ongkir akan dihitung dan dikonfirmasi oleh admin saat Anda mengajukan pesanan.
              </p>
            </div>

            <div class="mt-8">
              <NuxtLink
                to="/formulir-pemesanan"
                class="flex items-center justify-center gap-2 w-full bg-teal-primary hover:bg-teal-light text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
              >
                <span>Lanjut ke Formulir Pemesanan</span>
                <ArrowRight class="w-5 h-5" />
              </NuxtLink>
            </div>

            <div class="mt-6 pt-6 border-t border-neutral-border space-y-3">
              <div class="flex items-center gap-3 text-xs text-muted">
                <ShieldCheck class="w-5 h-5 text-whatsapp shrink-0" />
                <span>Pengemasan Vacuum Frozen higienis dan aman luar kota.</span>
              </div>
              <div class="flex items-center gap-3 text-xs text-muted">
                <HelpCircle class="w-5 h-5 text-goal-secondary shrink-0" />
                <span>Butuh bantuan? Admin siap membantu via WhatsApp.</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </main>

    <!-- Clear Cart Confirmation Modal -->
    <div v-if="showClearModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-border text-center">
        <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <Trash2 class="w-7 h-7" />
        </div>
        <h3 class="font-serif font-bold text-xl text-teal-primary">Kosongkan Keranjang?</h3>
        <p class="mt-2 text-sm text-muted">
          Semua item dalam keranjang belanja Anda akan dihapus. Tindakan ini tidak dapat dibatalkan.
        </p>
        <div class="mt-6 flex gap-3">
          <button
            @click="showClearModal = false"
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-charcoal py-3 rounded-xl font-semibold transition text-sm"
          >
            Batal
          </button>
          <button
            @click="confirmClearCart"
            class="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold transition text-sm shadow-md"
          >
            Ya, Kosongkan
          </button>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
