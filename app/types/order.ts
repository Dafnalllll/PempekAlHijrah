import type { CartItem } from './cart';

export type OrderStatus =
  | 'WAITING_SELLER_CONFIRMATION'
  | 'WAITING_PAYMENT'
  | 'PAYMENT_CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface CustomerFormInput {
  fullName: string;
  whatsapp: string;
  email?: string;
  recipientSameAsCustomer: boolean;
  recipientName?: string;
  recipientPhone?: string;
  shippingMethod: string;
  address: string;
  city: string;
  postalCode?: string;
  deliveryNote?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shippingCost: number | null;
  grandTotal: number | null;
  shippingMethod?: string;
  recipientName: string;
  recipientPhone: string;
  shippingAddress: string;
  city: string;
  customerName: string;
  customerWhatsapp: string;
  customerEmail?: string;
  deliveryNote?: string;
  trackingNumber?: string;
}
