
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-primary text-white mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Stock Sage Visualizer Pro</h3>
            <p className="text-sm text-gray-300">
              Your trusted partner for stock market calculations and investment decisions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-secondary transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-secondary transition-colors">About</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-secondary transition-colors">How It Works</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Disclaimer</h3>
            <p className="text-sm text-gray-300">
              The information provided is for educational purposes only. Not financial advice.
              Please consult with a financial advisor before making investment decisions.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Stock Sage Visualizer Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
