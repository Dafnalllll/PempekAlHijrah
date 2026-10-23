<script setup lang="ts">
import { Truck, MapPin, PackageCheck, ShieldAlert } from 'lucide-vue-next'

const shippingMethods = [
  {
    icon: Truck,
    title: 'Pengiriman Lokal (Instant / Same Day)',
    description: 'Cocok untuk pemesanan dalam kota. Menggunakan layanan ojek online (GoSend / GrabExpress) agar pempek tiba dengan cepat dan segar di hari yang sama.'
  },
  {
    icon: PackageCheck,
    title: 'Pengiriman Luar Kota (Reguler / Next Day)',
    description: 'Aman dikirim ke berbagai kota di Indonesia. Pempek dikemas dalam kemasan vakum kedap udara dan dibungkus khusus dengan ice pack agar tahan selama perjalanan 1-3 hari.'
  }
]
</script>

<template>
  <section id="pengiriman" class="py-20 lg:py-28 bg-warm-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-teal-primary/10 text-teal-primary">
          Informasi Pengiriman
        </span>
        <h2 class="mt-4 font-serif text-3xl sm:text-4xl font-bold text-teal-primary tracking-tight">
          Pengiriman Aman & Tiba dengan Segar
        </h2>
        <p class="mt-4 text-base sm:text-lg text-muted">
          Kami memastikan setiap paket frozen food dikemas dengan standar keamanan tinggi agar kualitas rasa tetap terjaga sampai di tujuan.
        </p>
      </div>

      <!-- Shipping Methods Grid -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(method, index) in shippingMethods"
          :key="index"
          class="bg-white rounded-3xl p-8 border border-neutral-border shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="w-14 h-14 rounded-2xl bg-teal-primary text-gold-secondary flex items-center justify-center shadow-md">
              <component :is="method.icon" class="w-7 h-7" />
            </div>
            <h3 class="mt-6 font-serif text-2xl font-bold text-teal-primary">
              {{ method.title }}
            </h3>
            <p class="mt-3 text-sm sm:text-base text-muted leading-relaxed">
              {{ method.description }}
            </p>
          </div>

          <div class="mt-8 pt-5 border-t border-neutral-border flex items-center gap-2 text-xs font-semibold text-teal-primary">
            <MapPin class="w-4 h-4 text-gold-secondary" />
            <span>Cakupan Layanan Luas</span>
          </div>
        </div>
      </div>

      <!-- Note box -->
      <div class="mt-12 bg-white rounded-2xl p-6 border border-neutral-border flex items-start gap-4 max-w-4xl mx-auto">
        <div class="w-10 h-10 rounded-xl bg-gold-secondary/20 text-teal-primary flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert class="w-5 h-5 text-teal-primary" />
        </div>
        <div>
          <h4 class="font-bold text-teal-primary text-base">Catatan Penting Pengiriman Frozen Food</h4>
          <p class="mt-1 text-sm text-muted leading-relaxed">
            Untuk pengiriman luar kota menggunakan ekspedisi kilat, kami sarankan memilih layanan Next Day agar paket tiba dalam waktu maksimal 1-2 hari. Silakan konsultasikan estimasi tarif dan kurir terbaik ke kota Anda melalui WhatsApp admin kami.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>
