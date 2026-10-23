import type { ProductionBatch, StockMovement } from '~/types/production';

export const useProductionBatches = () => {
  const batches = useState<ProductionBatch[]>('production_batches', () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('pempek_batches');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return [
      {
        id: 'batch-01',
        batchCode: 'BAT-2026-1021-A',
        productOrComponent: 'Paket Pempek Keluarga & Kapal Selam',
        outputQuantity: 45,
        unit: 'pack',
        status: 'PACKED',
        notes: 'Suhu vakum terjaga di -18°C, kualitas ikan tenggiri premium.',
        createdAt: '21 Oktober 2026, 08:00 WIB'
      },
      {
        id: 'batch-02',
        batchCode: 'BAT-2026-1021-B',
        productOrComponent: 'Cuko Khas Palembang (Botol 250ml)',
        outputQuantity: 120,
        unit: 'botol',
        status: 'COOKING',
        notes: 'Pemasakan gula aren Linggau dan asam jawa pilihan.',
        createdAt: '21 Oktober 2026, 11:30 WIB'
      }
    ];
  });

  const movements = useState<StockMovement[]>('stock_movements', () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('pempek_movements');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return [
      {
        id: 'mov-01',
        itemId: 'paket-keluarga',
        itemName: 'Paket Pempek Keluarga',
        movementType: 'OUT',
        quantity: 1,
        unit: 'pack',
        reason: 'Pesanan PAH-20261021-001',
        referenceId: 'ord-101',
        createdAt: '21 Oktober 2026, 14:30 WIB'
      },
      {
        id: 'mov-02',
        itemId: 'paket-mini',
        itemName: 'Paket Pempek Mini',
        movementType: 'IN',
        quantity: 25,
        unit: 'pack',
        reason: 'Restok dari Batch Produksi BAT-20261020',
        createdAt: '20 Oktober 2026, 16:00 WIB'
      }
    ];
  });

  const saveBatches = () => {
    if (import.meta.client) {
      localStorage.setItem('pempek_batches', JSON.stringify(batches.value));
    }
  };

  const saveMovements = () => {
    if (import.meta.client) {
      localStorage.setItem('pempek_movements', JSON.stringify(movements.value));
    }
  };

  const addBatch = (batchData: Omit<ProductionBatch, 'id' | 'createdAt'>) => {
    const now = new Date();
    const createdAt = `${now.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })} WIB`;
    const newBatch: ProductionBatch = {
      ...batchData,
      id: `batch-${Date.now()}`,
      createdAt
    };
    batches.value.unshift(newBatch);
    saveBatches();
  };

  const addMovement = (movData: Omit<StockMovement, 'id' | 'createdAt'>) => {
    const now = new Date();
    const createdAt = `${now.getDate()} Oktober ${now.getFullYear()}, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;
    const newMov: StockMovement = {
      ...movData,
      id: `mov-${Date.now()}`,
      createdAt
    };
    movements.value.unshift(newMov);
    saveMovements();
  };

  return {
    batches,
    movements,
    addBatch,
    addMovement,
    saveBatches,
    saveMovements
  };
};
