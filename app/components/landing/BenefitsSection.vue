<script setup lang="ts">
import { ref } from 'vue'
import { Fish, Droplets, Snowflake, CheckCircle2 } from 'lucide-vue-next'

const benefits = [
  {
    icon: Fish,
    title: '100% Ikan Tenggiri Asli',
    description: 'Dipilih dari ikan tenggiri segar kualitas terbaik tanpa pengawet buatan, menghasilkan tekstur pempek yang kenyal, lembut, dan gurih alami.'
  },
  {
    icon: Droplets,
    title: 'Cuko Autentik Khas Palembang',
    description: 'Diracik dari gula merah pilihan Linggau, asam jawa, dan cabai segar segar. Menghadirkan rasa kuah cuko kental yang pedas, manis, dan asamnya pas.'
  },
  {
    icon: Snowflake,
    title: 'Higienis & Vacuum Frozen',
    description: 'Dikemas dengan teknologi vakum higienis kedap udara, menjaga kualitas kesegaran rasa saat dikirim ke seluruh kota di Indonesia.'
  },
  {
    icon: CheckCircle2,
    title: 'Halal & Terpercaya',
    description: 'Diproduksi dengan standar kebersihan tinggi, menggunakan bahan-bahan halal berkualitas pilihan yang aman dikonsumsi seluruh keluarga.'
  }
]

const cardRefs = ref<HTMLElement[]>([])

const handleMouseEnter = async (el: HTMLElement) => {
  if (process.server) return
  const { animate } = await import('animejs')
  animate(el, {
    scale: 1.04,
    translateY: -8,
    rotateX: 4,
    rotateY: 2,
    boxShadow: '0 20px 25px -5px rgba(21, 53, 59, 0.15), 0 10px 10px -5px rgba(21, 53, 59, 0.04)',
    duration: 400,
    ease: 'outExpo',
    composition: 'replace'
  })

  // Animate inner icon & title
  const icon = el.querySelector('.benefit-icon')
  const title = el.querySelector('.benefit-title')
  if (icon) {
    animate(icon, {
      scale: 1.15,
      rotate: '6deg',
      duration: 400,
      ease: 'outBack',
      composition: 'replace'
    })
  }
  if (title) {
    animate(title, {
      translateX: 4,
      duration: 300,
      ease: 'outQuad',
      composition: 'replace'
    })
  }
}

const handleMouseLeave = async (el: HTMLElement) => {
  if (process.server) return
  const { animate } = await import('animejs')
  animate(el, {
    scale: 1,
    translateY: 0,
    rotateX: 0,
    rotateY: 0,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    duration: 500,
    ease: 'outExpo',
    composition: 'replace'
  })

  const icon = el.querySelector('.benefit-icon')
  const title = el.querySelector('.benefit-title')
  if (icon) {
    animate(icon, {
      scale: 1,
      rotate: '0deg',
      duration: 500,
      ease: 'outExpo',
      composition: 'replace'
    })
  }
  if (title) {
    animate(title, {
      translateX: 0,
      duration: 400,
      ease: 'outQuad',
      composition: 'replace'
    })
  }
}
</script>

<template>
  <section id="keunggulan" class="py-20 lg:py-28 bg-white border-y border-neutral-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-gold-secondary/20 text-teal-primary">
          Keunggulan Produk Kami
        </span>
        <h2 class="mt-4 font-serif text-3xl sm:text-4xl font-bold text-teal-primary tracking-tight">
          Kenapa Harus Memilih Pempek Al Hijrah?
        </h2>
        <p class="mt-4 text-base sm:text-lg text-muted">
          Kami berkomitmen menghadirkan cita rasa kuliner Palembang terbaik langsung ke meja makan Anda dengan standar kualitas tertinggi.
        </p>
      </div>

      <!-- Benefits Grid -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style="perspective: 1000px;">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          ref="cardRefs"
          @mouseenter="handleMouseEnter($event.currentTarget as HTMLElement)"
          @mouseleave="handleMouseLeave($event.currentTarget as HTMLElement)"
          class="bg-warm-bg rounded-3xl p-8 border border-neutral-border cursor-pointer flex flex-col justify-between transform-gpu transition-shadow duration-300"
          style="transform-style: preserve-3d;"
        >
          <div>
            <div class="benefit-icon w-14 h-14 rounded-2xl bg-teal-primary text-gold-secondary flex items-center justify-center shadow-md">
              <component :is="benefit.icon" class="w-7 h-7" />
            </div>
            <h3 class="benefit-title mt-6 font-serif text-xl font-bold text-teal-primary">
              {{ benefit.title }}
            </h3>
            <p class="mt-3 text-sm text-muted leading-relaxed">
              {{ benefit.description }}
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-neutral-border flex items-center gap-2 text-xs font-semibold text-teal-primary">
            <CheckCircle2 class="w-4 h-4 text-gold-secondary" />
            <span>Terjamin Kualitasnya</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
