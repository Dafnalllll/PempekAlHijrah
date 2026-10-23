export interface ProductionBatch {
  id: string;
  batchCode: string;
  productOrComponent: string;
  outputQuantity: number;
  unit: string;
  status: 'SCHEDULED' | 'COOKING' | 'PACKED' | 'COMPLETED';
  notes?: string;
  createdAt: string;
}

export interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  movementType: 'IN' | 'OUT' | 'ADJUSTMENT' | 'OPNAME';
  quantity: number;
  unit: string;
  reason: string;
  referenceId?: string;
  createdAt: string;
}
