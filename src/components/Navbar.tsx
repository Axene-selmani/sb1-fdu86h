import React from 'react';
import { Package, ShoppingCart, Store, Scale } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItem> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

interface NavbarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeModule, setActiveModule }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-blue-600">Inventory Pro</h1>
            <div className="flex items-center space-x-2">
              <NavItem
                label="Purchases"
                icon={<ShoppingCart size={20} />}
                active={activeModule === 'purchases'}
                onClick={() => setActiveModule('purchases')}
              />
              <NavItem
                label="Sales"
                icon={<Store size={20} />}
                active={activeModule === 'sales'}
                onClick={() => setActiveModule('sales')}
              />
              <NavItem
                label="Stock"
                icon={<Package size={20} />}
                active={activeModule === 'stock'}
                onClick={() => setActiveModule('stock')}
              />
              <NavItem
                label="Weight Scale"
                icon={<Scale size={20} />}
                active={activeModule === 'weight'}
                onClick={() => setActiveModule('weight')}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};