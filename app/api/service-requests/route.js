import { NextResponse } from 'next/server';
import { serviceRequestsAPI } from '../../../lib/firestore';

// GET - Fetch all service requests or search
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let requests;

    if (search) {
      requests = await serviceRequestsAPI.search(search);
    } else if (status) {
      requests = await serviceRequestsAPI.getByStatus(status);
    } else {
      requests = await serviceRequestsAPI.getAll();
    }

    return NextResponse.json({
      success: true,
      data: requests,
      count: requests.length
    });
  } catch (error) {
    console.error('Error fetching service requests:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Erreur lors du chargement des demandes' 
      },
      { status: 500 }
    );
  }
}

// POST - Create a new service request
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'service', 'message'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Champs requis manquants: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Format d\'email invalide' 
        },
        { status: 400 }
      );
    }

    // Create the service request
    const newRequest = await serviceRequestsAPI.create({
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone?.trim() || null,
      service: body.service.trim(),
      message: body.message.trim(),
      company: body.company?.trim() || null,
      budget: body.budget?.trim() || null,
      deadline: body.deadline || null,
      priority: body.priority || 'normal'
    });

    return NextResponse.json({
      success: true,
      data: newRequest,
      message: 'Demande de service créée avec succès'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Erreur lors de la création de la demande' 
      },
      { status: 500 }
    );
  }
}