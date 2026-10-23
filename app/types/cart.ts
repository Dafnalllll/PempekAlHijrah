export interface CartItem {
  id: string;
  productId: string;
  name: string;
  variantLabel?: string;
  image: string;
  unitPrice: number;
  quantity: number;
}
