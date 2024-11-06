import React, { useState } from 'react';
import { InventoryProvider } from './context/InventoryContext';
import { Navbar } from './components/Navbar';
import { PurchaseModule } from './components/PurchaseModule';
import { SaleModule } from './components/SaleModule';
import { StockModule } from './components/StockModule';
import { WeightModule } from './components/WeightModule';

function App() {
  const [activeModule, setActiveModule] = useState('purchases');

  const renderModule = () => {
    switch (activeModule) {
      case 'purchases':
        return <PurchaseModule />;
      case 'sales':
        return <SaleModule />;
      case 'stock':
        return <StockModule />;
      case 'weight':<boltAction type="file" filePath="src/App.tsx">        return <WeightModule />;
      default:
        return <PurchaseModule />;
    }
  };

  return (
    <InventoryProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="py-6">
          {renderModule()}
        </main>
      </div>
    </InventoryProvider>
  );
}

export default App;