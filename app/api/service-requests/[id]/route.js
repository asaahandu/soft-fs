import { NextResponse } from 'next/server';
import { serviceRequestsAPI } from '../../../../lib/firestore';

// GET - Fetch a single service request by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID de la demande requis' 
        },
        { status: 400 }
      );
    }

    const serviceRequest = await serviceRequestsAPI.getById(id);

    return NextResponse.json({
      success: true,
      data: serviceRequest
    });

  } catch (error) {
    console.error('Error fetching service request:', error);
    
    if (error.message.includes('non trouvée')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Demande de service non trouvée' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Erreur lors du chargement de la demande' 
      },
      { status: 500 }
    );
  }
}

// PATCH - Update a service request
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID de la demande requis' 
        },
        { status: 400 }
      );
    }

    // Validate status if provided
    if (body.status) {
      const validStatuses = ['pending', 'in-progress', 'completed', 'cancelled'];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Statut invalide. Valeurs autorisées: ' + validStatuses.join(', ') 
          },
          { status: 400 }
        );
      }
    }

    // Validate email if provided
    if (body.email) {
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
    }

    // Prepare update data (only include fields that are present)
    const updateData = {};
    const allowedFields = ['status', 'name', 'email', 'phone', 'service', 'message', 'company', 'budget', 'deadline', 'priority', 'notes'];
    
    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updateData[field] = typeof body[field] === 'string' ? body[field].trim() : body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Aucune donnée à mettre à jour' 
        },
        { status: 400 }
      );
    }

    const updatedRequest = await serviceRequestsAPI.update(id, updateData);

    return NextResponse.json({
      success: true,
      data: updatedRequest,
      message: 'Demande de service mise à jour avec succès'
    });

  } catch (error) {
    console.error('Error updating service request:', error);
    
    if (error.message.includes('non trouvée')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Demande de service non trouvée' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Erreur lors de la mise à jour de la demande' 
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete a service request
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID de la demande requis' 
        },
        { status: 400 }
      );
    }

    await serviceRequestsAPI.delete(id);

    return NextResponse.json({
      success: true,
      message: 'Demande de service supprimée avec succès'
    });

  } catch (error) {
    console.error('Error deleting service request:', error);
    
    if (error.message.includes('non trouvée')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Demande de service non trouvée' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Erreur lors de la suppression de la demande' 
      },
      { status: 500 }
    );
  }
}