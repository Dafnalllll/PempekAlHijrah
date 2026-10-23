<script setup lang="ts">
import { ShoppingBag, MessageSquare, Truck, ArrowRight } from 'lucide-vue-next'

const steps = [
  {
    number: '01',
    icon: ShoppingBag,
    title: 'Pilih Paket Favorit',
    description: 'Jelajahi katalog paket pempek kami, tentukan varian dan jumlah porsi yang sesuai dengan selera dan kebutuhan keluarga Anda.'
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Hubungi WhatsApp Admin',
    description: 'Klik tombol pemesanan atau hubungi langsung nomor WhatsApp kami untuk konfirmasi ketersediaan stok, total harga, dan alamat pengiriman.'
  },
  {
    number: '03',
    icon: Truck,
    title: 'Pembayaran & Pengiriman',
    description: 'Lakukan pembayaran melalui transfer bank/e-wallet. Pesanan segera kami kemas dengan vakum frozen higienis dan dikirim ke alamat Anda.'
  }
]

const whatsappNumber = '6281234567891'
const whatsappMessage = encodeURIComponent('Halo Pempek Al Hijrah, saya ingin berkonsultasi mengenai pemesanan pempek...')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
</script>

<template>
  <section id="pemesanan" class="py-20 lg:py-28 bg-white border-t border-neutral-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-gold-secondary/20 text-teal-primary">
          Panduan Pemesanan
        </span>
        <h2 class="mt-4 font-serif text-3xl sm:text-4xl font-bold text-teal-primary tracking-tight">
          Cara Mudah Memesan Pempek Al Hijrah
        </h2>
        <p class="mt-4 text-base sm:text-lg text-muted">
          Proses pemesanan cepat dan aman langsung terhubung dengan admin WhatsApp kami.
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="bg-warm-bg rounded-3xl p-8 border border-neutral-border relative flex flex-col justify-between group hover:border-teal-primary/30 transition duration-300"
        >
          <div>
            <!-- Number Watermark & Icon -->
            <div class="flex items-center justify-between mb-6">
              <div class="w-14 h-14 rounded-2xl bg-teal-primary text-gold-secondary flex items-center justify-center shadow-md group-hover:scale-110 transition duration-300">
                <component :is="step.icon" class="w-7 h-7" />
              </div>
              <span class="font-serif text-4xl font-extrabold text-gold-secondary/40">
                {{ step.number }}
              </span>
            </div>

            <h3 class="font-serif text-xl font-bold text-teal-primary">
              {{ step.title }}
            </h3>
            <p class="mt-3 text-sm text-muted leading-relaxed">
              {{ step.description }}
            </p>
          </div>

          <div class="mt-8 pt-4 border-t border-neutral-border/60 flex items-center gap-1.5 text-xs font-bold text-teal-primary">
            <span>Langkah ke-{{ index + 1 }}</span>
            <ArrowRight class="w-4 h-4 text-gold-secondary" />
          </div>
        </div>
      </div>

      <!-- Bottom CTA Banner -->
      <div class="mt-16 bg-teal-primary rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
        <div class="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-gold-secondary/10 blur-2xl pointer-events-none"></div>
        <div class="relative z-10 max-w-2xl mx-auto">
          <h3 class="font-serif text-2xl sm:text-3xl font-bold">Punya Pertanyaan Khusus atau Kebutuhan Acara?</h3>
          <p class="mt-3 text-gray-300 text-sm sm:text-base">
            Kami siap melayani pesanan khusus untuk arisan, rapat, pesta keluarga, maupun oleh-oleh istimewa.
          </p>
          <div class="mt-8">
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              <span>Konsultasi Pesanan via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
