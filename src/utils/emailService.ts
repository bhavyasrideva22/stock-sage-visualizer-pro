
import { toast } from "sonner";

interface StockPurchase {
  id: string;
  quantity: number;
  price: number;
}

interface EmailData {
  to: string;
  stockName: string;
  stockPurchases: StockPurchase[];
  averagePrice: number;
  totalShares: number;
  totalInvestment: number;
}

// In a real application, this would make a server request
// For now, we'll simulate successful email sending
export const sendEmail = (data: EmailData) => {
  try {
    const { to, stockName, stockPurchases, averagePrice, totalShares, totalInvestment } = data;
    
    // In a real implementation, you would call your backend API here
    console.log(`Sending email to ${to} with stock average data for ${stockName}`);
    
    // Log the data that would be sent
    console.log({
      to,
      stockName,
      stockPurchases,
      averagePrice,
      totalShares,
      totalInvestment,
    });
    
    // Simulate API call success
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    toast.error("Failed to send email. Please try again.");
    return false;
  }
};
