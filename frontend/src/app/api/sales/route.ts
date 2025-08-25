import { NextRequest, NextResponse } from 'next/server';
import { generateRandomData } from '../../../lib/api/mockData';
import { Sale } from '../../../types';

// In-memory database
const mockData = generateRandomData();
const products = mockData.products;
const sales = mockData.sales;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');

    let filteredSales = [...sales];

    // Filter by date range if provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      filteredSales = filteredSales.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        return saleDate >= start && saleDate <= end;
      });
    }

    // Sort by most recent first
    filteredSales.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Limit results
    const limitedSales = filteredSales.slice(0, limit);

    return NextResponse.json({
      data: limitedSales,
      success: true
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sales' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const saleData = await request.json();
    
    // Validate required fields
    if (!saleData.productId || !saleData.qty || !saleData.unitPrice) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if product exists and has enough stock
    const product = products.find(p => p.id === saleData.productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.stock < saleData.qty) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Create new sale
    const newSale: Sale = {
      id: crypto.randomUUID(),
      ...saleData,
      timestamp: new Date().toISOString(),
    };

    // Update product stock
    product.stock -= saleData.qty;
    product.updatedAt = new Date().toISOString();

    // Add sale to database
    sales.push(newSale);

    return NextResponse.json({
      data: newSale,
      success: true,
      message: 'Sale created successfully'
    });
  } catch (error) {
    console.error('Error creating sale:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create sale' },
      { status: 500 }
    );
  }
}
