import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

export const PurchaseModule: React.FC = () => {
  const { state, dispatch } = useInventory();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    supplierId: '',
    productId: '',
    quantity: 0,
    unitPrice: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const purchase = {
      id: Date.now().toString(),
      ...formData,
      total: formData.quantity * formData.unitPrice,
    };

    const product = state.products.find(p => p.id === formData.productId);
    if (product) {
      dispatch({ type: 'ADD_PURCHASE', payload: purchase });
      dispatch({
        type: 'UPDATE_STOCK',
        payload: {
          productId: formData.productId,
          newStock: product.stock + formData.quantity,
        },
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Purchase</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Supplier</label>
            <select
              value={formData.supplierId}
              onChange={e => setFormData({ ...formData, supplierId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Supplier</option>
              {state.suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product</label>
            <select
              value={formData.productId}
              onChange={e => setFormData({ ...formData, productId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Product</option>
              {state.products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={e =>
                setFormData({ ...formData, quantity: parseFloat(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Unit Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.unitPrice}
              onChange={e =>
                setFormData({ ...formData, unitPrice: parseFloat(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total</label>
            <input
              type="number"
              value={formData.quantity * formData.unitPrice}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Record Purchase
          </button>
        </div>
      </form>
    </div>
  );
};