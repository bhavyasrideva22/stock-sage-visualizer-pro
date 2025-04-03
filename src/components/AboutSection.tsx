
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">About Stock Average Calculator</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="calculator-container">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">What is a Stock Average Calculator?</h3>
              <div className="space-y-4 text-left">
                <p>
                  A Stock Average Calculator is an essential tool for investors who purchase shares of the same company at different times and different prices. It helps you determine the average price you've paid per share across all your purchases.
                </p>
                <p>
                  Understanding your average purchase price is crucial for making informed investment decisions. It serves as your base cost and helps you calculate your actual profit or loss when you decide to sell your shares.
                </p>
                <p>
                  Our Stock Average Calculator is specifically designed for the Indian market, with all calculations done in Indian Rupees (₹), making it perfect for investors trading on the National Stock Exchange (NSE) or Bombay Stock Exchange (BSE).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="calculator-container">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">Benefits of Using Our Calculator</h3>
              <ul className="space-y-3 text-left list-disc pl-5">
                <li>
                  <strong>Accurate Averaging:</strong> Get precise calculations of your average purchase price across multiple buys.
                </li>
                <li>
                  <strong>Visual Insights:</strong> See graphical representations of your investments, making it easier to understand your position.
                </li>
                <li>
                  <strong>Cost Basis Tracking:</strong> Keep track of your total investment and cost basis for tax purposes.
                </li>
                <li>
                  <strong>Strategy Planning:</strong> Plan your averaging down (or up) strategy with precision.
                </li>
                <li>
                  <strong>Professional Reports:</strong> Download detailed PDF reports or email them directly for your records.
                </li>
                <li>
                  <strong>Indian Market Focus:</strong> Designed specifically with Indian investors in mind, with values in ₹.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card className="calculator-container">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">How Does Stock Averaging Work?</h3>
              <div className="space-y-4 text-left">
                <p>
                  Stock averaging, also known as "rupee cost averaging" in India, is an investment strategy where you buy shares of the same stock at different price points over time. This strategy can help reduce the impact of volatility on your overall investment.
                </p>

                <h4 className="text-lg font-medium mt-4">The Formula</h4>
                <p>
                  The average purchase price is calculated using the following formula:
                </p>
                <div className="bg-gray-100 p-4 rounded-md text-center my-4">
                  <p className="font-medium">Average Price = Total Investment ÷ Total Number of Shares</p>
                </div>
                <p>
                  Where:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Total Investment = Sum of (Number of Shares × Price per Share) for each purchase</li>
                  <li>Total Number of Shares = Sum of all shares purchased</li>
                </ul>

                <h4 className="text-lg font-medium mt-4">Example</h4>
                <p>Let's say you purchased shares of Reliance Industries Limited as follows:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>First purchase: 10 shares at ₹2,000 per share (Total: ₹20,000)</li>
                  <li>Second purchase: 5 shares at ₹1,800 per share (Total: ₹9,000)</li>
                  <li>Third purchase: 8 shares at ₹2,200 per share (Total: ₹17,600)</li>
                </ul>
                <p className="mt-2">
                  Total investment = ₹20,000 + ₹9,000 + ₹17,600 = ₹46,600<br />
                  Total shares = 10 + 5 + 8 = 23 shares<br />
                  Average price = ₹46,600 ÷ 23 = ₹2,026.09 per share
                </p>

                <p className="mt-2">
                  This means that your average cost per share of Reliance Industries Limited is ₹2,026.09, regardless of the different prices at which you purchased the shares.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card className="calculator-container">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">When to Use Stock Averaging?</h3>
              <div className="space-y-4 text-left">
                <p>
                  Stock averaging is particularly useful in the following scenarios:
                </p>
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    <strong>Averaging Down:</strong> When you believe in a company's long-term prospects despite short-term price decreases, you might buy more shares at lower prices to reduce your average cost basis.
                  </li>
                  <li>
                    <strong>Regular Investments:</strong> If you're investing a fixed amount in a stock regularly (such as through SIPs in equity), your average price helps you track your overall position.
                  </li>
                  <li>
                    <strong>Portfolio Rebalancing:</strong> When adjusting your portfolio allocation, knowing your average price helps you make informed decisions about which positions to adjust.
                  </li>
                  <li>
                    <strong>Tax Planning:</strong> In India, knowing your average purchase price is essential for calculating capital gains tax when you sell shares.
                  </li>
                </ul>
                <p className="mt-2">
                  Our Stock Average Calculator simplifies this process, giving you instant access to your average purchase price and comprehensive visualizations to better understand your investment position.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
