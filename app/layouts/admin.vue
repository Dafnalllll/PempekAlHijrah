<template>
  <div class="min-h-screen bg-warm-bg text-charcoal flex flex-col font-sans">
    <!-- Demo Banner Top -->
    <div class="bg-teal-primary text-goal-secondary text-xs font-semibold py-1.5 px-4 text-center tracking-wide border-b border-goal-secondary/20">
      ⚡ Mode Demo Admin â€” Data tersimpan secara simulasi lokal (Browser LocalStorage).
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <AdminSidebar />

      <!-- Main Container -->
      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader />

        <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <slot />
        </main>

        <footer class="py-4 px-6 text-center text-xs text-gray-500 border-t border-gray-200/60 bg-white">
          &copy; 2026 Pempek Al-Hijrah Admin Panel &bull; Hak Cipta Dilindungi
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Admin Layout
</script>
