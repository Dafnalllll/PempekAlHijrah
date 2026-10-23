<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
    <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-gray-100 overflow-hidden my-8 flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="p-6 bg-teal-primary text-white flex items-center justify-between">
        <h2 class="text-lg font-bold">
          {{ isEdit ? 'Edit Produk Inventaris' : 'Tambah Produk Baru' }}
        </h2>
        <button
          @click="$emit('close')"
          class="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4 overflow-y-auto flex-1 text-sm text-charcoal">
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">Nama Produk <span class="text-rose-500">*</span></label>
          <input
            type="text"
            v-model="form.name"
            required
            placeholder="Contoh: Paket Pempek Spesial"
            class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Kategori</label>
            <input
              type="text"
              v-model="form.category"
              placeholder="Contoh: Paket Hemat"
              class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">SKU / Kode Produk</label>
            <input
              type="text"
              v-model="form.sku"
              placeholder="Contoh: PAH-SKU-101"
              class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Harga (Rp) <span class="text-rose-500">*</span></label>
            <input
              type="number"
              v-model.number="form.price"
              required
              min="1"
              placeholder="50000"
              class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Stok Awal <span class="text-rose-500">*</span></label>
            <input
              type="number"
              v-model.number="form.stock"
              required
              min="0"
              placeholder="20"
              class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">Ambang Stok Rendah</label>
            <input
              type="number"
              v-model.number="form.lowStockThreshold"
              required
              min="1"
              placeholder="5"
              class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">URL Gambar Produk</label>
          <input
            type="text"
            v-model="form.imageUrl"
            placeholder="https://images.unsplash.com/..."
            class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">Deskripsi Singkat</label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Deskripsi produk untuk pelanggan..."
            class="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-primary focus:outline-hidden"
          ></textarea>
        </div>

        <div class="flex items-center space-x-3 pt-2">
          <input
            type="checkbox"
            id="isActiveCheck"
            v-model="form.isActive"
            class="w-4 h-4 text-teal-primary rounded border-gray-300 focus:ring-teal-primary"
          />
          <label for="isActiveCheck" class="text-xs font-semibold text-gray-700 cursor-pointer">
            Produk Aktif (Tampil di katalog pemesanan pelanggan)
          </label>
        </div>

        <div v-if="errorMessage" class="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs">
          {{ errorMessage }}
        </div>

        <!-- Footer Actions -->
        <div class="pt-4 border-t flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2.5 rounded-xl text-xs font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-primary text-white hover:bg-teal-primary/90 transition-colors shadow-sm"
          >
            Simpan Produk
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product';

const props = defineProps<{
  product?: Product | null;
}>();

const emit = defineEmits(['close', 'saved']);

const { addProduct, updateProduct } = useInventory();

const isEdit = computed(() => !!props.product);

const form = reactive({
  name: props.product?.name || '',
  category: props.product?.category || 'Paket Pilihan',
  sku: props.product?.sku || `PAH-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
  price: props.product?.price || 50000,
  stock: props.product?.stock !== undefined ? props.product.stock : 20,
  lowStockThreshold: props.product?.lowStockThreshold || 5,
  isActive: props.product?.isActive !== undefined ? props.product.isActive : true,
  imageUrl: props.product?.imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
  description: props.product?.description || '',
  badge: props.product?.badge || ''
});

const errorMessage = ref('');

const handleSubmit = () => {
  if (form.price <= 0) {
    errorMessage.value = 'Harga produk harus bernilai positif (> 0).';
    return;
  }
  if (form.stock < 0 || !Number.isInteger(form.stock)) {
    errorMessage.value = 'Stok harus berupa bilangan bulat tidak negatif (>= 0).';
    return;
  }

  if (isEdit && props.product) {
    updateProduct(props.product.id, { ...form });
  } else {
    addProduct({ ...form });
  }

  emit('saved');
  emit('close');
};
</script>
