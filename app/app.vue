<template>
  <NuxtLoadingIndicator color="#D9A34A" :height="4" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <LoadingOverlay />
</template>

<script setup lang="ts">
const { startLoading, stopLoading } = useLoading()
const nuxtApp = useNuxtApp()

startLoading('Memuat halaman...')

nuxtApp.hook('page:start', () => {
  startLoading('Memuat halaman...')
})

nuxtApp.hook('page:finish', () => {
  stopLoading()
})
</script>
