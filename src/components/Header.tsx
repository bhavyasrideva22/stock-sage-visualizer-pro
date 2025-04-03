
import React from 'react';
import { Calculator } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-4 bg-primary text-white">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calculator size={28} />
          <h1 className="text-xl md:text-2xl font-bold text-white">Stock Sage Visualizer Pro</h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li><a href="/" className="hover:text-secondary transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-secondary transition-colors">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
