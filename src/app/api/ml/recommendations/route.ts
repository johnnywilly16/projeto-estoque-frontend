import { NextRequest, NextResponse } from 'next/server';
import { generateRandomData } from '@/lib/api/mockData';
import { InventoryML } from '@/lib/ml';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'user-1';

    // Carregar dados
    const { products, sales, events } = generateRandomData();

    // Inicializar ML engine
    const mlEngine = new InventoryML(products, sales, events);

    // Gerar recomendações
    const recommendations = mlEngine.generateRecommendations();

    // Também gerar insights de tendências
    const trends = mlEngine.analyzeTrends();

    return NextResponse.json({
      data: {
        recommendations,
        trends,
        generatedAt: new Date().toISOString(),
        userId
      },
      success: true
    });
  } catch (error) {
    console.error('Error generating ML recommendations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

