import { NextRequest, NextResponse } from 'next/server';
import { generateRandomData } from '@/lib/api/mockData';
import { SearchSuggestion } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '8');

    if (query.length < 2) {
      return NextResponse.json({
        data: [],
        success: true
      });
    }

    const { products, categories } = generateRandomData();
    const suggestions: SearchSuggestion[] = [];

    // Search in products
    products.forEach(product => {
      const titleMatch = product.title.toLowerCase().includes(query.toLowerCase());
      const skuMatch = product.sku.toLowerCase().includes(query.toLowerCase());
      
      if (titleMatch || skuMatch) {
        const score = titleMatch ? 0.9 : 0.7; // Title matches get higher score
        
        suggestions.push({
          id: product.id,
          type: skuMatch ? 'sku' : 'product',
          title: product.title,
          subtitle: `SKU: ${product.sku} | Estoque: ${product.stock}`,
          score
        });
      }
    });

    // Search in categories
    categories.forEach(category => {
      if (category.name.toLowerCase().includes(query.toLowerCase())) {
        const productsInCategory = products.filter(p => p.categoryId === category.id).length;
        
        suggestions.push({
          id: category.id,
          type: 'category',
          title: category.name,
          subtitle: `${productsInCategory} produtos`,
          score: 0.6
        });
      }
    });

    // Sort by score and limit results
    const sortedSuggestions = suggestions
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return NextResponse.json({
      data: sortedSuggestions,
      success: true
    });
  } catch (error) {
    console.error('Error generating search suggestions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate search suggestions' },
      { status: 500 }
    );
  }
}

