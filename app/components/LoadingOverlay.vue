<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-teal-primary/85 backdrop-blur-md px-4"
    >
      <!-- Spinner / Logo Icon -->
      <div
        class="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center"
      >
        <!-- Outer Spinning Ring -->
        <div
          class="absolute inset-0 rounded-full border-4 border-gold-secondary/20 border-t-gold-secondary animate-spin"
        ></div>

        <!-- Inner Pulse Ring -->
        <div
          class="absolute inset-2 rounded-full border-2 border-dashed border-warm-bg/30 animate-pulse"
        ></div>

        <!-- Center Icon / Symbol -->
        <div
          class="w-10 h-10 rounded-full bg-gold-secondary flex items-center justify-center shadow-lg text-teal-primary font-serif font-bold text-lg"
        >
          AH
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { isLoading, loadingMessage } = useLoading();
</script>
