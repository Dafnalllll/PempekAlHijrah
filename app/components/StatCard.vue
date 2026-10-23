<template>
  <div class="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow flex items-center justify-between">
    <div>
      <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ title }}</p>
      <h3 class="text-2xl font-bold text-charcoal mt-1">{{ value }}</h3>
      <p v-if="subtext" class="text-xs text-gray-500 mt-1 font-medium">{{ subtext }}</p>
    </div>
    <div :class="['w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-xs', iconBgClass]">
      <slot name="icon">
        <span>📊</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    value: string | number;
    subtext?: string;
    iconBgClass?: string;
  }>(),
  {
    iconBgClass: 'bg-[#D9A34A]/20 text-[#15353B]'
  }
);
</script>
