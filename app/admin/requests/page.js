'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  MessageSquare, 
  Briefcase,
  CheckCircle,
  Clock,
  AlertTriangle,
  Trash2,
  Eye,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';

export default function AdminRequestsPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const serviceOptions = {
    'web-development': { label: 'Développement Web', icon: '🌐', color: 'bg-blue-100 text-blue-800' },
    'graphic-design': { label: 'Design Graphique', icon: '🎨', color: 'bg-purple-100 text-purple-800' },
    'mobile-development': { label: 'Développement Mobile', icon: '📱', color: 'bg-green-100 text-green-800' },
    'serigraphie': { label: 'Serigraphie', icon: '🖨️', color: 'bg-orange-100 text-orange-800' },
    'photography': { label: 'Photographie', icon: '📸', color: 'bg-pink-100 text-pink-800' },
    'network-support': { label: 'Support Réseau', icon: '🔧', color: 'bg-yellow-100 text-yellow-800' },
    'system-audit': { label: 'Audit Système', icon: '🔍', color: 'bg-indigo-100 text-indigo-800' },
    'other': { label: 'Autre', icon: '💼', color: 'bg-gray-100 text-gray-800' }
  };

  const statusConfig = {
    pending: { label: 'En attente', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    in_progress: { label: 'En cours', icon: RefreshCw, color: 'bg-blue-100 text-blue-800' },
    completed: { label: 'Terminé', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Annulé', icon: AlertTriangle, color: 'bg-red-100 text-red-800' }
  };

  // Filter and sort requests
  const filteredAndSortedRequests = requests
    ?.filter(request => {
      if (filter !== 'all' && request.status !== filter) return false;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          request.name?.toLowerCase().includes(searchLower) ||
          request.email?.toLowerCase().includes(searchLower) ||
          request.service?.toLowerCase().includes(searchLower) ||
          request.message?.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    ?.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt?.seconds * 1000) - new Date(a.createdAt?.seconds * 1000);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt?.seconds * 1000) - new Date(b.createdAt?.seconds * 1000);
      } else if (sortBy === 'name') {
        return a.name?.localeCompare(b.name);
      }
      return 0;
    }) || [];

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await updateRequest(requestId, { status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      try {
        await deleteRequest(requestId);
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Date inconnue';
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-gray-600">Chargement des demandes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">Erreur de chargement</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={refreshRequests}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Demandes de Services</h1>
            <p className="text-gray-600">Gérez les demandes clients reçues via le formulaire</p>
          </div>
          <button
            onClick={refreshRequests}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold text-blue-900">{requests?.length || 0}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">En attente</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {requests?.filter(r => r.status === 'pending').length || 0}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">En cours</p>
                <p className="text-2xl font-bold text-blue-900">
                  {requests?.filter(r => r.status === 'in_progress').length || 0}
                </p>
              </div>
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Terminées</p>
                <p className="text-2xl font-bold text-green-900">
                  {requests?.filter(r => r.status === 'completed').length || 0}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminées</option>
              <option value="cancelled">Annulées</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="newest">Plus récentes</option>
              <option value="oldest">Plus anciennes</option>
              <option value="name">Par nom</option>
            </select>
          </div>

          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom, email, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {filteredAndSortedRequests.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune demande trouvée</h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all' 
                ? 'Aucune demande ne correspond à vos critères de recherche.'
                : 'Aucune demande de service n\'a encore été soumise.'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredAndSortedRequests.map((request) => {
              const serviceConfig = serviceOptions[request.service] || serviceOptions.other;
              const StatusIcon = statusConfig[request.status]?.icon || Clock;
              
              return (
                <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5 text-gray-600" />
                          <span className="font-semibold text-gray-900">{request.name}</span>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${serviceConfig.color}`}>
                          {serviceConfig.icon} {serviceConfig.label}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[request.status]?.color || statusConfig.pending.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[request.status]?.label || 'En attente'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {request.email}
                        </div>
                        {request.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {request.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(request.createdAt)}
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        {request.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowDetails(true);
                        }}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir les détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <select
                        value={request.status || 'pending'}
                        onChange={(e) => handleStatusChange(request.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">En attente</option>
                        <option value="in_progress">En cours</option>
                        <option value="completed">Terminé</option>
                        <option value="cancelled">Annulé</option>
                      </select>

                      <button
                        onClick={() => handleDeleteRequest(request.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Request Details Modal */}
      {showDetails && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Détails de la demande</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Client</label>
                <p className="mt-1 text-gray-900">{selectedRequest.name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900">{selectedRequest.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Téléphone</label>
                  <p className="mt-1 text-gray-900">{selectedRequest.phone || 'Non renseigné'}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Service demandé</label>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${serviceOptions[selectedRequest.service]?.color || serviceOptions.other.color}`}>
                    {serviceOptions[selectedRequest.service]?.icon || serviceOptions.other.icon} {' '}
                    {serviceOptions[selectedRequest.service]?.label || 'Autre'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <p className="mt-1 text-gray-900 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                  {selectedRequest.message}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Date de création</label>
                <p className="mt-1 text-gray-900">{formatDate(selectedRequest.createdAt)}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <label className="text-sm font-medium text-gray-700">Statut</label>
                <div className="mt-2">
                  <select
                    value={selectedRequest.status || 'pending'}
                    onChange={(e) => {
                      handleStatusChange(selectedRequest.id, e.target.value);
                      setSelectedRequest({...selectedRequest, status: e.target.value});
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="pending">En attente</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Terminé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}