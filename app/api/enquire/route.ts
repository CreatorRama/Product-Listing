import { getDb } from '@/lib/db';
import { sendEnquiryEmail } from '@/lib/email';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const { itemId, userEmail } = await request.json();
    
    if (!itemId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields (itemId or userEmail)' },
        { status: 400 }
      );
    }

    // Fetch item from database
    const db = await getDb();
    const item = await db.collection('items').findOne({ 
      _id: new ObjectId(itemId) 
    });
    
    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Send email with retry logic
    let retries = 3;
    let emailSent = false;
    let lastError: unknown = null;
    
    while (retries > 0 && !emailSent) {
      try {
        emailSent = await sendEnquiryEmail(item, userEmail);
        if (!emailSent) {
          throw new Error('Email sending returned false');
        }
      } catch (error) {
        lastError = error;
        retries--;
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }

    if (!emailSent) {
      console.error('Final email send failure:', lastError);
      const errorDetails = lastError instanceof Error ? lastError.message : String(lastError);
      return NextResponse.json(
        { error: 'Failed to send email after multiple attempts', details: errorDetails },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Enquiry sent successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Enquiry processing error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}