import type { Product, StockStatus } from '~/types/product';
import { products as initialProducts } from '~/data/products';

export const useInventory = () => {
  const products = useState<Product[]>('inventory_list', () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('pempek_inventory');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    // Map initial products to admin product schema
    return initialProducts.map((p, index) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category,
      sku: `PAH-SKU-${100 + index}`,
      price: p.price,
      stock: 15 + index * 5, // mock stock
      lowStockThreshold: 5,
      isActive: true,
      imageUrl: p.image,
      badge: p.badge,
      composition: p.composition,
      weight: p.weight
    }));
  });

  const saveProducts = () => {
    if (import.meta.client) {
      localStorage.setItem('pempek_inventory', JSON.stringify(products.value));
    }
  };

  const getStockStatus = (product: Product): StockStatus => {
    if (!product.isActive) return 'INACTIVE';
    if (product.stock <= 0) return 'OUT_OF_STOCK';
    if (product.stock <= product.lowStockThreshold) return 'LOW_STOCK';
    return 'AVAILABLE';
  };

  const getStockStatusLabel = (status: StockStatus): string => {
    switch (status) {
      case 'AVAILABLE':
        return 'Tersedia';
      case 'LOW_STOCK':
        return 'Stok Rendah';
      case 'OUT_OF_STOCK':
        return 'Habis';
      case 'INACTIVE':
        return 'Tidak Aktif';
      default:
        return 'Tidak Diketahui';
    }
  };

  const getStockStatusBadgeClass = (status: StockStatus): string => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'LOW_STOCK':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'OUT_OF_STOCK':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    products.value.unshift(newProduct);
    saveProducts();
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const index = products.value.findIndex(p => p.id === id);
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updates };
      saveProducts();
    }
  };

  const updateStock = (id: string, newStock: number) => {
    const index = products.value.findIndex(p => p.id === id);
    if (index !== -1 && newStock >= 0) {
      products.value[index].stock = newStock;
      saveProducts();
    }
  };

  const deleteProduct = (id: string) => {
    products.value = products.value.filter(p => p.id !== id);
    saveProducts();
  };

  const getProductById = (id: string): Product | undefined => {
    return products.value.find(p => p.id === id);
  };

  return {
    products,
    getStockStatus,
    getStockStatusLabel,
    getStockStatusBadgeClass,
    addProduct,
    updateProduct,
    updateStock,
    deleteProduct,
    getProductById,
    saveProducts
  };
};
