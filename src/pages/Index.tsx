
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StockAverageCalculator from '@/components/StockAverageCalculator';
import AboutSection from '@/components/AboutSection';
import { Toaster } from "sonner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Toaster position="top-right" />
      <Header />
      
      <main className="flex-grow">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Stock Average Calculator
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
              Calculate your average stock price, visualize your investments, and make informed decisions
            </p>
            
            <StockAverageCalculator />
          </div>
        </section>
        
        <AboutSection />

        <section id="how-it-works" className="py-12 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">How to Use Our Calculator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Enter Stock Details</h3>
              <p className="text-gray-600">
                Fill in your stock name and add all your purchase records with the quantity and price for each transaction.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">View Results</h3>
              <p className="text-gray-600">
                Get instant calculations showing your average purchase price, total shares, and total investment amount.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Download or Share</h3>
              <p className="text-gray-600">
                Export your results as a professional PDF report or email them directly to yourself or your financial advisor.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
