import { NextResponse } from 'next/server';
import { generateRandomData } from '../../../../lib/api/mockData';
import { DashboardMetrics } from '../../../../types';

export async function GET() {
  try {
    const { products, sales } = generateRandomData();

    // Calculate metrics
    const totalRevenue = sales.reduce((sum, sale) => sum + (sale.qty * sale.unitPrice), 0);
    const totalSales = sales.reduce((sum, sale) => sum + sale.qty, 0);
    const activeProducts = products.filter(p => p.stock > 0).length;
    const lowStockProducts = products.filter(p => p.stock <= 10).length;

    // Calculate growth (simulated - in real app would compare with previous period)
    const revenueGrowth = 15.2; // Simulated 15.2% growth
    const salesGrowth = 8.7; // Simulated 8.7% growth

    // Calculate profit margin
    const totalCost = sales.reduce((sum, sale) => {
      const product = products.find(p => p.id === sale.productId);
      return sum + (product ? product.costPrice * sale.qty : 0);
    }, 0);
    
    const profitMargin = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue) * 100 : 0;

    const metrics: DashboardMetrics = {
      totalRevenue,
      totalSales,
      totalProducts: products.length,
      activeProducts,
      lowStockProducts,
      revenueGrowth,
      salesGrowth,
      profitMargin
    };

    return NextResponse.json({
      data: metrics,
      success: true
    });
  } catch (error) {
    console.error('Error generating dashboard metrics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate dashboard metrics' },
      { status: 500 }
    );
  }
}

