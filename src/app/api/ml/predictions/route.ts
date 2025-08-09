import { NextRequest, NextResponse } from 'next/server';
import { generateRandomData } from '@/lib/api/mockData';
import { InventoryML } from '@/lib/ml';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, timeframe = 'month' } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Carregar dados
    const { products, sales, events } = generateRandomData();

    // Inicializar ML engine
    const mlEngine = new InventoryML(products, sales, events);

    // Gerar predição
    const prediction = mlEngine.predictSales(productId, timeframe);

    return NextResponse.json({
      data: prediction,
      success: true
    });
  } catch (error) {
    console.error('Error generating prediction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate prediction' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = (searchParams.get('timeframe') as 'week' | 'month' | 'quarter') || 'month';

    // Carregar dados
    const { products, sales, events } = generateRandomData();

    // Inicializar ML engine
    const mlEngine = new InventoryML(products, sales, events);

    // Gerar predições para os top produtos
    const topProducts = products
      .filter(p => sales.some(s => s.productId === p.id))
      .slice(0, 10);

    const predictions = topProducts.map(product => {
      try {
        return mlEngine.predictSales(product.id, timeframe);
      } catch (error) {
        return {
          productId: product.id,
          predictedSales: 0,
          confidence: 0,
          factors: ['Erro na predição'],
          timeframe
        };
      }
    });

    return NextResponse.json({
      data: predictions,
      success: true
    });
  } catch (error) {
    console.error('Error generating predictions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate predictions' },
      { status: 500 }
    );
  }
}

