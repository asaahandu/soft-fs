import { NextResponse } from 'next/server';
import { getDocument, updateDocument, deleteDocument } from '../../../../lib/firestore';

// Handle GET request - Get a specific service request
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const serviceRequest = await getDocument('serviceRequests', id);
    
    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ serviceRequest }, { status: 200 });
  } catch (error) {
    console.error('Error fetching service request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service request' },
      { status: 500 }
    );
  }
}

// Handle PUT request - Update a service request
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    await updateDocument('serviceRequests', id, body);

    return NextResponse.json(
      { message: 'Service request updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating service request:', error);
    return NextResponse.json(
      { error: 'Failed to update service request' },
      { status: 500 }
    );
  }
}

// Handle DELETE request - Delete a service request
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await deleteDocument('serviceRequests', id);

    return NextResponse.json(
      { message: 'Service request deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting service request:', error);
    return NextResponse.json(
      { error: 'Failed to delete service request' },
      { status: 500 }
    );
  }
}