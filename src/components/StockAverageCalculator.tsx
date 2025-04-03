
import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Mail, Download, Plus, Trash2, HelpCircle } from 'lucide-react';
import StockVisualization from './StockVisualization';
import { generatePDF } from '@/utils/pdfGenerator';
import { sendEmail } from '@/utils/emailService';

interface StockPurchase {
  id: string;
  quantity: number;
  price: number;
}

const StockAverageCalculator: React.FC = () => {
  const { toast } = useToast();
  const [stockName, setStockName] = useState<string>('');
  const [stockPurchases, setStockPurchases] = useState<StockPurchase[]>([
    { id: '1', quantity: 0, price: 0 },
    { id: '2', quantity: 0, price: 0 },
  ]);
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const [totalShares, setTotalShares] = useState<number | null>(null);
  const [totalInvestment, setTotalInvestment] = useState<number | null>(null);
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const addStockPurchase = () => {
    const newId = (parseInt(stockPurchases[stockPurchases.length - 1].id) + 1).toString();
    setStockPurchases([...stockPurchases, { id: newId, quantity: 0, price: 0 }]);
  };

  const removeStockPurchase = (id: string) => {
    if (stockPurchases.length <= 2) {
      toast({
        title: "Cannot Remove",
        description: "You need at least two stock purchases for comparison.",
        variant: "destructive"
      });
      return;
    }
    setStockPurchases(stockPurchases.filter(purchase => purchase.id !== id));
  };

  const updateStockPurchase = (id: string, field: 'quantity' | 'price', value: number) => {
    setStockPurchases(
      stockPurchases.map(purchase => 
        purchase.id === id ? { ...purchase, [field]: value } : purchase
      )
    );
  };

  const calculateAverage = () => {
    if (!stockName.trim()) {
      toast({
        title: "Stock Name Required",
        description: "Please enter a stock name before calculating.",
        variant: "destructive"
      });
      return;
    }

    // Validate all inputs
    let isValid = true;
    stockPurchases.forEach(purchase => {
      if (purchase.quantity <= 0 || purchase.price <= 0) {
        isValid = false;
      }
    });

    if (!isValid) {
      toast({
        title: "Invalid Input",
        description: "All quantities and prices must be greater than zero.",
        variant: "destructive"
      });
      return;
    }

    // Calculate average price
    const totalQuantity = stockPurchases.reduce((sum, purchase) => sum + purchase.quantity, 0);
    const totalCost = stockPurchases.reduce((sum, purchase) => sum + (purchase.quantity * purchase.price), 0);
    const average = totalCost / totalQuantity;

    setAveragePrice(average);
    setTotalShares(totalQuantity);
    setTotalInvestment(totalCost);
    setIsCalculated(true);

    // Scroll to results
    setTimeout(() => {
      resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDownloadPDF = () => {
    if (!isCalculated) {
      toast({
        title: "No Results",
        description: "Please calculate results before downloading.",
        variant: "destructive"
      });
      return;
    }

    generatePDF({
      stockName,
      stockPurchases,
      averagePrice: averagePrice || 0,
      totalShares: totalShares || 0,
      totalInvestment: totalInvestment || 0
    });

    toast({
      title: "Download Started",
      description: "Your PDF report is being downloaded.",
    });
  };

  const handleSendEmail = () => {
    if (!isCalculated) {
      toast({
        title: "No Results",
        description: "Please calculate results before sending email.",
        variant: "destructive"
      });
      return;
    }

    if (!emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    sendEmail({
      to: emailAddress,
      stockName,
      stockPurchases,
      averagePrice: averagePrice || 0,
      totalShares: totalShares || 0,
      totalInvestment: totalInvestment || 0
    });

    toast({
      title: "Email Sent",
      description: `Results have been sent to ${emailAddress}.`,
    });
  };

  const formatIndianRupee = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="calculator-container">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl gradient-text">Stock Average Calculator</CardTitle>
          <CardDescription>
            Calculate your average purchase price across multiple stock buys
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="results" disabled={!isCalculated}>Results</TabsTrigger>
            </TabsList>
            <TabsContent value="calculator" className="space-y-6">
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="stockName" className="form-label">Stock Name</Label>
                  <Input
                    id="stockName"
                    placeholder="Enter stock name (e.g., HDFC Bank)"
                    value={stockName}
                    onChange={(e) => setStockName(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Stock Purchases</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Enter the quantity and price for each of your stock purchases. You can add more entries if needed.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {stockPurchases.map((purchase, index) => (
                    <div key={purchase.id} className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-1 text-center text-sm font-medium">{index + 1}</div>
                      <div className="col-span-5 md:col-span-5">
                        <Label htmlFor={`quantity-${purchase.id}`} className="sr-only">Quantity</Label>
                        <Input
                          id={`quantity-${purchase.id}`}
                          type="number"
                          placeholder="Quantity"
                          min="1"
                          value={purchase.quantity || ''}
                          onChange={(e) => updateStockPurchase(purchase.id, 'quantity', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-5 md:col-span-5">
                        <Label htmlFor={`price-${purchase.id}`} className="sr-only">Price (₹)</Label>
                        <Input
                          id={`price-${purchase.id}`}
                          type="number"
                          placeholder="Price per share (₹)"
                          min="0.01"
                          step="0.01"
                          value={purchase.price || ''}
                          onChange={(e) => updateStockPurchase(purchase.id, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStockPurchase(purchase.id)}
                          disabled={stockPurchases.length <= 2}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={addStockPurchase}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Another Purchase
                  </Button>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  onClick={calculateAverage}
                >
                  Calculate Average Price
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="results" ref={resultsSectionRef}>
              {isCalculated && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Average Price</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-primary">{formatIndianRupee(averagePrice || 0)}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Total Shares</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-primary">{totalShares?.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Total Investment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-primary">{formatIndianRupee(totalInvestment || 0)}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <StockVisualization 
                    stockPurchases={stockPurchases}
                    averagePrice={averagePrice || 0}
                    stockName={stockName}
                  />

                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <h3 className="text-lg font-medium">Share Results</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="email" className="form-label">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                        />
                      </div>
                      <div className="flex space-x-2 items-end">
                        <Button 
                          onClick={handleSendEmail} 
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          <Mail className="mr-2 h-4 w-4" /> Send Email
                        </Button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button 
                        onClick={handleDownloadPDF} 
                        className="w-full cta-button"
                      >
                        <Download className="mr-2 h-4 w-4" /> Download PDF Report
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockAverageCalculator;
