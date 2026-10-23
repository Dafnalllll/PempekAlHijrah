<template>
  <section id="faq" class="py-24 sm:py-32 bg-white border-t border-teal-primary/10 relative overflow-hidden">
    <!-- Decorative background blobs -->
    <div class="absolute top-1/2 left-0 w-80 h-80 bg-teal-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-80 h-80 bg-gold-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center space-y-4 mb-12">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-primary/10 text-teal-primary text-xs font-bold uppercase tracking-wider">
          💡 Pertanyaan Umum (FAQ)
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-teal-primary tracking-tight">
          Hal yang Sering Ditanyakan Seputar Pempek Al-Hijrah
        </h2>
        <p class="text-base text-gray-600 max-w-2xl mx-auto">
          Punya pertanyaan seputar produk, pengiriman, atau cara penyajian? Temukan jawaban lengkapnya di bawah ini.
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="selectCategory(tab.id)"
          :class="[
            'px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-xs cursor-pointer',
            activeCategory === tab.id
              ? 'bg-teal-primary text-white shadow-md scale-105'
              : 'bg-warm-bg text-charcoal border border-neutral-border hover:border-teal-primary/40'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- FAQ Cards Container -->
      <div ref="faqContainerRef" class="space-y-4">
        <div
          v-for="(faq, index) in filteredFaqs"
          :key="faq.question"
          class="faq-card rounded-2xl border border-neutral-border bg-warm-bg/90 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md opacity-0 translate-y-6"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
            :aria-expanded="openIndex === index"
          >
            <span class="font-serif font-bold text-teal-primary text-lg pr-4">
              {{ faq.question }}
            </span>
            <div
              :class="[
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-primary/10 text-teal-primary transition-all duration-300',
                openIndex === index ? 'rotate-180 bg-teal-primary text-white' : ''
              ]"
            >
              <ChevronDown class="h-5 w-5" />
            </div>
          </button>

          <Transition name="faq-answer">
            <div v-if="openIndex === index" class="faq-answer-panel">
              <div class="min-h-0 overflow-hidden px-6 pb-6 pt-0 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-neutral-border/55">
                <p class="pt-4">{{ faq.answer }}</p>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Still have questions CTA -->
      <div class="mt-12 text-center bg-teal-primary/5 rounded-3xl p-8 border border-teal-primary/10">
        <h3 class="font-serif font-bold text-teal-primary text-lg mb-2">Masih punya pertanyaan lain?</h3>
        <p class="text-sm text-gray-600 mb-6">Tim layanan pelanggan kami siap membantu Anda via WhatsApp setiap hari.</p>
        <a
          href="https://wa.me/6281234567891?text=Halo%20Pempek%20Al%20Hijrah,%20saya%20ingin%20bertanya%20tentang..."
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-whatsapp text-white text-sm font-semibold rounded-2xl shadow-md transition hover:bg-whatsapp/90"
        >
          <span>Tanya via WhatsApp</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { animate, stagger } from 'animejs'

const activeCategory = ref('semua')
const openIndex = ref<number | null>(0)
const faqContainerRef = ref<HTMLElement | null>(null)

const tabs = [
  { id: 'semua', label: '✨ Semua Pertanyaan' },
  { id: 'produk', label: '🐟 Produk & Bahan' },
  { id: 'pengiriman', label: '📦 Pengiriman' },
  { id: 'pemesanan', label: '🛒 Cara Pemesanan' }
]

const faqs = [
  {
    category: 'produk',
    question: 'Apakah Pempek Al-Hijrah menggunakan 100% ikan tenggiri asli?',
    answer: 'Ya, 100%. Kami hanya menggunakan daging ikan tenggiri segar pilihan berkualitas tinggi tanpa pengawet buatan, pemutih, atau bahan kimia berbahaya. Rasa gurih alami dan tekstur kenyal didapat murni dari kualitas ikan segar.'
  },
  {
    category: 'pengiriman',
    question: 'Bagaimana cara pengiriman ke luar kota/pulau agar tetap aman dan tidak basi?',
    answer: 'Produk dikemas dengan metode vacuum-sealed (hampa udara) yang higienis dan dibekukan (frozen) terlebih dahulu. Kami menggunakan kardus tebal dan tambahan bubble wrap/ice gel agar kesegaran pempek dan cuko terjaga aman selama perjalanan ekspedisi 1-3 hari.'
  },
  {
    category: 'produk',
    question: 'Berapa lama ketahanan produk di dalam kulkas (chiller) atau freezer?',
    answer: 'Di dalam freezer (suhu beku -18°C), pempek dapat bertahan hingga 2-3 bulan. Di chiller/kulkas biasa bertahan 3-5 hari. Kuah cuko sebaiknya disimpan di dalam wadah tertutup di kulkas agar awet berbulan-bulan.'
  },
  {
    category: 'pengiriman',
    question: 'Bagaimana cara penyajian atau pemanasan pempek setelah diterima?',
    answer: 'Setelah paket diterima, biarkan suhu ruang sejenak jika dari keadaan beku. Anda bisa merebusnya sebentar, mengukusnya selama 5-10 menit, atau menggorengnya dengan minyak panas sedang hingga bagian luar kecoklatan dan renyah.'
  },
  {
    category: 'pemesanan',
    question: 'Bagaimana cara memesan paket pempek di website ini?',
    answer: 'Sangat mudah! Anda cukup buka menu Katalog Paket, pilih varian paket favorit Anda, masukkan ke keranjang atau langsung klik "Pesan Sekarang", isi formulir pengiriman, dan selesaikan pesanan melalui WhatsApp atau sistem checkout kami.'
  }
]

const filteredFaqs = computed(() => {
  if (activeCategory.value === 'semua') {
    return faqs
  }
  return faqs.filter(f => f.category === activeCategory.value)
})

const playAnimeCards = () => {
  nextTick(() => {
    animate('.faq-card', {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(90, { start: 100 }),
      easing: 'easeOutExpo',
      duration: 700
    })
  })
}

const selectCategory = (id: string) => {
  activeCategory.value = id
  openIndex.value = 0
  playAnimeCards()
}

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

onMounted(() => {
  playAnimeCards()
})
</script>

<style scoped>
.faq-answer-panel {
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
}

.faq-answer-enter-active,
.faq-answer-leave-active {
  transition: grid-template-rows 300ms ease, opacity 300ms ease;
}

.faq-answer-enter-from,
.faq-answer-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}

.faq-answer-enter-to,
.faq-answer-leave-from {
  grid-template-rows: 1fr;
  opacity: 1;
}
</style>
