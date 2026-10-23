<template>
  <section id="testimoni" class="py-32 bg-white border-y border-teal-primary/10 relative overflow-hidden">
    <!-- Background decorative blur -->
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-gold-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-primary/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-primary/10 text-teal-primary text-xs font-bold uppercase tracking-wider">
          ⭐ Testimoni Pelanggan Setia
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-teal-primary tracking-tight">
          Apa Kata Mereka yang Sudah Menikmati Kelezatan Al-Hijrah?
        </h2>
        <p class="text-base text-gray-600">
          Ribuan pelanggan dari berbagai kota telah membuktikan kualitas rasa ikan tenggiri asli dan cuko legendaris kami.
        </p>
      </div>

      <!-- Testimonials Marquee -->
      <div class="testimonial-marquee mx-auto max-w-7xl">
        <div
          class="overflow-hidden"
          role="region"
          aria-label="Testimoni pelanggan"
          aria-roledescription="marquee"
        >
          <div class="testimonial-track flex w-max">
            <div
              v-for="copy in 2"
              :key="copy"
              class="testimonial-set flex w-max shrink-0 gap-4 pr-4 md:gap-6 md:pr-6"
              :aria-hidden="copy === 2 ? 'true' : undefined"
            >
              <article
                v-for="testimonial in testimonials"
                :key="testimonial.name"
                class="flex w-[86vw] shrink-0 flex-col justify-between rounded-3xl border border-gray-200/80 bg-warm-bg p-5 shadow-xs sm:p-6 md:w-[42vw] lg:w-[28vw] lg:p-8 2xl:w-96"
                role="group"
                aria-roledescription="slide"
                :aria-label="`${testimonial.name}, ${testimonial.city}`"
              >
                <div class="space-y-4">
                  <div class="flex items-center space-x-1 text-amber-500" aria-label="5 dari 5 bintang">
                    <span v-for="star in 5" :key="star" aria-hidden="true">★</span>
                  </div>
                  <p class="text-sm leading-relaxed italic text-gray-700">
                    "{{ testimonial.quote }}"
                  </p>
                </div>

                <div class="mt-6 flex items-center justify-between gap-3 border-t border-gray-200/60 pt-6">
                  <div class="flex min-w-0 items-center gap-3">
                    <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-primary text-sm font-bold text-gold-secondary shadow-sm">
                      {{ testimonial.initials }}
                    </div>
                    <div class="min-w-0">
                      <h3 class="text-sm font-bold text-teal-primary">{{ testimonial.name }}</h3>
                      <p class="text-xs text-gray-500">{{ testimonial.city }}</p>
                    </div>
                  </div>
                  <span class="shrink-0 rounded-full bg-gold-secondary/20 px-2.5 py-1 text-[10px] font-bold text-teal-primary">
                    {{ testimonial.product }}
                  </span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Badges Under Testimonials -->
      <div class="mt-16 bg-teal-primary text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div class="space-y-2 text-center md:text-left">
          <h3 class="text-xl font-bold">Siap Menikmati Kelezatan Pempek Al-Hijrah Hari Ini?</h3>
          <p class="text-xs text-gray-300">Pesan sekarang dan rasakan kesegaran ikan tenggiri asli langsung di meja makan Anda.</p>
        </div>
        <NuxtLink
          to="/formulir-pemesanan"
          class="px-8 py-4 bg-gold-secondary hover:bg-gold-secondary/90 text-teal-primary font-extrabold text-sm rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 shrink-0"
        >
          Pesan Paket Favorit Anda Sekarang 🚀
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    initials: 'RS',
    name: 'Ibu Rina Sutyawan',
    city: 'Jakarta Selatan',
    product: 'Paket Keluarga',
    quote: 'Rasanya benar-benar autentik khas Palembang! Cukunya kental, pedas manisnya pas banget di lidah, dan ikannya terasa banget dagingnya. Pengiriman frozen-nya juga aman sampai Jakarta.'
  },
  {
    initials: 'DP',
    name: 'Bapak Dimas Pratama',
    city: 'Bandung',
    product: 'Paket Komplit',
    quote: 'Praktis banget tinggal dihangatkan di rumah. Kapal selam besarnya mantap, telurnya utuh dan padat isinya. Sekarang jadi stok wajib di freezer kulkas buat camilan keluarga.'
  },
  {
    initials: 'MF',
    name: 'Dr. H. M. Fauzi',
    city: 'Surabaya',
    product: 'Adaan & Kulit',
    quote: 'Sebagai perantau asal Palembang, jujur ini obat rindu kampung halaman terbaik. Pempek kulit crispy-nya renyah di luar kenyal di dalam. Rasanya tidak pernah mengecewakan!'
  }
]
</script>

<style scoped>
.testimonial-track {
  animation: testimonial-scroll 36s linear infinite;
}

.testimonial-set {
  width: max-content;
}

.testimonial-marquee:hover .testimonial-track,
.testimonial-marquee:focus-within .testimonial-track {
  animation-play-state: paused;
}

@keyframes testimonial-scroll {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .testimonial-track {
    animation: none;
  }
}
</style>