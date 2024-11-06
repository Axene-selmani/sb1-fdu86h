import React, { createContext, useContext, useReducer } from 'react';
import { Product, Purchase, Sale, StockAdjustment, Supplier, Customer } from '../types';

interface State {
  products: Product[];
  suppliers: Supplier[];
  customers: Customer[];
  purchases: Purchase[];
  sales: Sale[];
  adjustments: StockAdjustment[];
}

type Action =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'ADD_PURCHASE'; payload: Purchase }
  | { type: 'ADD_SALE'; payload: Sale }
  | { type: 'ADD_ADJUSTMENT'; payload: StockAdjustment }
  | { type: 'UPDATE_STOCK'; payload: { productId: string; newStock: number } };

const initialState: State = {
  products: [
    { id: '1', name: 'Product 1', stock: 100, unit: 'units' },
    { id: '2', name: 'Product 2', stock: 500, unit: 'kg' },
  ],
  suppliers: [{ id: '1', name: 'Supplier 1' }],
  customers: [{ id: '1', name: 'Customer 1' }],
  purchases: [],
  sales: [],
  adjustments: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'ADD_PURCHASE':
      return { ...state, purchases: [...state.purchases, action.payload] };
    case 'ADD_SALE':
      return { ...state, sales: [...state.sales, action.payload] };
    case 'ADD_ADJUSTMENT':
      return { ...state, adjustments: [...state.adjustments, action.payload] };
    case 'UPDATE_STOCK':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.productId
            ? { ...product, stock: action.payload.newStock }
            : product
        ),
      };
    default:
      return state;
  }
};

const InventoryContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);