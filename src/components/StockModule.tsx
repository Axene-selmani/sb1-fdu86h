import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Package, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export const StockModule: React.FC = () => {
  const { state, dispatch } = useInventory();
  const [adjustmentData, setAdjustmentData] = useState({
    productId: '',
    quantity: 0,
    reason: '',
  });

  const handleAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    const product = state.products.find(p => p.id === adjustmentData.productId);
    if (product) {
      const adjustment = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        ...adjustmentData,
      };
      dispatch({ type: 'ADD_ADJUSTMENT', payload: adjustment });
      dispatch({
        type: 'UPDATE_STOCK',
        payload: {
          productId: adjustmentData.productId,
          newStock: product.stock + adjustmentData.quantity,
        },
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Stock</h2>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 space-y-4">
              {state.products.map(product => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Package className="text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        Unit: {product.unit}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {product.stock}
                    </p>
                    <p className="text-sm text-gray-500">{product.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Stock Adjustment
          </h2>
          <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleAdjustment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product
                </label>
                <select
                  value={adjustmentData.productId}
                  onChange={e =>
                    setAdjustmentData({
                      ...adjustmentData,
                      productId: e.target.value,
                    })
                  }
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
                  Adjustment Quantity
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() =>
                      setAdjustmentData(prev => ({
                        ...prev,
                        quantity: prev.quantity - 1,
                      }))
                    }
                    className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <ArrowDownCircle className="h-5 w-5" />
                  </button>
                  <input
                    type="number"
                    value={adjustmentData.quantity}
                    onChange={e =>
                      setAdjustmentData({
                        ...adjustmentData,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="flex-1 block w-full rounded-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setAdjustmentData(prev => ({
                        ...prev,
                        quantity: prev.quantity + 1,
                      }))
                    }
                    className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <ArrowUpCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reason for Adjustment
                </label>
                <textarea
                  value={adjustmentData.reason}
                  onChange={e =>
                    setAdjustmentData({
                      ...adjustmentData,
                      reason: e.target.value,
                    })
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter reason for stock adjustment..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Apply Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};