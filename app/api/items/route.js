import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await getDb();
    const items = await db.collection('items').find().toArray();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const db = await getDb();
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.type) {
      return NextResponse.json(
        { error: 'Name and type are required' },
        { status: 400 }
      );
    }

    const result = await db.collection('items').insertOne(data);
    return NextResponse.json(
      { message: 'Item added successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add item' },
      { status: 500 }
    );
  }
}