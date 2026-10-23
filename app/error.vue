<script setup lang="ts">
import type { NuxtError } from '#app'
import { Home, Phone, Utensils, ArrowLeft, Sparkles, Compass } from 'lucide-vue-next'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })

const whatsappNumber = '6281234567891'
const whatsappMessage = encodeURIComponent('Halo Pempek Al Hijrah, saya tersesat di halaman web dan ingin memesan pempek...')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
</script>

<template>
  <div class="min-h-screen bg-warm-bg text-charcoal flex flex-col justify-between font-sans selection:bg-gold-secondary selection:text-teal-primary overflow-x-hidden">
    
    <!-- Background Animated Glows -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-linear-to-tr from-gold-secondary/15 to-teal-primary/10 blur-3xl pointer-events-none animate-pulse"></div>

    <!-- Header / Brand Bar -->
    <header class="w-full bg-warm-bg/80 backdrop-blur-md border-b border-neutral-border relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-11 h-11 rounded-xl bg-teal-primary flex items-center justify-center text-gold-secondary shadow-md group-hover:scale-110 transition duration-300">
            <Utensils class="w-6 h-6" />
          </div>
          <div>
            <span class="block font-serif text-xl sm:text-2xl font-bold text-teal-primary tracking-tight">
              Pempek Al Hijrah
            </span>
            <span class="block text-xs font-medium text-muted tracking-wider uppercase">
              Autentik Khas Palembang
            </span>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm font-semibold text-teal-primary hover:text-gold-secondary transition bg-white px-4 py-2 rounded-xl border border-neutral-border shadow-sm hover:shadow"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </NuxtLink>
      </div>
    </header>

    <!-- Error Content -->
    <main class="grow flex items-center justify-center px-4 py-16 relative z-10">
      <div class="max-w-xl w-full text-center bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-14 border border-neutral-border shadow-2xl relative transform transition-all duration-700 hover:shadow-3xl">
        
        <!-- Floating Badge -->
        <div class="absolute -top-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-teal-primary text-gold-secondary px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border border-gold-secondary/30 animate-bounce">
          <Sparkles class="w-3.5 h-3.5" />
          <span>Oops! Anda Tersesat</span>
        </div>

        <!-- Animated Icon Container -->
        <div class="relative w-28 h-28 mx-auto mt-6 mb-8">
          <div class="absolute inset-0 rounded-3xl bg-linear-to-tr from-teal-primary to-teal-dark shadow-xl animate-pulse flex items-center justify-center text-gold-secondary transform hover:rotate-6 transition duration-500">
            <Compass class="w-14 h-14 animate-spin-slow" style="animation-duration: 20s;" />
          </div>
          <div class="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-gold-secondary text-teal-primary flex items-center justify-center font-bold text-sm shadow-md">
            404
          </div>
        </div>

        <!-- Title -->
        <h1 class="font-serif text-3xl sm:text-4xl font-bold text-teal-primary tracking-tight">
          {{ error.statusCode === 404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan Sistem' }}
        </h1>

        <!-- Description -->
        <p class="mt-4 text-base text-muted leading-relaxed max-w-md mx-auto">
          {{ error.message || 'Sepertinya halaman yang Anda tuju sudah berpindah tempat atau tidak tersedia. Tenang saja, kuah cuko lezat kami selalu siap menanti Anda di beranda.' }}
        </p>

        <!-- CTAs -->
        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            @click="handleError"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-primary hover:bg-teal-light text-white px-7 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home class="w-5 h-5" />
            <span>Kembali ke Beranda</span>
          </button>

          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white px-7 py-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Phone class="w-5 h-5 fill-current" />
            <span>Tanya Admin via WhatsApp</span>
          </a>
        </div>

        <!-- Quick navigation hints -->
        <div class="mt-12 pt-8 border-t border-neutral-border flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted">
          <NuxtLink to="/#katalog" class="hover:text-teal-primary transition">🛍️ Katalog Paket</NuxtLink>
          <span>•</span>
          <NuxtLink to="/#keunggulan" class="hover:text-teal-primary transition">⭐ Keunggulan</NuxtLink>
          <span>•</span>
          <NuxtLink to="/#pengiriman" class="hover:text-teal-primary transition">🚚 Pengiriman</NuxtLink>
        </div>

      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-teal-dark text-gray-400 py-6 text-center text-xs relative z-10 border-t border-teal-primary">
      <p>&copy; 2026 Pempek Al Hijrah. Hak Cipta Dilindungi.</p>
    </footer>

  </div>
</template>
