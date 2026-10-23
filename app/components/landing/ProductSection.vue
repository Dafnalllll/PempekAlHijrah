<script setup lang="ts">
import { products, type Product } from '~/data/products'
import { Phone, Check, Package, Scale } from 'lucide-vue-next'

const whatsappNumber = '6281234567891'

const getWhatsappUrl = (product: Product) => {
  const msg = encodeURIComponent(`Halo Pempek Al Hijrah, saya tertarik untuk memesan *${product.name}* (${product.formattedPrice}). Mohon info ketersediaan dan pengirimannya.`)
  return `https://wa.me/${whatsappNumber}?text=${msg}`
}
</script>

<template>
  <section id="katalog" class="py-20 lg:py-28 bg-warm-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-teal-primary/10 text-teal-primary">
          Katalog Produk Unggulan
        </span>
        <h2 class="mt-4 font-serif text-3xl sm:text-4xl font-bold text-teal-primary tracking-tight">
          Pilihan Paket Pempek Frozen Terbaik
        </h2>
        <p class="mt-4 text-base sm:text-lg text-muted">
          Pilih paket favorit Anda. Semua dikemas higienis lengkap dengan cuko kental khas Palembang dan bumbu pelengkap.
        </p>
      </div>

      <!-- Product Grid -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-3xl overflow-hidden border border-neutral-border shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group"
        >
          <div>
            <!-- Image & Badge Container -->
            <div class="relative h-64 overflow-hidden bg-teal-primary">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
              
              <!-- Category Badge -->
              <div class="absolute top-4 left-4">
                <span class="bg-white/90 backdrop-blur-md text-teal-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {{ product.category }}
                </span>
              </div>

              <!-- Special Badge if any -->
              <div v-if="product.badge" class="absolute top-4 right-4">
                <span class="bg-gold-secondary text-teal-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {{ product.badge }}
                </span>
              </div>

              <!-- Price Tag Overlay -->
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <p class="text-xs text-gray-300">Harga Paket</p>
                  <p class="font-serif text-2xl font-bold text-gold-secondary">{{ product.formattedPrice }}</p>
                </div>
                <div class="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-gray-200">
                  <Scale class="w-3.5 h-3.5 text-gold-secondary" />
                  <span>{{ product.weight }}</span>
                </div>
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-6">
              <h3 class="font-serif text-xl font-bold text-teal-primary group-hover:text-gold-secondary transition">
                {{ product.name }}
              </h3>
              <p class="mt-2 text-sm text-muted leading-relaxed">
                {{ product.description }}
              </p>

              <!-- Composition list -->
              <div class="mt-5 pt-5 border-t border-neutral-border">
                <p class="text-xs font-bold uppercase tracking-wider text-teal-primary flex items-center gap-1.5">
                  <Package class="w-4 h-4 text-gold-secondary" />
                  <span>Isi & Komposisi Paket:</span>
                </p>
                <ul class="mt-3 space-y-2">
                  <li
                    v-for="(item, idx) in product.composition"
                    :key="idx"
                    class="text-xs text-charcoal flex items-start gap-2"
                  >
                    <Check class="w-4 h-4 text-whatsapp shrink-0 mt-0.5" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="p-6 pt-0">
            <a
              :href="getWhatsappUrl(product)"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 w-full bg-whatsapp hover:bg-whatsapp-hover text-white py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition"
            >
              <Phone class="w-4 h-4 fill-current" />
              <span>Pesan {{ product.name }}</span>
            </a>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
