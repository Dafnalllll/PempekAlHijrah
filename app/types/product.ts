export type StockStatus = 'AVAILABLE' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'INACTIVE';

export interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  sku?: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  isActive: boolean;
  imageUrl?: string;
  badge?: string;
  composition?: string[];
  weight?: string;
}
