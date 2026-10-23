<script setup lang="ts">
import { ref } from "vue";
import {
  Menu,
  X,
  Phone,
  Utensils,
  ShoppingBag,
  ClipboardList,
} from "lucide-vue-next";
import { useCart } from "~/composables/useCart";

const { totalItemsCount } = useCart();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const whatsappNumber = "6281234567891";
const whatsappMessage = encodeURIComponent(
  "Halo Pempek Al Hijrah, saya ingin memesan pempek...",
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
</script>

<template>
  <header class="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
    <div class="mx-auto max-w-350">
      <div
        class="flex items-center justify-between rounded-[28px] border border-neutral-border bg-warm-bg/95 px-4 py-3 shadow-[0_18px_35px_rgba(21,53,59,0.08)] backdrop-blur-xl sm:px-5 sm:py-4 lg:px-6"
      >
        <NuxtLink to="/" class="group flex min-w-0 items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-primary text-gold-secondary shadow-md transition duration-300 group-hover:scale-105 lg:h-12 lg:w-12"
          >
            <Utensils class="h-5 w-5 lg:h-6 lg:w-6" />
          </div>
          <div class="flex flex-col">
            <span class="font-serif font-bold text-teal-primary text-lg sm:text-xl tracking-tight">Pempek Al Hijrah</span>
            <span class="text-[10px] text-[#777777] uppercase tracking-wider font-semibold">Palembang Asli</span>
          </div>
        </NuxtLink>

        <nav
          class="hidden items-center gap-5 text-[15px] font-medium text-charcoal lg:flex lg:gap-6 xl:gap-8"
        >
          <NuxtLink
            to="/"
            class="whitespace-nowrap transition hover:text-teal-primary"
            >Beranda</NuxtLink
          >

          <a
            href="/#tentang"
            class="whitespace-nowrap transition hover:text-teal-primary"
            >Tentang Kami</a
          >
          <a
            href="/#keunggulan"
            class="whitespace-nowrap transition hover:text-teal-primary"
            >Keunggulan</a
          >
          <a
            href="/#katalog"
            class="whitespace-nowrap transition hover:text-teal-primary"
            >Katalog Paket</a
          >
          <a
            href="/#pemesanan"
            class="whitespace-nowrap transition hover:text-teal-primary"
            >Cara Pemesanan</a
          >
          <a
            href="/#pengiriman"
            class="whitespace-nowrap transition hover:text-teal-primary"
            >Pengiriman</a
          >
          <a
            href="/#testimoni"
            class="whitespace-nowrap transition hover:text-teal-primary"
            >Testimoni</a
          >
        </nav>

        <div class="hidden items-center gap-3 md:flex">
          <NuxtLink
            to="/pesanan-saya"
            class="inline-flex items-center justify-center gap-2 rounded-[26px] border border-neutral-border bg-white px-5 py-3 text-[15px] font-semibold text-teal-primary shadow-sm transition hover:border-teal-primary"
            title="Pesanan Saya"
          >
            <ClipboardList class="h-5 w-5 text-gold-secondary" />
          </NuxtLink>

          <NuxtLink
            to="/keranjang"
            class="relative inline-flex items-center justify-center gap-2 rounded-[26px] bg-teal-primary px-5 py-3 text-[15px] font-semibold text-white shadow-md transition hover:bg-teal-primary"
            title="Keranjang Belanja"
          >
            <ShoppingBag class="h-5 w-5 text-gold-secondary" />
            <span
              v-if="totalItemsCount > 0"
              class="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-secondary text-[10px] font-bold text-teal-primary shadow-md"
            >
              {{ totalItemsCount }}
            </span>
          </NuxtLink>

          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-[26px] bg-whatsapp px-5 py-3 text-[15px] font-semibold text-white shadow-sm transition hover:bg-whastapp-hover"
            title="WhatsApp"
          >
            <Phone class="h-5 w-5 fill-current" />
          </a>
        </div>

        <div class="flex items-center gap-2 md:hidden">
          <NuxtLink
            to="/keranjang"
            class="relative flex h-11 w-11 items-center justify-center rounded-xl bg-teal-primary text-white shadow-sm"
            aria-label="Keranjang"
          >
            <ShoppingBag class="h-5 w-5 text-gold-secondary" />
            <span
              v-if="totalItemsCount > 0"
              class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-secondary text-[9px] font-bold text-teal-primary"
            >
              {{ totalItemsCount }}
            </span>
          </NuxtLink>

          <button
            @click="toggleMobileMenu"
            aria-label="Toggle Menu"
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-border/70 text-teal-primary transition hover:bg-neutral-border focus:outline-none"
          >
            <Transition name="rotate-icon" mode="out-in">
              <X v-if="isMobileMenuOpen" class="h-5 w-5" key="x" />
              <Menu v-else class="h-5 w-5" key="menu" />
            </Transition>
          </button>
        </div>
      </div>

      <!-- Backdrop Overlay for Mobile Menu -->
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          @click="closeMobileMenu"
          class="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
        ></div>
      </Transition>

      <!-- Smooth Dropdown Mobile Menu -->
      <Transition
        enter-active-class="transition duration-300 ease-out transform"
        enter-from-class="opacity-0 -translate-y-4 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-200 ease-in transform"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-4 scale-95"
      >
        <div
          v-if="isMobileMenuOpen"
          class="absolute left-3 right-3 sm:left-6 sm:right-6 mt-3 rounded-[28px] border border-neutral-border bg-warm-bg/95 p-6 shadow-2xl backdrop-blur-xl md:hidden z-50 origin-top"
        >
          <div class="flex items-center justify-between pb-4 border-b border-neutral-border">
            <span class="font-serif font-bold text-teal-primary text-base">Menu Navigasi</span>
            <button @click="closeMobileMenu" class="text-xs font-semibold text-muted hover:text-teal-primary">Tutup</button>
          </div>

          <nav class="flex flex-col gap-2.5 pt-4 text-base font-medium text-charcoal">
            <NuxtLink
              to="/"
              @click="closeMobileMenu"
              class="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-teal-primary/10 hover:text-teal-primary"
            >
              <span>Beranda</span>
            </NuxtLink>
            <a
              href="/#tentang"
              @click="closeMobileMenu"
              class="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-teal-primary/10 hover:text-teal-primary"
            >
              <span>Tentang Kami</span>
            </a>
            <a
              href="/#keunggulan"
              @click="closeMobileMenu"
              class="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-teal-primary/10 hover:text-teal-primary"
            >
              <span>Keunggulan</span>
            </a>
            <a
              href="/#katalog"
              @click="closeMobileMenu"
              class="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-teal-primary/10 hover:text-teal-primary"
            >
              <span>Katalog Paket</span>
            </a>
            <a
              href="/#pemesanan"
              @click="closeMobileMenu"
              class="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-teal-primary/10 hover:text-teal-primary"
            >
              <span>Cara Pemesanan</span>
            </a>
            <a
              href="/#pengiriman"
              @click="closeMobileMenu"
              class="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-teal-primary/10 hover:text-teal-primary"
            >
              <span>Pengiriman</span>
            </a>
            <a
              href="/#testimoni"
              @click="closeMobileMenu"
              class="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-teal-primary/10 hover:text-teal-primary"
            >
              <span>Testimoni</span>
            </a>
            <NuxtLink
              to="/pesanan-saya"
              @click="closeMobileMenu"
              class="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-teal-primary/10 hover:text-teal-primary"
            >
              <span>Pesanan Saya</span>
            </NuxtLink>
          </nav>

          <div class="mt-6 border-t border-neutral-border pt-4 flex flex-col gap-3">
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-whatsapp/90"
            >
              <Phone class="h-4 w-4 fill-current" />
              <span>Pesan via WhatsApp</span>
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
.rotate-icon-enter-active,
.rotate-icon-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.rotate-icon-enter-from,
.rotate-icon-leave-to {
  transform: rotate(-90deg);
  opacity: 0;
}
</style>
