<script setup lang="ts">
import { Phone, ShoppingBag } from 'lucide-vue-next'

const whatsappNumber = '6281234567891'
const whatsappMessage = encodeURIComponent('Halo Pempek Al Hijrah, saya ingin memesan paket pempek sekarang...')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
</script>

<template>
  <section class="py-20 lg:py-28 bg-teal-primary text-white relative overflow-hidden">
    <!-- Decorative background blobs -->
    <div class="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-secondary/10 blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold-secondary/10 blur-3xl pointer-events-none"></div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <span class="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-gold-secondary text-teal-primary">
        Pesan Sekarang
      </span>
      <h2 class="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
        Sudah Siap Menikmati Kelezatan Pempek Al Hijrah Hari Ini?
      </h2>
      <p class="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Nikmati kelezatan pempek frozen ikan tenggiri asli dengan cuko kental khas Palembang bersama keluarga tercinta di rumah.
      </p>

      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
        >
          <Phone class="w-5 h-5 fill-current" />
          <span>Pesan via WhatsApp Sekarang</span>
        </a>

        <a
          href="#katalog"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold transition"
        >
          <ShoppingBag class="w-5 h-5" />
          <span>Lihat Katalog Paket</span>
        </a>
      </div>
    </div>
  </section>
</template>
