<script setup lang="ts">
import { Heart, Utensils, Award } from 'lucide-vue-next'
</script>

<template>
  <section id="tentang" class="py-20 lg:py-28 bg-white border-t border-neutral-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left Image Grid -->
        <div class="lg:col-span-6 relative">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                alt="Pempek Al Hijrah"
                class="rounded-3xl shadow-lg h-64 w-full object-cover border-2 border-white"
              />
              <div class="bg-warm-bg rounded-3xl p-6 border border-neutral-border">
                <p class="font-serif text-3xl font-bold text-teal-primary">100%</p>
                <p class="text-xs text-muted mt-1">Ikan Tenggiri Segar Pilihan</p>
              </div>
            </div>
            <div class="space-y-4 pt-8">
              <div class="bg-teal-primary rounded-3xl p-6 text-white shadow-lg">
                <p class="font-serif text-3xl font-bold text-gold-secondary">500+</p>
                <p class="text-xs text-gray-300 mt-1">Pelanggan Setia Setiap Bulan</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80"
                alt="Cuko Khas Palembang"
                class="rounded-3xl shadow-lg h-64 w-full object-cover border-2 border-white"
              />
            </div>
          </div>
        </div>

        <!-- Right Content -->
        <div class="lg:col-span-6">
          <span class="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-gold-secondary/20 text-teal-primary">
            Tentang Pempek Al Hijrah
          </span>
          <h2 class="mt-4 font-serif text-3xl sm:text-4xl font-bold text-teal-primary tracking-tight leading-[1.2]">
            Menghadirkan Cita Rasa Otentik Palembang ke Rumah Anda
          </h2>
          <p class="mt-6 text-base sm:text-lg text-muted leading-relaxed">
            Berawal dari kerinduan akan cita rasa kuliner tradisional Palembang yang asli dan berkualitas tinggi, Pempek Al Hijrah hadir untuk memanjakan para pecinta kuliner nusantara. Kami menggunakan resep turun-temurun dengan bahan baku ikan tenggiri segar pilihan tanpa bahan pengawet buatan.
          </p>

          <div class="mt-8 space-y-4">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-teal-primary text-gold-secondary flex items-center justify-center shrink-0 mt-1">
                <Utensils class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-bold text-teal-primary text-base">Resep Warisan Autentik</h4>
                <p class="text-sm text-muted mt-1">Pengolahan adonan yang pas menghasilkan tekstur kenyal empuk khas Palembang asli.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-teal-primary text-gold-secondary flex items-center justify-center shrink-0 mt-1">
                <Heart class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-bold text-teal-primary text-base">Dibuat dengan Penuh Ketulusan</h4>
                <p class="text-sm text-muted mt-1">Setiap paket diproduksi dengan standar higienis dan kontrol kualitas ketat demi kepuasan keluarga.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-teal-primary text-gold-secondary flex items-center justify-center shrink-0 mt-1">
                <Award class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-bold text-teal-primary text-base">Kepuasan Pelanggan Utama</h4>
                <p class="text-sm text-muted mt-1">Dipercaya oleh ratusan pelanggan setia dari berbagai kota berkat konsistensi rasa dan kualitasnya.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
