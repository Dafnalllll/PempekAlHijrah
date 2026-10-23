<script setup lang="ts">
import { Utensils, Phone, Mail, MapPin } from 'lucide-vue-next'

const whatsappNumber = '6281234567891'
const whatsappMessage = encodeURIComponent('Halo Pempek Al Hijrah, saya ingin bertanya seputar produk...')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
</script>

<template>
  <footer class="bg-teal-dark text-gray-300 py-16 border-t border-teal-light">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        
        <!-- Brand Info -->
        <div class="lg:col-span-4 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-gold-secondary flex items-center justify-center text-teal-primary font-bold shadow-md">
              <Utensils class="w-6 h-6" />
            </div>
            <div>
              <span class="block font-serif text-2xl font-bold text-white tracking-tight">
                Pempek Al Hijrah
              </span>
              <span class="block text-xs font-medium text-gold-secondary tracking-wider uppercase">
                Autentik Khas Palembang
              </span>
            </div>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed">
            Penyedia pempek frozen berkualitas tinggi dengan 100% ikan tenggiri asli dan cuko kental autentik khas Palembang. Lezat, higienis, dan praktis disajikan di rumah.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="lg:col-span-2 space-y-4">
          <h4 class="font-serif text-white font-bold text-lg">Navigasi</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#beranda" class="hover:text-gold-secondary transition">Beranda</a></li>
            <li><a href="#keunggulan" class="hover:text-gold-secondary transition">Keunggulan</a></li>
            <li><a href="#katalog" class="hover:text-gold-secondary transition">Katalog Paket</a></li>
            <li><a href="#pemesanan" class="hover:text-gold-secondary transition">Cara Pemesanan</a></li>
            <li><a href="#pengiriman" class="hover:text-gold-secondary transition">Pengiriman</a></li>
            <li><a href="#tentang" class="hover:text-gold-secondary transition">Tentang Kami</a></li>
          </ul>
        </div>

        <!-- Catalog Packages -->
        <div class="lg:col-span-3 space-y-4">
          <h4 class="font-serif text-white font-bold text-lg">Produk Unggulan</h4>
          <ul class="space-y-2.5 text-sm text-gray-400">
            <li>Paket Pempek Mini (15 pcs)</li>
            <li>Paket Pempek Keluarga (30 pcs)</li>
            <li>Paket Pempek Komplit (50 pcs)</li>
            <li>Pempek Kapal Selam Besar</li>
            <li>Paket Adaan & Kulit Crispy</li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="lg:col-span-3 space-y-4">
          <h4 class="font-serif text-white font-bold text-lg">Hubungi Kami</h4>
          <ul class="space-y-3 text-sm text-gray-400">
            <li class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-gold-secondary shrink-0 mt-0.5" />
              <span>Palembang, Sumatera Selatan (Pengiriman ke seluruh Indonesia)</span>
            </li>
            <li class="flex items-center gap-3">
              <Phone class="w-5 h-5 text-gold-secondary shrink-0" />
              <a :href="whatsappUrl" target="_blank" class="hover:text-white transition">+62 812-3456-7891 (WhatsApp)</a>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="w-5 h-5 text-gold-secondary shrink-0" />
              <span>info@pempekalhijrah.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-12 pt-8 border-t border-teal-light flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
        <p>&copy; 2026 Pempek Al Hijrah. Hak Cipta Dilindungi.</p>
        <p class="mt-4 sm:mt-0">Frontend Landing Page • Nuxt 4 & Tailwind CSS v4</p>
      </div>
    </div>
  </footer>
</template>
