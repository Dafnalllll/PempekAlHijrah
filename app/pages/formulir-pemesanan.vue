<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useCart } from '~/composables/useCart'
import { useOrders } from '~/composables/useOrders'
import { useCurrency } from '~/composables/useCurrency'
import AppHeader from '~/components/landing/AppHeader.vue'
import AppFooter from '~/components/landing/AppFooter.vue'
import { ShoppingBag, ArrowLeft, Send, CheckCircle2, AlertCircle, Truck, User, MapPin, Phone, Mail } from 'lucide-vue-next'

const router = useRouter()
const { cartItems, subtotalPrice, clearCart } = useCart()
const { createOrder } = useOrders()
const { formatRupiah } = useCurrency()

// Redirect if cart is empty
if (import.meta.client && cartItems.value.length === 0) {
  router.push('/keranjang')
}

const form = reactive({
  fullName: '',
  whatsapp: '',
  email: '',
  recipientSameAsCustomer: true,
  recipientName: '',
  recipientPhone: '',
  shippingMethod: 'Pengiriman Lokal (Instant / Same Day)',
  address: '',
  city: '',
  postalCode: '',
  deliveryNote: ''
})

const errors = reactive({
  fullName: '',
  whatsapp: '',
  email: '',
  address: '',
  city: ''
})

const isSubmitting = ref(false)
const errorMessage = ref('')

const validateForm = (): boolean => {
  let isValid = true
  errors.fullName = ''
  errors.whatsapp = ''
  errors.email = ''
  errors.address = ''
  errors.city = ''
  errorMessage.value = ''

  if (!form.fullName.trim()) {
    errors.fullName = 'Nama lengkap wajib diisi.'
    isValid = false
  }

  if (!form.whatsapp.trim()) {
    errors.whatsapp = 'Nomor WhatsApp wajib diisi.'
    isValid = false
  } else if (!/^(\+62|62|0)[0-9]{9,13}$/.test(form.whatsapp.replace(/[\s-]/g, ''))) {
    errors.whatsapp = 'Format nomor WhatsApp tidak valid (contoh: 081234567890).'
    isValid = false
  }

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format email tidak valid.'
    isValid = false
  }

  if (!form.address.trim()) {
    errors.address = 'Alamat lengkap wajib diisi.'
    isValid = false
  }

  if (!form.city.trim()) {
    errors.city = 'Kota/wilayah tujuan wajib diisi.'
    isValid = false
  }

  if (!isValid) {
    errorMessage.value = 'Mohon periksa kembali kolom yang bertanda merah di bawah.'
  }

  return isValid
}

const handleSubmitOrder = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  // Simulate network request delay
  await new Promise(resolve => setTimeout(resolve, 1200))

  try {
    const newOrder = createOrder(form, [...cartItems.value], subtotalPrice.value)
    clearCart()
    router.push(`/pesanan-saya/${newOrder.id}`)
  } catch {
    errorMessage.value = 'Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.'
    isSubmitting.value = false
  }
}

useHead({
  title: 'Formulir Pemesanan — Pempek Al Hijrah',
  meta: [
    { name: 'description', content: 'Lengkapi data diri dan alamat pengiriman untuk mengajukan pesanan pempek frozen Al Hijrah.' }
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
        <NuxtLink to="/keranjang" class="hover:text-teal-primary transition">Keranjang</NuxtLink>
        <span>/</span>
        <span class="text-primary">Formulir Pemesanan</span>
      </nav>

      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="font-serif text-3xl sm:text-4xl font-bold text-teal-primary">Formulir Data & Pengiriman</h1>
        <p class="mt-1 text-sm text-muted">
          Lengkapi informasi penerima dan metode pengiriman untuk melanjutkan pengajuan pesanan Anda.
        </p>
      </div>

      <!-- General Error Alert -->
      <div v-if="errorMessage" class="mb-8 bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 text-rose-800 text-sm">
        <AlertCircle class="w-5 h-5 shrink-0 text-rose-600" />
        <span>{{ errorMessage }}</span>
      </div>

      <form @submit.prevent="handleSubmitOrder" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left Column: Inputs (7 cols) -->
        <div class="lg:col-span-7 space-y-8">
          
          <!-- Section 1: Customer Data -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-border shadow-sm">
            <div class="flex items-center gap-3 pb-4 border-b border-neutral-border">
              <div class="w-10 h-10 rounded-xl bg-teal-primary text-gold-secondary flex items-center justify-center font-bold">
                <User class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-serif font-bold text-lg text-teal-primary">1. Data Pemesan</h3>
                <p class="text-xs text-muted">Informasi kontak untuk konfirmasi pesanan</p>
              </div>
            </div>

            <div class="mt-6 space-y-5">
              <div>
                <label class="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                  Nama Lengkap <span class="text-rose-600">*</span>
                </label>
                <input
                  v-model="form.fullName"
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  class="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-primary bg-warm-bg transition"
                  :class="errors.fullName ? 'border-rose-500' : 'border-neutral-border'"
                />
                <p v-if="errors.fullName" class="mt-1 text-xs text-rose-600">{{ errors.fullName }}</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    Nomor WhatsApp <span class="text-rose-600">*</span>
                  </label>
                  <input
                    v-model="form.whatsapp"
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    class="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-primary bg-warm-bg transition"
                    :class="errors.whatsapp ? 'border-rose-500' : 'border-neutral-border'"
                  />
                  <p v-if="errors.whatsapp" class="mt-1 text-xs text-rose-600">{{ errors.whatsapp }}</p>
                </div>

                <div>
                  <label class="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    Email <span class="text-gray-400 font-normal">(Opsional)</span>
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="Contoh: budi@gmail.com"
                    class="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-primary bg-warm-bg transition"
                    :class="errors.email ? 'border-rose-500' : 'border-neutral-border'"
                  />
                  <p v-if="errors.email" class="mt-1 text-xs text-rose-600">{{ errors.email }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 2: Shipping & Recipient Data -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-border shadow-sm">
            <div class="flex items-center gap-3 pb-4 border-b border-neutral-border">
              <div class="w-10 h-10 rounded-xl bg-teal-primary text-gold-secondary flex items-center justify-center font-bold">
                <Truck class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-serif font-bold text-lg text-teal-primary">2. Informasi Pengiriman & Penerima</h3>
                <p class="text-xs text-muted">Metode pengiriman dan alamat tujuan paket</p>
              </div>
            </div>

            <div class="mt-6 space-y-6">
              <!-- Shipping Method Selection -->
              <div>
                <label class="block text-xs font-bold text-charcoal uppercase tracking-wider mb-3">
                  Pilih Metode Pengiriman <span class="text-rose-600">*</span>
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    class="border rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition bg-warm-bg"
                    :class="form.shippingMethod.includes('Lokal') ? 'border-teal-primary bg-white ring-2 ring-teal-primary/20' : 'border-neutral-border'"
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="Pengiriman Lokal (Instant / Same Day)"
                      v-model="form.shippingMethod"
                      class="mt-1 text-teal-primary"
                    />
                    <div>
                      <span class="block font-bold text-sm text-teal-primary">Pengiriman Lokal</span>
                      <span class="block text-xs text-muted mt-0.5">GoSend / GrabExpress (Instant/Same Day)</span>
                    </div>
                  </label>

                  <label
                    class="border rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition bg-warm-bg"
                    :class="form.shippingMethod.includes('Luar Kota') ? 'border-teal-primary bg-white ring-2 ring-teal-primary/20' : 'border-neutral-border'"
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="Pengiriman Luar Kota (Reguler / Next Day)"
                      v-model="form.shippingMethod"
                      class="mt-1 text-teal-primary"
                    />
                    <div>
                      <span class="block font-bold text-sm text-teal-primary">Pengiriman Luar Kota</span>
                      <span class="block text-xs text-muted mt-0.5">Vacuum Frozen + Ice Pack (Next Day)</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Recipient toggle -->
              <div class="pt-2">
                <label class="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    v-model="form.recipientSameAsCustomer"
                    class="w-4 h-4 rounded text-teal-primary focus:ring-teal-primary"
                  />
                  <span class="text-sm font-medium text-charcoal">Data penerima sama dengan pemesan</span>
                </label>
              </div>

              <!-- Conditional recipient fields if different -->
              <div v-if="!form.recipientSameAsCustomer" class="p-4 rounded-2xl bg-warm-bg border border-neutral-border space-y-4">
                <p class="text-xs font-bold text-teal-primary uppercase tracking-wider">Informasi Penerima Berbeda</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-muted mb-1">Nama Penerima</label>
                    <input
                      v-model="form.recipientName"
                      type="text"
                      placeholder="Nama penerima paket"
                      class="w-full rounded-xl border border-neutral-border px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-muted mb-1">No HP Penerima</label>
                    <input
                      v-model="form.recipientPhone"
                      type="tel"
                      placeholder="No HP penerima"
                      class="w-full rounded-xl border border-neutral-border px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-primary"
                    />
                  </div>
                </div>
              </div>

              <!-- Address & City -->
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-teal-primary uppercase tracking-wider mb-2">
                    Alamat Lengkap & Patokan <span class="text-rose-600">*</span>
                  </label>
                  <textarea
                    v-model="form.address"
                    rows="3"
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, dan patokan terdekat"
                    class="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-primary bg-warm-bg transition"
                    :class="errors.address ? 'border-rose-500' : 'border-neutral-border'"
                  ></textarea>
                  <p v-if="errors.address" class="mt-1 text-xs text-rose-600">{{ errors.address }}</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-xs font-bold text-teal-primary uppercase tracking-wider mb-2">
                      Kota / Wilayah Tujuan <span class="text-rose-600">*</span>
                    </label>
                    <input
                      v-model="form.city"
                      type="text"
                      placeholder="Contoh: Jakarta Selatan / Palembang"
                      class="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-primary bg-warm-bg transition"
                      :class="errors.city ? 'border-rose-500' : 'border-neutral-border'"
                    />
                    <p v-if="errors.city" class="mt-1 text-xs text-rose-600">{{ errors.city }}</p>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-teal-primary uppercase tracking-wider mb-2">
                      Kode Pos <span class="text-gray-400 font-normal">(Opsional)</span>
                    </label>
                    <input
                      v-model="form.postalCode"
                      type="text"
                      placeholder="Contoh: 30128"
                      class="w-full rounded-xl border border-neutral-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-primary bg-warm-bg transition"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-teal-primary uppercase tracking-wider mb-2">
                    Catatan untuk Penjual <span class="text-gray-400 font-normal">(Opsional)</span>
                  </label>
                  <input
                    v-model="form.deliveryNote"
                    type="text"
                    placeholder="Contoh: Harap dipisah cukunya menjadi 2 botol"
                    class="w-full rounded-xl border border-neutral-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-primary bg-warm-bg transition"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Right Column: Order Summary & Submit (5 cols) -->
        <div class="lg:col-span-5 sticky top-28 space-y-6">
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-border shadow-lg">
            <h3 class="font-serif font-bold text-teal-primary text-xl border-b border-neutral-border pb-4 flex items-center justify-between">
              <span>Ringkasan Pesanan</span>
              <NuxtLink to="/keranjang" class="text-xs font-sans font-semibold text-gold-secondary hover:underline">
                Ubah Keranjang
              </NuxtLink>
            </h3>

            <!-- Items mini list -->
            <div class="mt-6 space-y-3 max-h-60 overflow-y-auto pr-1">
              <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between gap-3 text-sm">
                <div class="flex items-center gap-3">
                  <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-lg object-cover bg-warm-bg" />
                  <div>
                    <p class="font-semibold text-teal-primary text-xs line-clamp-1">{{ item.name }}</p>
                    <p class="text-[11px] text-muted">{{ item.quantity }}x {{ formatRupiah(item.unitPrice) }}</p>
                  </div>
                </div>
                <span class="font-bold text-xs text-teal-primary shrink-0">{{ formatRupiah(item.unitPrice * item.quantity) }}</span>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-neutral-border space-y-3 text-sm">
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
                * Ongkir dan total final akan diinformasikan oleh admin via WhatsApp setelah pesanan diajukan.
              </p>
            </div>

            <div class="mt-8">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex items-center justify-center gap-2 w-full bg-teal-primary hover:bg-teal-light disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div v-if="isSubmitting" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <Send v-else class="w-5 h-5" />
                <span>{{ isSubmitting ? 'Memproses Pesanan...' : 'Buat Pesanan Sekarang' }}</span>
              </button>
            </div>

            <div class="mt-6 p-4 rounded-2xl bg-warm-bg border border-neutral-border text-xs text-muted space-y-2">
              <div class="flex items-start gap-2">
                <CheckCircle2 class="w-4 h-4 text-whatsapp shrink-0 mt-0.5" />
                <span>Pengajuan pesanan belum berarti pembayaran selesai; konfirmasi dilakukan via WhatsApp.</span>
              </div>
            </div>

          </div>
        </div>

      </form>
    </main>

    <AppFooter />
  </div>
</template>
