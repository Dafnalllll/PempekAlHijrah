<template>
  <header class="bg-white border-b border-gray-200/80 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
    <!-- Mobile Hamburger & Page Title / Breadcrumb -->
    <div class="flex items-center space-x-4">
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-hidden"
        aria-label="Toggle Menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div>
        <h2 class="text-lg sm:text-xl font-bold text-teal-primary tracking-tight">
          {{ pageTitle }}
        </h2>
        <p class="text-xs text-gray-500 hidden sm:block">Kelola operasional dan pesanan Pempek Al-Hijrah</p>
      </div>
    </div>

    <!-- Admin User Profile & Quick Actions -->
    <div class="flex items-center space-x-3">
      <div class="hidden sm:flex items-center space-x-2 bg-warm-bg px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 font-medium">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Sistem Aktif (Mock)</span>
      </div>

      <div class="flex items-center space-x-3 border-l pl-3 border-gray-200">
        <div class="w-9 h-9 rounded-full bg-teal-primary text-gold-secondary font-bold flex items-center justify-center text-sm shadow-xs">
          AH
        </div>
        <div class="hidden lg:block text-left">
          <p class="text-xs font-bold text-charcoal">Admin Utama</p>
          <p class="text-[10px] text-gray-500">Pengelola Toko</p>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer Modal -->
    <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 flex md:hidden">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-xs" @click="mobileMenuOpen = false"></div>

      <!-- Drawer Content -->
      <div class="relative w-72 bg-teal-primary text-white flex flex-col h-full shadow-xl">
        <div class="p-6 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-xl bg-gold-secondary flex items-center justify-center font-bold text-teal-primary text-lg">
              AH
            </div>
            <div>
              <h1 class="font-bold text-sm text-white">Pempek Al-Hijrah</h1>
              <span class="text-[10px] text-gold-secondary font-medium uppercase tracking-wider">Panel Admin</span>
            </div>
          </div>
          <button @click="mobileMenuOpen = false" class="text-gray-300 hover:text-white p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav class="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <NuxtLink
            to="/admin"
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
            :class="route.path === '/admin' ? 'bg-gold-secondary text-teal-primary font-semibold' : 'text-gray-300 hover:bg-white/10'"
          >
            <span>Dashboard</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/pesanan"
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
            :class="route.path === '/admin/pesanan' ? 'bg-gold-secondary text-teal-primary font-semibold' : 'text-gray-300 hover:bg-white/10'"
          >
            <span>Pesanan Masuk</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/inventaris"
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
            :class="route.path === '/admin/inventaris' ? 'bg-gold-secondary text-teal-primary font-semibold' : 'text-gray-300 hover:bg-white/10'"
          >
            <span>Inventaris Produk</span>
          </NuxtLink>
        </nav>

        <div class="p-4 border-t border-white/10">
          <NuxtLink
            to="/"
            target="_blank"
            class="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white"
          >
            <span>Lihat Web Toko</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const mobileMenuOpen = ref(false);

const pageTitle = computed(() => {
  switch (route.path) {
    case '/admin':
      return 'Dashboard Operasional';
    case '/admin/pesanan':
      return 'Kelola Pesanan Masuk';
    case '/admin/inventaris':
      return 'Kelola Inventaris Produk';
    default:
      return 'Panel Admin';
  }
});
</script>
