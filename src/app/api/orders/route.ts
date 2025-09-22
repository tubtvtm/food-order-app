import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      // Return all orders for admin
      const orders = await prisma.order.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json(orders);
    }

    // Return orders for specific user
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    
    const order = await prisma.order.create({
      data: {
        userId: orderData.userId,
        customerEmail: orderData.customerEmail,
        customerName: orderData.customerName,
        items: orderData.items,
        total: orderData.total,
        status: orderData.status || 'PENDING',
        paymentMethod: orderData.paymentMethod,
        customerNote: orderData.customerNote
      },
      include: { user: true }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    
    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { user: true }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Failed to update order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}