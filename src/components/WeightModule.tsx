import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Scale } from 'lucide-react';

export const WeightModule: React.FC = () => {
  const { state, dispatch } = useInventory();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    customerId: '',
    productId: '',
    weight: 0,
    pricePerKg: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sale = {
      id: Date.now().toString(),
      date: formData.date,
      customerId: formData.customerId,
      productId: formData.productId,
      quantity: formData.weight,
      unitPrice: formData.pricePerKg,
      total: formData.weight * formData.pricePerKg,
      type: 'weight' as const,
    };

    const product = state.products.find(p => p.id === formData.productId);
    if (product && product.stock >= formData.weight) {
      dispatch({ type: 'ADD_SALE', payload: sale });
      dispatch({
        type: 'UPDATE_STOCK',
        payload: {
          productId: formData.productId,
          newStock: product.stock - formData.weight,
        },
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Scale className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Weight Scale Sale</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={e =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Customer
              </label>
              <select
                value={formData.customerId}
                onChange={e =>
                  setFormData({ ...formData, customerId: e.target.value })
                }
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
              <label className="block text-sm font-medium text-gray-700">
                Product
              </label>
              <select
                value={formData.productId}
                onChange={e =>
                  setFormData({ ...formData, productId: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Product</option>
                {state.products
                  .filter(product => product.unit === 'kg')
                  .map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Net Weight (kg)
              </label>
              <input
                type="number"
                step="0.001"
                value={formData.weight}
                onChange={e =>
                  setFormData({
                    ...formData,
                    weight: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price per kg
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.pricePerKg}
                onChange={e =>
                  setFormData({
                    ...formData,
                    pricePerKg: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Amount
              </label>
              <input
                type="number"
                value={formData.weight * formData.pricePerKg}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Record Weight Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};