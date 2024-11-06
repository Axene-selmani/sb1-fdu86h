import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

export const SaleModule: React.FC = () => {
  const { state, dispatch } = useInventory();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    customerId: '',
    productId: '',
    quantity: 0,
    unitPrice: 0,
    type: 'regular' as 'regular' | 'weight',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sale = {
      id: Date.now().toString(),
      ...formData,
      total: formData.quantity * formData.unitPrice,
    };

    const product = state.products.find(p => p.id === formData.productId);
    if (product && product.stock >= formData.quantity) {
      dispatch({ type: 'ADD_SALE', payload: sale });
      dispatch({
        type: 'UPDATE_STOCK',
        payload: {
          productId: formData.productId,
          newStock: product.stock - formData.quantity,
        },
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Sale</h2>
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
            <label className="block text-sm font-medium text-gray-700">Customer</label>
            <select
              value={formData.customerId}
              onChange={e => setFormData({ ...formData, customerId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Customer</option>
              {state.customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
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
            <label className="block text-sm font-medium text-gray-700">
              {formData.type === 'weight' ? 'Weight (kg)' : 'Quantity'}
            </label>
            <input
              type="number"
              step={formData.type === 'weight' ? '0.001' : '1'}
              value={formData.quantity}
              onChange={e =>
                setFormData({ ...formData, quantity: parseFloat(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {formData.type === 'weight' ? 'Price per kg' : 'Unit Price'}
            </label>
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
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() =>
              setFormData(prev => ({
                ...prev,
                type: prev.type === 'regular' ? 'weight' : 'regular',
              }))
            }
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Switch to {formData.type === 'regular' ? 'Weight' : 'Regular'} Sale
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Record Sale
          </button>
        </div>
      </form>
    </div>
  );
};