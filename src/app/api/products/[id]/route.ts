import { NextRequest, NextResponse } from 'next/server';
import { generateRandomData } from '@/lib/api/mockData';

// In-memory database (in a real app, this would be a proper database)
const mockData = generateRandomData();
const products = mockData.products;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = products.find(p => p.id === params.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: product,
      success: true
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const productIndex = products.findIndex(p => p.id === params.id);
    
    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    products[productIndex] = {
      ...products[productIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      data: products[productIndex],
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productIndex = products.findIndex(p => p.id === params.id);
    
    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    return NextResponse.json({
      data: deletedProduct,
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
