<template>
  <span
    class="px-2.5 py-1 rounded-full text-xs font-semibold border inline-flex items-center gap-1.5"
    :class="getStatusBadgeClass(status)"
  >
    <span class="w-1.5 h-1.5 rounded-full" :class="dotClass"></span>
    {{ getStatusLabel(status) }}
  </span>
</template>

<script setup lang="ts">
import type { OrderStatus } from '~/types/order';

const props = defineProps<{
  status: OrderStatus;
}>();

const { getStatusLabel, getStatusBadgeClass } = useOrders();

const dotClass = computed(() => {
  switch (props.status) {
    case 'WAITING_SELLER_CONFIRMATION':
      return 'bg-amber-500';
    case 'WAITING_PAYMENT':
      return 'bg-blue-500';
    case 'PAYMENT_CONFIRMED':
    case 'PROCESSING':
      return 'bg-indigo-500';
    case 'SHIPPED':
      return 'bg-purple-500';
    case 'COMPLETED':
      return 'bg-emerald-500';
    case 'CANCELLED':
      return 'bg-rose-500';
    default:
      return 'bg-gray-500';
  }
});
</script>
