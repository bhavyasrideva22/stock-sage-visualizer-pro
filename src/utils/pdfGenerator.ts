
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

interface StockPurchase {
  id: string;
  quantity: number;
  price: number;
}

interface PDFData {
  stockName: string;
  stockPurchases: StockPurchase[];
  averagePrice: number;
  totalShares: number;
  totalInvestment: number;
}

export const generatePDF = (data: PDFData) => {
  try {
    const { stockName, stockPurchases, averagePrice, totalShares, totalInvestment } = data;
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString('en-IN');
    
    // Add logo and header
    doc.setFillColor(36, 94, 79); // #245e4f
    doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("Stock Sage Visualizer Pro", 105, 15, { align: "center" });
    
    // Report title
    doc.setFont("helvetica", "bold");
    doc.setTextColor(36, 94, 79);
    doc.setFontSize(18);
    doc.text(`Stock Average Report: ${stockName}`, 105, 40, { align: "center" });
    
    // Report date
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 105, 48, { align: "center" });
    
    // Summary box
    doc.setFillColor(248, 248, 248); // light background
    doc.setDrawColor(200, 200, 200);
    doc.roundedRect(14, 55, 182, 40, 3, 3, 'FD');
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(36, 94, 79);
    doc.setFontSize(12);
    doc.text("Summary", 20, 65);
    
    // Format values
    const formattedAverage = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(averagePrice);
    
    const formattedTotal = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(totalInvestment);
    
    // Add summary details
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    
    doc.text(`Average Purchase Price: ${formattedAverage}`, 20, 75);
    doc.text(`Total Shares: ${totalShares.toLocaleString('en-IN')}`, 20, 85);
    doc.text(`Total Investment: ${formattedTotal}`, 20, 95);
    
    // Purchases table data
    const tableColumn = ["Purchase #", "Quantity", "Price per Share (₹)", "Investment (₹)"];
    const tableRows = stockPurchases.map((purchase, index) => {
      const investment = purchase.quantity * purchase.price;
      return [
        `${index + 1}`,
        purchase.quantity.toLocaleString('en-IN'),
        purchase.price.toLocaleString('en-IN'),
        investment.toLocaleString('en-IN')
      ];
    });
    
    // Add purchases table
    doc.setFont("helvetica", "bold");
    doc.setTextColor(36, 94, 79);
    doc.setFontSize(12);
    doc.text("Purchase History", 20, 115);
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 120,
      theme: 'grid',
      styles: { 
        fontSize: 10,
        cellPadding: 3,
        lineColor: [200, 200, 200]
      },
      headStyles: {
        fillColor: [36, 94, 79],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 248, 248]
      }
    });
    
    // Add footer
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text("This report is for informational purposes only. Not financial advice.", 105, finalY, { align: "center" });
    
    doc.setFontSize(9);
    doc.text("© Stock Sage Visualizer Pro", 105, finalY + 10, { align: "center" });
    
    // Save the PDF
    doc.save(`${stockName.replace(/\s+/g, '_')}_Stock_Average_Report.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Failed to generate PDF. Please try again.");
  }
};
