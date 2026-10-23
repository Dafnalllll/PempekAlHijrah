import type { Order, OrderStatus, CustomerFormInput } from '~/types/order'
import type { CartItem } from '~/types/cart'

export const useOrders = () => {
  const orders = useState<Order[]>('orders_list', () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('pempek_orders')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          // ignore
        }
      }
    }
    // Initial mock order for demonstration
    return [
      {
        id: 'ord-101',
        orderNumber: 'PAH-20261021-001',
        createdAt: '21 Oktober 2026, 14:30 WIB',
        status: 'WAITING_SELLER_CONFIRMATION',
        items: [
          {
            id: 'paket-keluarga',
            productId: 'paket-keluarga',
            name: 'Paket Pempek Keluarga',
            variantLabel: '30 pcs Mix + Cuko',
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
            unitPrice: 85000,
            quantity: 1
          }
        ],
        subtotal: 85000,
        shippingCost: null,
        grandTotal: null,
        shippingMethod: 'Pengiriman Lokal (Instant / Same Day)',
        recipientName: 'Siti Aminah',
        recipientPhone: '081234567890',
        shippingAddress: 'Jl. Sudirman No. 125, RT 04/RW 02',
        city: 'Palembang',
        customerName: 'Siti Aminah',
        customerWhatsapp: '081234567890',
        deliveryNote: 'Mohon dikemas aman dengan ice pack'
      }
    ]
  })

  const saveOrders = () => {
    if (import.meta.client) {
      localStorage.setItem('pempek_orders', JSON.stringify(orders.value))
    }
  }

  const createOrder = (form: CustomerFormInput, items: CartItem[], subtotal: number): Order => {
    const randomNum = Math.floor(100 + Math.random() * 900)
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const orderNumber = `PAH-${todayStr}-${randomNum}`

    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    const createdAt = `${now.toLocaleDateString('id-ID', options)} WIB`

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt,
      status: 'WAITING_SELLER_CONFIRMATION',
      items: [...items],
      subtotal,
      shippingCost: null,
      grandTotal: null,
      shippingMethod: form.shippingMethod,
      recipientName: form.recipientSameAsCustomer ? form.fullName : (form.recipientName || form.fullName),
      recipientPhone: form.recipientSameAsCustomer ? form.whatsapp : (form.recipientPhone || form.whatsapp),
      shippingAddress: form.address,
      city: form.city,
      customerName: form.fullName,
      customerWhatsapp: form.whatsapp,
      customerEmail: form.email,
      deliveryNote: form.deliveryNote
    }

    orders.value.unshift(newOrder)
    saveOrders()
    return newOrder
  }

  const getOrderById = (id: string): Order | undefined => {
    return orders.value.find(o => o.id === id || o.orderNumber === id)
  }

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    const index = orders.value.findIndex(o => o.id === id || o.orderNumber === id)
    if (index !== -1) {
      orders.value[index].status = status
      saveOrders()
    }
  }

  const updateOrderPricing = (id: string, shippingCost: number, grandTotal: number) => {
    const index = orders.value.findIndex(o => o.id === id || o.orderNumber === id)
    if (index !== -1) {
      orders.value[index].shippingCost = shippingCost
      orders.value[index].grandTotal = grandTotal
      saveOrders()
    }
  }

  const updateTracking = (id: string, trackingNumber: string) => {
    const index = orders.value.findIndex(o => o.id === id || o.orderNumber === id)
    if (index !== -1) {
      orders.value[index].trackingNumber = trackingNumber
      saveOrders()
    }
  }

  const getStatusLabel = (status: OrderStatus): string => {
    switch (status) {
      case 'WAITING_SELLER_CONFIRMATION':
        return 'Menunggu Konfirmasi Penjual'
      case 'WAITING_PAYMENT':
        return 'Menunggu Pembayaran'
      case 'PAYMENT_CONFIRMED':
        return 'Pembayaran Dikonfirmasi'
      case 'PROCESSING':
        return 'Sedang Diproses'
      case 'SHIPPED':
        return 'Dalam Pengiriman'
      case 'COMPLETED':
        return 'Selesai'
      case 'CANCELLED':
        return 'Dibatalkan'
      default:
        return 'Status Tidak Diketahui'
    }
  }

  const getStatusBadgeClass = (status: OrderStatus): string => {
    switch (status) {
      case 'WAITING_SELLER_CONFIRMATION':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'WAITING_PAYMENT':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'PAYMENT_CONFIRMED':
      case 'PROCESSING':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'CANCELLED':
        return 'bg-rose-100 text-rose-800 border-rose-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return {
    orders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    updateOrderPricing,
    updateTracking,
    getStatusLabel,
    getStatusBadgeClass,
    saveOrders
  }
}
