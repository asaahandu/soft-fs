'use client';

import { useState, useEffect } from 'react';
import { useAdminContext } from '../layout';
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
  const { loadStatistics, showNotification } = useAdminContext();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch requests from database
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = '/api/service-requests';
      const params = new URLSearchParams();
      
      if (filter !== 'all') {
        params.append('status', filter);
      }
      
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors du chargement des demandes');
      }

      if (result.success) {
        setRequests(result.data || []);
      } else {
        throw new Error(result.error || 'Erreur lors du chargement des demandes');
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError(error.message);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch requests when component mounts or filters change
  useEffect(() => {
    let timeoutId;
    
    if (searchTerm) {
      // Debounce search
      timeoutId = setTimeout(() => {
        fetchRequests();
      }, 500);
    } else {
      // Immediate fetch for filter changes or no search term
      fetchRequests();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [filter, searchTerm]);

  const updateRequest = async (requestId, updates) => {
    try {
      const response = await fetch(`/api/service-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la mise à jour');
      }

      if (result.success) {
        // Update local state
        setRequests(prevRequests =>
          prevRequests.map(req =>
            req.id === requestId ? { ...req, ...result.data } : req
          )
        );
        
        // Update selected request if it's the same one
        if (selectedRequest && selectedRequest.id === requestId) {
          setSelectedRequest({ ...selectedRequest, ...result.data });
        }

        // Update statistics in layout
        loadStatistics();
        showNotification('success', 'Demande mise à jour avec succès');
      }
    } catch (error) {
      console.error('Error updating request:', error);
      showNotification('error', `Erreur lors de la mise à jour: ${error.message}`);
    }
  };

  const deleteRequest = async (requestId) => {
    try {
      const response = await fetch(`/api/service-requests/${requestId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la suppression');
      }

      if (result.success) {
        // Remove from local state
        setRequests(prevRequests =>
          prevRequests.filter(req => req.id !== requestId)
        );
        
        // Close modal if deleted request was selected
        if (selectedRequest && selectedRequest.id === requestId) {
          setShowDetails(false);
          setSelectedRequest(null);
        }

        // Update statistics in layout
        loadStatistics();
        showNotification('success', 'Demande supprimée avec succès');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
      showNotification('error', `Erreur lors de la suppression: ${error.message}`);
    }
  };

  const refreshRequests = () => {
    fetchRequests();
  };

  const serviceOptions = {
    // Contact form service names (exact matches from contact form)
    'Conception et production graphique': { label: 'Conception et production graphique', icon: '🎨', color: 'bg-purple-100 text-purple-800' },
    'Photographie & Vidéographie': { label: 'Photographie & Vidéographie', icon: '📸', color: 'bg-pink-100 text-pink-800' },
    'Sérigraphie & Impression Numérique': { label: 'Sérigraphie & Impression Numérique', icon: '🖨️', color: 'bg-orange-100 text-orange-800' },
    'Développement d\'applications Web & Mobile': { label: 'Développement d\'applications Web & Mobile', icon: '📱', color: 'bg-green-100 text-green-800' },
    'Réseau Informatique & Support utilisateur': { label: 'Réseau Informatique & Support utilisateur', icon: '🔧', color: 'bg-yellow-100 text-yellow-800' },
    'Audit des Systèmes d\'Information & Fourniture informatique': { label: 'Audit des Systèmes d\'Information & Fourniture informatique', icon: '🔍', color: 'bg-indigo-100 text-indigo-800' },
    'Autre': { label: 'Autre', icon: '💼', color: 'bg-gray-100 text-gray-800' },
  };

  // Helper function to get service configuration with fallback
  const getServiceConfig = (serviceName) => {
    if (!serviceName) return serviceOptions.other;
    
    // First try exact match
    if (serviceOptions[serviceName]) {
      return serviceOptions[serviceName];
    }
    
    // If no exact match, try to find a partial match
    const serviceKey = Object.keys(serviceOptions).find(key => 
      serviceName.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(serviceName.toLowerCase()) ||
      serviceOptions[key].label.toLowerCase().includes(serviceName.toLowerCase())
    );
    
    if (serviceKey) {
      return serviceOptions[serviceKey];
    }
    
    // If still no match, create a dynamic config for unknown services
    return {
      label: serviceName,
      icon: '💼',
      color: 'bg-gray-100 text-gray-800'
    };
  };

  const statusConfig = {
    pending: { label: 'En attente', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    'in-progress': { label: 'En cours', icon: RefreshCw, color: 'bg-blue-100 text-blue-800' },
    in_progress: { label: 'En cours', icon: RefreshCw, color: 'bg-blue-100 text-blue-800' }, // Support both formats
    completed: { label: 'Terminé', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Annulé', icon: AlertTriangle, color: 'bg-red-100 text-red-800' }
  };

  // Filter and sort requests (client-side filtering for additional criteria)
  const filteredAndSortedRequests = requests
    ?.filter(request => {
      // Note: Primary filtering is now done server-side via API
      // This is for additional client-side filtering if needed
      return true;
    })
    ?.sort((a, b) => {
      if (sortBy === 'newest') {
        const dateA = a.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) : new Date(a.createdAt);
        const dateB = b.createdAt?.seconds ? new Date(b.createdAt.seconds * 1000) : new Date(b.createdAt);
        return dateB - dateA;
      } else if (sortBy === 'oldest') {
        const dateA = a.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) : new Date(a.createdAt);
        const dateB = b.createdAt?.seconds ? new Date(b.createdAt.seconds * 1000) : new Date(b.createdAt);
        return dateA - dateB;
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
    
    let date;
    if (timestamp.seconds) {
      // Firestore timestamp
      date = new Date(timestamp.seconds * 1000);
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else {
      date = new Date(timestamp);
    }
    
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && requests.length === 0) {
    return (
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 sm:ml-4 text-sm sm:text-base text-gray-600">Chargement des demandes...</span>
        </div>
      </div>
    );
  }

  if (error && requests.length === 0) {
    return (
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 text-center">
          <AlertTriangle className="w-8 h-8 sm:w-12 sm:h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-red-900 mb-2">Erreur de chargement</h3>
          <p className="text-sm sm:text-base text-red-700 mb-4 max-w-md mx-auto">{error}</p>
          <button
            onClick={refreshRequests}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors text-sm sm:text-base"
          >
            {loading ? 'Tentative...' : 'Réessayer'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Error Banner */}
      {error && requests.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-red-900 font-medium text-sm sm:text-base">Erreur lors de l'actualisation</p>
                <p className="text-red-700 text-xs sm:text-sm break-words">{error}</p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 p-1 rounded flex-shrink-0"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Demandes de Services</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Gérez les demandes clients reçues via le formulaire</p>
          </div>
          <button
            onClick={refreshRequests}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{loading ? 'Actualisation...' : 'Actualiser'}</span>
            <span className="sm:hidden">↻</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-blue-600 text-xs sm:text-sm font-medium truncate">Total</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-900">{requests?.length || 0}</p>
              </div>
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-yellow-600 text-xs sm:text-sm font-medium truncate">En attente</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-900">
                  {requests?.filter(r => r.status === 'pending').length || 0}
                </p>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-blue-600 text-xs sm:text-sm font-medium truncate">En cours</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-900">
                  {requests?.filter(r => r.status === 'in-progress' || r.status === 'in_progress').length || 0}
                </p>
              </div>
              <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-green-600 text-xs sm:text-sm font-medium truncate">Terminées</p>
                <p className="text-xl sm:text-2xl font-bold text-green-900">
                  {requests?.filter(r => r.status === 'completed').length || 0}
                </p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-col lg:flex-row gap-3 lg:gap-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 rounded-lg px-3 py-2 text-sm min-w-0"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="in-progress">En cours</option>
                <option value="completed">Terminées</option>
                <option value="cancelled">Annulées</option>
              </select>
            </div>

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

          <div className="lg:flex-1 relative">
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
          <div className="text-center py-8 sm:py-12 px-4">
            <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Aucune demande trouvée</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              {searchTerm || filter !== 'all' 
                ? 'Aucune demande ne correspond à vos critères de recherche.'
                : 'Aucune demande de service n\'a encore été soumise.'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredAndSortedRequests.map((request) => {
              const serviceConfig = getServiceConfig(request.service);
              const StatusIcon = statusConfig[request.status]?.icon || Clock;
              
              return (
                <div key={request.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="space-y-3 sm:space-y-0 sm:flex sm:items-start sm:justify-between">
                    <div className="flex-1 min-w-0 space-y-3">
                      {/* Header with name and badges */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                          <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">{request.name}</span>
                        </div>
                        
                        {/* Badges - stacked on mobile, inline on larger screens */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${serviceConfig.color}`}>
                            <span className="mr-1">{serviceConfig.icon}</span>
                            <span className="truncate">{serviceConfig.label}</span>
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${statusConfig[request.status]?.color || statusConfig.pending.color}`}>
                            <StatusIcon className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{statusConfig[request.status]?.label || 'En attente'}</span>
                          </span>
                        </div>
                      </div>
                      
                      {/* Contact info - stacked on mobile */}
                      <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center gap-1 min-w-0">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{request.email}</span>
                        </div>
                        {request.phone && (
                          <div className="flex items-center gap-1 min-w-0">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{request.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 min-w-0">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate text-xs sm:text-sm">{formatDate(request.createdAt)}</span>
                        </div>
                      </div>

                      {/* Message preview */}
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {request.message}
                      </p>
                    </div>

                    {/* Action buttons - full width on mobile, right-aligned on desktop */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 sm:items-start sm:ml-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedRequest({
                              ...request,
                              originalNotes: request.notes || ''
                            });
                            setShowDetails(true);
                          }}
                          className="flex-1 sm:flex-none p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="w-4 h-4 mx-auto" />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteRequest(request.id)}
                          className="flex-1 sm:flex-none p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                      
                      <select
                        value={request.status || 'pending'}
                        onChange={(e) => handleStatusChange(request.id, e.target.value)}
                        className="text-xs sm:text-sm border border-gray-300 rounded-lg px-2 py-1.5 sm:px-2 sm:py-1 min-w-0"
                      >
                        <option value="pending">En attente</option>
                        <option value="in-progress">En cours</option>
                        <option value="completed">Terminé</option>
                        <option value="cancelled">Annulé</option>
                      </select>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-gray-200 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate pr-2">Détails de la demande</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 flex-shrink-0"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Client</label>
                <p className="mt-1 text-gray-900 break-words">{selectedRequest.name}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900 break-all text-sm sm:text-base">{selectedRequest.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Téléphone</label>
                  <p className="mt-1 text-gray-900">{selectedRequest.phone || 'Non renseigné'}</p>
                </div>
              </div>

              {selectedRequest.company && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Entreprise</label>
                  <p className="mt-1 text-gray-900 break-words">{selectedRequest.company}</p>
                </div>
              )}

              {(selectedRequest.budget || selectedRequest.deadline) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedRequest.budget && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Budget</label>
                      <p className="mt-1 text-gray-900">{selectedRequest.budget}</p>
                    </div>
                  )}
                  {selectedRequest.deadline && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Délai souhaité</label>
                      <p className="mt-1 text-gray-900 text-sm sm:text-base">{formatDate(selectedRequest.deadline)}</p>
                    </div>
                  )}
                </div>
              )}

              {selectedRequest.priority && selectedRequest.priority !== 'normal' && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Priorité</label>
                  <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                    selectedRequest.priority === 'high' ? 'bg-red-100 text-red-800' :
                    selectedRequest.priority === 'low' ? 'bg-gray-100 text-gray-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedRequest.priority === 'high' ? 'Haute' :
                     selectedRequest.priority === 'low' ? 'Basse' : 'Normale'}
                  </span>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-gray-700">Service demandé</label>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getServiceConfig(selectedRequest.service).color}`}>
                    {getServiceConfig(selectedRequest.service).icon} {' '}
                    {getServiceConfig(selectedRequest.service).label}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <p className="mt-1 text-gray-900 bg-gray-50 rounded-lg p-3 sm:p-4 whitespace-pre-wrap text-sm sm:text-base break-words">
                  {selectedRequest.message}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Date de création</label>
                  <p className="mt-1 text-gray-900 text-sm sm:text-base">{formatDate(selectedRequest.createdAt)}</p>
                </div>
                {selectedRequest.updatedAt && selectedRequest.updatedAt !== selectedRequest.createdAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Dernière modification</label>
                    <p className="mt-1 text-gray-900 text-sm sm:text-base">{formatDate(selectedRequest.updatedAt)}</p>
                  </div>
                )}
              </div>

              {selectedRequest.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Notes internes</label>
                  <p className="mt-1 text-gray-900 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">
                    {selectedRequest.notes}
                  </p>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Statut</label>
                  <div className="mt-2">
                    <select
                      value={selectedRequest.status || 'pending'}
                      onChange={(e) => {
                        handleStatusChange(selectedRequest.id, e.target.value);
                        setSelectedRequest({...selectedRequest, status: e.target.value});
                      }}
                      className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base"
                    >
                      <option value="pending">En attente</option>
                      <option value="in-progress">En cours</option>
                      <option value="completed">Terminé</option>
                      <option value="cancelled">Annulé</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Notes internes</label>
                  <div className="mt-2">
                    <textarea
                      value={selectedRequest.notes || ''}
                      onChange={(e) => {
                        const updatedNotes = e.target.value;
                        setSelectedRequest({...selectedRequest, notes: updatedNotes});
                      }}
                      onBlur={(e) => {
                        // Save notes when user finishes editing
                        const updatedNotes = e.target.value;
                        if (updatedNotes !== (selectedRequest.originalNotes || '')) {
                          updateRequest(selectedRequest.id, { notes: updatedNotes });
                          setSelectedRequest({...selectedRequest, originalNotes: updatedNotes});
                        }
                      }}
                      placeholder="Ajouter des notes internes..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}