export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  formattedPrice: string;
  description: string;
  composition: string[];
  weight: string;
  badge?: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 'paket-mini',
    name: 'Paket Pempek Mini',
    category: 'Paket Hemat',
    price: 45000,
    formattedPrice: 'Rp 45.000',
    description: 'Cocok untuk camilan santai bersama keluarga di rumah atau porsi personal yang mengenyangkan.',
    composition: ['15 pcs Pempek Mix (Lenjer & Telur Kecil)', 'Cuko Khas Palembang (Botol 150ml)', 'Timun & Ebi Kering'],
    weight: '± 500 gram',
    badge: 'Terlaris',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'paket-keluarga',
    name: 'Paket Pempek Keluarga',
    category: 'Paket Favorit',
    price: 85000,
    formattedPrice: 'Rp 85.000',
    description: 'Pilihan pas untuk dinikmati 3-4 orang. Berisi variasi pempek lengkap dengan tekstur empuk & gurih.',
    composition: ['30 pcs Pempek Mix (Lenjer, Telur Kecil, Adaan, Kulit Crispy)', 'Cuko Khas Palembang (Botol 250ml)', 'Timun & Ebi Kering'],
    weight: '± 1.000 gram',
    badge: 'Best Value',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'paket-komplit',
    name: 'Paket Pempek Komplit',
    category: 'Paket Spesial',
    price: 150000,
    formattedPrice: 'Rp 150.000',
    description: 'Paket mewah menghadirkan seluruh varian terbaik termasuk kapal selam besar isi telur utuh.',
    composition: ['50 pcs Pempek Mix + 2 pcs Kapal Selam Besar', 'Cuko Spesial Khas Palembang (2 Botol 250ml)', 'Timun & Ebi Kering Melimpah'],
    weight: '± 1.800 gram',
    badge: 'Porsi Besar',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kapal-selam-besar',
    name: 'Pempek Kapal Selam Besar',
    category: 'Satuan Premium',
    price: 65000,
    formattedPrice: 'Rp 65.000',
    description: '5 pcs Pempek Kapal Selam ukuran besar dengan isian telur ayam utuh padat di dalam.',
    composition: ['5 pcs Kapal Selam Besar', 'Cuko Khas Palembang (Botol 250ml)', 'Timun & Ebi Kering'],
    weight: '± 750 gram',
    badge: 'Favorit Telur',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'adaan-kulit',
    name: 'Paket Adaan & Kulit Crispy',
    category: 'Paket Varian',
    price: 60000,
    formattedPrice: 'Rp 60.000',
    description: 'Khusus pecinta pempek adaan yang harum daun bawang dan pempek kulit yang renyah di luar.',
    composition: ['25 pcs (Pempek Adaan & Pempek Kulit Crispy)', 'Cuko Khas Palembang (Botol 150ml)', 'Timun Segar'],
    weight: '± 650 gram',
    badge: 'Renyah & Gurih',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80'
  }
];
