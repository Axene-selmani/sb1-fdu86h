export interface Product {
  id: string;
  name: string;
  stock: number;
  unit: 'kg' | 'units';
}

export interface Supplier {
  id: string;
  name: string;
}

export interface Customer {
  id: string;
  name: string;
}

export interface Purchase {
  id: string;
  date: string;
  supplierId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Sale {
  id: string;
  date: string;
  customerId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  total: number;
  type: 'regular' | 'weight';
}

export interface StockAdjustment {
  id: string;
  date: string;
  productId: string;
  quantity: number;
  reason: string;
}