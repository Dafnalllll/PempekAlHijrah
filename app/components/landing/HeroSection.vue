<script setup lang="ts">
import { Phone, ShoppingBag, Award, Sparkles, ShieldCheck } from 'lucide-vue-next'

const whatsappNumber = '6281234567891'
const whatsappMessage = encodeURIComponent('Halo Pempek Al Hijrah, saya ingin memesan paket pempek...')
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
</script>

<template>
  <section id="beranda" class="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-warm-bg">
    <div class="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-goal-secondary/10 to-transparent pointer-events-none"></div>
    <div class="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-goal-secondary/10 blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-teal-primary/5 blur-3xl pointer-events-none"></div>

    <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div class="animate-fade-up lg:col-span-7 lg:text-left">
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-primary/10 bg-teal-primary/5 px-4 py-2 animate-pulse-soft">
            <Sparkles class="h-4 w-4 text-goal-secondary" />
            <span class="text-xs font-semibold tracking-wide text-teal-primary sm:text-sm">
              100% Ikan Tenggiri Asli • Cuko Autentik Palembang
            </span>
          </div>

          <h1 class="font-serif text-4xl font-bold leading-[1.15] tracking-tight text-teal-primary sm:text-5xl lg:text-6xl">
            Nikmatnya Pempek,
            <span class="block text-goal-secondary underline decoration-teal-primary/20 decoration-wavy decoration-2 underline-offset-8">
              Kapan Saja di Rumah.
            </span>
          </h1>

          <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted lg:mx-0 sm:text-xl">
            Rasakan kelezatan pempek frozen premium buatan rumah dengan ikan tenggiri segar pilihan dan cuko kental pedas manis khas Palembang yang menggugah selera. Praktis disimpan & siap disajikan kapanpun.
          </p>

          <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#katalog"
              class="hero-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-teal-primary px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-teal-light hover:shadow-xl"
            >
              <ShoppingBag class="h-5 w-5" />
              <span>Jelajahi Paket Pempek</span>
            </a>

            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-8 py-4 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-whatsapp-hover hover:shadow-lg"
            >
              <Phone class="h-5 w-5 fill-current" />
              <span>Pesan via WhatsApp</span>
            </a>
          </div>

          <div class="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-neutral-border pt-8 lg:mx-0">
            <div class="hover-lift flex items-center gap-3 rounded-2xl bg-white/60 p-3 shadow-sm ring-1 ring-neutral-border">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-goal-secondary/15 text-teal-primary">
                <ShieldCheck class="h-5 w-5" />
              </div>
              <div class="text-left">
                <p class="text-xs font-bold text-teal-primary">Tanpa Pengawet</p>
                <p class="text-[11px] text-muted">100% Alami</p>
              </div>
            </div>

            <div class="hover-lift flex items-center gap-3 rounded-2xl bg-white/60 p-3 shadow-sm ring-1 ring-neutral-border">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-goal-secondary/15 text-teal-primary">
                <Award class="h-5 w-5" />
              </div>
              <div class="text-left">
                <p class="text-xs font-bold text-teal-primary">Resep Asli</p>
                <p class="text-[11px] text-muted">Khas Palembang</p>
              </div>
            </div>

            <div class="hover-lift flex items-center gap-3 rounded-2xl bg-white/60 p-3 shadow-sm ring-1 ring-neutral-border">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-goal-secondary/15 text-teal-primary">
                <ShoppingBag class="h-5 w-5" />
              </div>
              <div class="text-left">
                <p class="text-xs font-bold text-teal-primary">Vacuum Frozen</p>
                <p class="text-[11px] text-muted">Aman Luar Kota</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative lg:col-span-5">
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <div class="animate-float-delayed relative overflow-hidden rounded-[28px] border-4 border-white bg-teal-primary shadow-[0_30px_80px_rgba(21,53,59,0.2)]">
              <img
                src="https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80"
                alt="Pempek Al Hijrah Lezat dan Autentik"
                class="h-105 w-full object-cover transition duration-700 hover:scale-110 sm:h-120"
              />
              <div class="absolute inset-0 bg-linear-to-t from-teal-primary/80 via-transparent to-transparent"></div>

              <div class="absolute bottom-6 left-6 right-6 rounded-2xl border border-neutral-border bg-white/95 p-4 shadow-lg backdrop-blur-md">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <span class="inline-flex rounded-full bg-goal-secondary/20 px-2.5 py-1 text-xs font-bold text-teal-primary">
                      Paket Terlaris
                    </span>
                    <p class="mt-2 font-serif text-lg font-bold text-teal-primary">Paket Pempek Keluarga</p>
                    <p class="text-xs text-muted">Isi 30 pcs mix + cuko kental</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-muted">Mulai dari</p>
                    <p class="text-xl font-bold text-teal-primary">Rp 85.000</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="absolute -right-4 -top-6 hidden items-center gap-3 rounded-2xl border border-goal-secondary/30 bg-teal-primary px-5 py-3 text-white shadow-xl sm:flex animate-float">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-goal-secondary font-bold text-teal-primary">
                ⭐
              </div>
              <div>
                <p class="text-xs text-gray-300">Rating Pelanggan</p>
                <p class="text-sm font-bold">4.9 / 5.0 (500+ Ulasan)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
