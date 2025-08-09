import { NextRequest, NextResponse } from 'next/server';
import { generateRandomData } from '@/lib/api/mockData';
import { Product } from '@/types';

// In-memory database (in a real app, this would be a proper database)
const { products } = generateRandomData();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'title';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    let filteredProducts = [...products];

    // Filter by query
    if (query) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.categoryId === category
      );
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      const aValue = a[sortBy as keyof Product];
      const bValue = b[sortBy as keyof Product];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const aValueLower = aValue.toLowerCase();
        const bValueLower = bValue.toLowerCase();
        
        if (sortOrder === 'desc') {
          return aValueLower > bValueLower ? -1 : aValueLower < bValueLower ? 1 : 0;
        } else {
          return aValueLower < bValueLower ? -1 : aValueLower > bValueLower ? 1 : 0;
        }
      }

      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });

    // Pagination
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedProducts,
      total: totalProducts,
      page,
      limit,
      totalPages,
      success: true
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);

    return NextResponse.json({
      data: newProduct,
      success: true,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
