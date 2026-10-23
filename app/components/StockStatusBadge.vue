<template>
  <span
    class="px-2.5 py-1 rounded-full text-xs font-semibold border inline-flex items-center gap-1.5"
    :class="getStockStatusBadgeClass(status)"
  >
    <span class="w-1.5 h-1.5 rounded-full" :class="dotClass"></span>
    {{ getStockStatusLabel(status) }}
  </span>
</template>

<script setup lang="ts">
import type { StockStatus } from '~/types/product';

const props = defineProps<{
  status: StockStatus;
}>();

const { getStockStatusLabel, getStockStatusBadgeClass } = useInventory();

const dotClass = computed(() => {
  switch (props.status) {
    case 'AVAILABLE':
      return 'bg-emerald-500';
    case 'LOW_STOCK':
      return 'bg-amber-500';
    case 'OUT_OF_STOCK':
      return 'bg-rose-500';
    case 'INACTIVE':
      return 'bg-gray-400';
    default:
      return 'bg-gray-500';
  }
});
</script>
