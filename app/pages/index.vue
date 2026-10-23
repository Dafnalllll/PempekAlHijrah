<script setup lang="ts">
import AppHeader from '~/components/landing/AppHeader.vue'
import HeroSection from '~/components/landing/HeroSection.vue'
import BenefitsSection from '~/components/landing/BenefitsSection.vue'
import ProductSection from '~/components/landing/ProductSection.vue'
import TestimonialSection from '~/components/landing/TestimonialSection.vue'
import OrderingSection from '~/components/landing/OrderingSection.vue'
import ShippingSection from '~/components/landing/ShippingSection.vue'
import AboutSection from '~/components/landing/AboutSection.vue'
import ClosingCTA from '~/components/landing/ClosingCTA.vue'
import AppFooter from '~/components/landing/AppFooter.vue'

useHead({
  title: 'Pempek Hijrah',
  meta: [
    { name: 'description', content: 'Nikmati kelezatan pempek frozen ikan tenggiri asli dengan cuko kental khas Palembang. Praktis disajikan di rumah, aman dikirim ke seluruh Indonesia.' },
    { property: 'og:title', content: 'Pempek Al Hijrah â€” Pempek Frozen Autentik Khas Palembang' }, 
    { property: 'og:description', content: '100% Ikan Tenggiri Asli â€¢ Cuko Autentik Palembang â€¢ Vacuum Frozen Higienis.' },
    { property: 'og:type', content: 'website' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-warm-bg text-charcoal">
    <AppHeader />
    <main class="grow">
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <ProductSection />
      <OrderingSection />
      <ShippingSection />
      <ClosingCTA />
      <TestimonialSection />
    </main>
    <AppFooter />
  </div>
</template>
