import { NextResponse } from 'next/server';
import { createDocument, getDocuments } from '../../../lib/firestore';

// Handle POST request - Create a new service request
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, service, message } = body;
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the service request in Firestore
    const docId = await createDocument('serviceRequests', {
      name,
      email,
      service,
      message,
      status: 'pending'
    });

    return NextResponse.json(
      { 
        message: 'Service request created successfully',
        id: docId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json(
      { error: 'Failed to create service request' },
      { status: 500 }
    );
  }
}

// Handle GET request - Get all service requests
export async function GET() {
  try {
    const requests = await getDocuments('serviceRequests', {
      orderBy: ['createdAt', 'desc']
    });

    return NextResponse.json({ requests }, { status: 200 });
  } catch (error) {
    console.error('Error fetching service requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service requests' },
      { status: 500 }
    );
  }
}