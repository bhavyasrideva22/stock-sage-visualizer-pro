
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface StockPurchase {
  id: string;
  quantity: number;
  price: number;
}

interface StockVisualizationProps {
  stockPurchases: StockPurchase[];
  averagePrice: number;
  stockName: string;
}

const StockVisualization: React.FC<StockVisualizationProps> = ({ 
  stockPurchases, 
  averagePrice,
  stockName
}) => {
  // Format data for bar chart
  const barChartData = stockPurchases.map((purchase, index) => ({
    name: `Purchase ${index + 1}`,
    price: purchase.price,
    quantity: purchase.quantity,
    investment: purchase.price * purchase.quantity
  }));

  // Format data for pie chart
  const pieChartData = stockPurchases.map((purchase, index) => ({
    name: `Purchase ${index + 1}`,
    value: purchase.quantity * purchase.price
  }));

  // Calculate total investment and share distribution
  const totalInvestment = stockPurchases.reduce(
    (sum, purchase) => sum + purchase.quantity * purchase.price, 
    0
  );

  const totalShares = stockPurchases.reduce(
    (sum, purchase) => sum + purchase.quantity, 
    0
  );

  // Format data for line chart (price trend)
  const lineChartData = stockPurchases.map((purchase, index) => ({
    name: `Purchase ${index + 1}`,
    price: purchase.price
  }));

  // Add average price point to line chart
  lineChartData.push({
    name: 'Average',
    price: averagePrice
  });

  // Colors
  const COLORS = ['#245e4f', '#7ac9a7', '#e9c46a', '#4a8fe7', '#f94144', '#f3722c', '#f8961e', '#f9c74f'];
  
  const formatIndianRupee = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`tooltip-${index}`} style={{ color: entry.color }}>
              {entry.name === 'price' && `Price: ${formatIndianRupee(entry.value)}`}
              {entry.name === 'quantity' && `Quantity: ${entry.value}`}
              {entry.name === 'investment' && `Investment: ${formatIndianRupee(entry.value)}`}
              {entry.name === 'value' && `Investment: ${formatIndianRupee(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Visualization: {stockName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Price Comparison Chart */}
          <div>
            <h4 className="text-md font-medium mb-2">Price Comparison</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `₹${value.toLocaleString()}`} 
                    domain={[0, 'dataMax + 500']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="price" name="Price per Share" fill="#245e4f" />
                  <ReferenceLine y={averagePrice} stroke="#e9c46a" strokeDasharray="3 3" label={{ value: 'Avg. Price', fill: '#333', fontSize: 12 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Investment Distribution Chart */}
            <div>
              <h4 className="text-md font-medium mb-2">Investment Distribution</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Price Trend Chart */}
            <div>
              <h4 className="text-md font-medium mb-2">Price Trend</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#7ac9a7" 
                      activeDot={{ r: 8 }}
                      strokeWidth={2} 
                    />
                    <ReferenceLine 
                      y={averagePrice} 
                      stroke="#e9c46a" 
                      strokeDasharray="3 3" 
                      label={{ value: 'Average', position: 'insideBottomRight', fill: '#333', fontSize: 12 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockVisualization;
