<template>
  <aside class="flex w-16 shrink-0 flex-col border-r border-teal-primary/30 bg-teal-primary text-white shadow-lg z-30 md:w-64">
    <!-- Brand / Logo Area -->
    <div class="flex items-center justify-center border-b border-white/10 p-3 md:justify-start md:space-x-3 md:p-6">
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold-secondary text-xl font-bold text-teal-primary shadow-md">
        AH
      </div>
      <div class="hidden md:block">
        <h1 class="font-bold text-base tracking-tight text-white">Pempek Al-Hijrah</h1>
        <span class="text-[10px] text-gold-secondary font-bold uppercase tracking-wider">Admin Portal v1.1</span>
      </div>
    </div>

    <!-- Navigation Links (Stitch Spec v1.1) -->
    <nav class="flex-1 space-y-2 overflow-y-auto p-2 md:p-4">
      <NuxtLink
        to="/admin"
        title="Ringkasan Dashboard"
        class="flex items-center justify-center space-x-3 rounded-xl px-3 py-3 text-xs font-semibold transition-all md:justify-start md:px-4"
        :class="route.path === '/admin' ? 'bg-gold-secondary text-teal-primary shadow-md font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span class="hidden md:inline">Ringkasan Dashboard</span>
      </NuxtLink>

      <NuxtLink
        to="/admin/pesanan"
        title="Kelola Pesanan Masuk"
        class="flex items-center justify-center space-x-3 rounded-xl px-3 py-3 text-xs font-semibold transition-all md:justify-start md:px-4"
        :class="route.path === '/admin/pesanan' ? 'bg-gold-secondary text-teal-primary shadow-md font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span class="hidden md:inline">Kelola Pesanan Masuk</span>
      </NuxtLink>

      <NuxtLink
        to="/admin/inventaris"
        title="Inventaris Paket Frozen"
        class="flex items-center justify-center space-x-3 rounded-xl px-3 py-3 text-xs font-semibold transition-all md:justify-start md:px-4"
        :class="route.path === '/admin/inventaris' ? 'bg-gold-secondary text-teal-primary shadow-md font-bold' : 'text-gray-300 hover:bg-white/10 hover:text-white'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <span class="hidden md:inline">Inventaris Paket Frozen</span>
      </NuxtLink>
    </nav>

    <!-- Bottom Actions / Storefront Link -->
    <div class="border-t border-white/10 p-2 md:p-4">
      <NuxtLink
        to="/"
        target="_blank"
        title="Kembali ke Beranda Toko"
        class="flex items-center justify-center space-x-2 rounded-xl bg-white/10 px-3 py-3 text-xs font-bold text-white shadow-xs transition-colors hover:bg-white/20 md:px-4"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        <span class="hidden md:inline">Kembali ke Beranda Toko</span>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
