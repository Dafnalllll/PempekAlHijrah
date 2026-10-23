<script setup lang="ts">
import { Utensils, Phone, Mail, MapPin, Home, Sparkles, Package, FileText, Truck, Info } from 'lucide-vue-next'

const whatsappNumber = '6281234567891'
const whatsappMessage = encodeURIComponent('Halo Pempek Al Hijrah, saya ingin bertanya seputar produk...')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

const navItems = [
  { name: 'Beranda', href: '#beranda', icon: Home },
  { name: 'Keunggulan', href: '#keunggulan', icon: Sparkles },
  { name: 'Katalog Paket', href: '#katalog', icon: Package },
  { name: 'Cara Pemesanan', href: '#pemesanan', icon: FileText },
  { name: 'Pengiriman', href: '#pengiriman', icon: Truck },
  { name: 'Tentang Kami', href: '#tentang', icon: Info },
]
</script>

<template>
  <footer class="bg-teal-dark text-gray-300 py-10 sm:py-16 border-t border-teal-light">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

        <!-- Brand Info -->
        <div class="lg:col-span-4 space-y-3 sm:space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gold-secondary flex items-center justify-center text-teal-primary font-bold shadow-md">
              <Utensils class="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span class="block font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                Pempek Al Hijrah
              </span>
              <span class="block text-[10px] sm:text-xs font-medium text-gold-secondary tracking-wider uppercase">
                Autentik Khas Palembang
              </span>
            </div>
          </div>
          <p class="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Penyedia pempek frozen berkualitas tinggi dengan 100% ikan tenggiri asli dan cuko kental autentik khas Palembang. Lezat, higienis, dan praktis disajikan di rumah.
          </p>
        </div>

        <!-- Navigasi (Icons Only on Mobile, Text List on Desktop) -->
        <div class="lg:col-span-2 space-y-2 sm:space-y-4">
          <h4 class="font-serif text-white font-bold text-base sm:text-lg">Navigasi</h4>
          
          <!-- Mobile: Icons Grid -->
          <div class="grid grid-cols-6 gap-2 sm:hidden">
            <a
              v-for="item in navItems"
              :key="item.name"
              :href="item.href"
              :title="item.name"
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/50 text-gray-300 hover:bg-gold-secondary hover:text-teal-primary transition shadow-xs border border-teal-light/40"
            >
              <component :is="item.icon" class="w-5 h-5" />
            </a>
          </div>

          <!-- Desktop: Text List -->
          <ul class="hidden sm:block space-y-2.5 text-sm">
            <li v-for="item in navItems" :key="item.name">
              <a :href="item.href" class="hover:text-gold-secondary transition">{{ item.name }}</a>
            </li>
          </ul>
        </div>

        <!-- Catalog Packages (Hidden/Minimized on Mobile) -->
        <div class="hidden sm:block lg:col-span-3 space-y-4">
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
        <div class="lg:col-span-3 space-y-2 sm:space-y-4">
          <h4 class="font-serif text-white font-bold text-base sm:text-lg">Hubungi Kami</h4>
          <ul class="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-400">
            <li class="flex items-start gap-2.5">
              <MapPin class="w-4 h-4 sm:w-5 sm:h-5 text-gold-secondary shrink-0 mt-0.5" />
              <span>Palembang, Sumatera Selatan</span>
            </li>
            <li class="flex items-center gap-2.5">
              <Phone class="w-4 h-4 sm:w-5 sm:h-5 text-gold-secondary shrink-0" />
              <a :href="whatsappUrl" target="_blank" class="hover:text-white transition">+62 812-3456-7891</a>
            </li>
            <li class="flex items-center gap-2.5">
              <Mail class="w-4 h-4 sm:w-5 sm:h-5 text-gold-secondary shrink-0" />
              <span>info@pempekalhijrah.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-8 pt-6 border-t border-teal-light flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-gray-400 text-center sm:text-left gap-2">
        <p>&copy; 2026 Pempek Al Hijrah. Hak Cipta Dilindungi.</p>
        <p>Nuxt 4 & Tailwind CSS v4</p>
      </div>
    </div>
  </footer>
</template>
