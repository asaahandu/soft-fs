'use client';
import { useState, useEffect } from 'react';
import { useAdminContext } from './layout';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Globe,
  Smartphone,
  Palette,
  Code,
  Camera,
  Network,
  Shield,
  Printer
} from 'lucide-react';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

// Service icons mapping
const serviceIcons = {
  "Conception et production graphique": Palette,
  "Photographie & Vidéographie": Camera,
  "Sérigraphie et Impression Numérique": Printer,
  "Développement d'applications Web et Mobile": Code,
  "Réseau informatique & Support utilisateur": Network,
  "Audit des Systèmes d'Information & Fourniture informatiques": Shield,
  // Additional mappings for variations
  "Design Graphique": Palette,
  "Développement Web": Globe,
  "Développement Mobile": Smartphone,
  "Développement d'Applications Mobiles": Smartphone,
  "Photographie": Camera,
  "Support IT": Network,
  "Graphisme": Palette,
  "Web Development": Globe,
  "Mobile Development": Smartphone
};

export default function AdminDashboard() {
  const { stats, loadStatistics, showNotification } = useAdminContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Real data state
  const [data, setData] = useState({
    recentRequests: [],
    analytics: {
      requestsByService: [],
      monthlyTrends: []
    }
  });

  // Fetch detailed data from API
  const fetchDetailedData = async () => {
    try {
      setRequestsLoading(true);
      setError(null);
      
      const response = await fetch('/api/service-requests');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données');
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const requests = result.data;
        
        // Calculate service analytics
        const serviceMap = {};
        requests.forEach(req => {
          if (req.service) {
            serviceMap[req.service] = (serviceMap[req.service] || 0) + 1;
          }
        });
        
        const requestsByService = Object.entries(serviceMap)
          .map(([service, count]) => ({
            service,
            count,
            percentage: requests.length > 0 ? Math.round((count / requests.length) * 100) : 0
          }))
          .sort((a, b) => b.count - a.count);
        
        // Calculate monthly trends (basic implementation)
        const currentMonth = new Date().getMonth();
        const monthlyTrends = [];
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        
        for (let i = 0; i < 6; i++) {
          const monthIndex = (currentMonth - 5 + i + 12) % 12;
          const monthRequests = requests.filter(req => {
            const requestDate = new Date(req.createdAt);
            return requestDate.getMonth() === monthIndex;
          });
          
          monthlyTrends.push({
            month: months[monthIndex],
            requests: monthRequests.length,
            completed: monthRequests.filter(req => req.status === 'completed').length
          });
        }
        
        setData({
          recentRequests: requests,
          analytics: {
            requestsByService,
            monthlyTrends
          }
        });
      }
    } catch (err) {
      console.error('Error fetching detailed data:', err);
      setError(err.message);
      showNotification('error', 'Erreur lors du chargement des données');
    } finally {
      setRequestsLoading(false);
    }
  };

  // Fetch detailed data on component mount
  useEffect(() => {
    fetchDetailedData();
  }, []);

  // Handle request update
  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const response = await fetch(`/api/service-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh data
        fetchDetailedData();
        loadStatistics();
        showNotification('success', 'Statut mis à jour avec succès');
      } else {
        console.error('Failed to update request status');
        showNotification('error', 'Erreur lors de la mise à jour du statut');
      }
    } catch (error) {
      console.error('Error updating request:', error);
      showNotification('error', 'Erreur lors de la mise à jour');
    }
  };

  // Handle request deletion
  const deleteRequest = async (requestId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande?')) {
      return;
    }

    try {
      const response = await fetch(`/api/service-requests/${requestId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh data
        fetchDetailedData();
        loadStatistics();
        showNotification('success', 'Demande supprimée avec succès');
      } else {
        console.error('Failed to delete request');
        showNotification('error', 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
      showNotification('error', 'Erreur lors de la suppression');
    }
  };

  // Filter requests based on search and status
  const filteredRequests = data.recentRequests.filter(request => {
    const matchesSearch = (request.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (request.service || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (request.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (request.company || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return AlertCircle;
      case 'in_progress': return Clock;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return AlertCircle;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateInput) => {
    if (!dateInput) return 'Date inconnue';
    
    try {
      const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Date invalide';
    }
  };

  // Request Detail Modal Component
  const RequestDetailModal = ({ request, isOpen, onClose }) => {
    if (!isOpen || !request) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Détails de la demande</h3>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{request.name || 'Non fourni'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{request.email || 'Non fourni'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{request.phone || 'Non fourni'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{request.company || 'Non fournie'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{request.service || 'Non spécifié'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de création</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{formatDate(request.createdAt)}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{request.message || 'Aucun message fourni'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    deleteRequest(request.id);
                    onClose();
                  }}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (requestsLoading && data.recentRequests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-eduka-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 shadow-sm border border-gray-100 max-w-md mx-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => {
              fetchDetailedData();
              loadStatistics();
            }}
            className="bg-eduka-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Admin Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tableau de Bord</h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Vue d'ensemble de vos activités et performances</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                {stats.pendingRequests > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {stats.pendingRequests}
                  </span>
                )}
              </button>
              <button 
                onClick={() => {
                  fetchDetailedData();
                  loadStatistics();
                }}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                title="Actualiser les données"
              >
                <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        <div>
          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6">
            {/* Mobile menu button */}
            <div className="sm:hidden mb-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between p-3 text-gray-700 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {(() => {
                    const currentTab = [
                      { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
                      { id: 'requests', label: 'Demandes', icon: FileText },
                      { id: 'analytics', label: 'Analyses', icon: TrendingUp },
                    ].find(tab => tab.id === activeTab);
                    const IconComponent = currentTab?.icon || BarChart3;
                    return (
                      <>
                        <IconComponent className="w-4 h-4" />
                        <span className="font-medium">{currentTab?.label || 'Menu'}</span>
                      </>
                    );
                  })()}
                </div>
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            
            {/* Mobile dropdown menu */}
            <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:flex sm:space-x-2 space-y-2 sm:space-y-0`}>
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
                { id: 'requests', label: 'Demandes', icon: FileText },
                { id: 'analytics', label: 'Analyses', icon: TrendingUp },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full sm:w-auto py-3 px-4 rounded-lg font-medium text-sm flex items-center gap-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-eduka-blue to-blue-700 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Demandes</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 flex-shrink-0" />
                  <span className="text-green-600 font-medium">+12%</span>
                  <span className="text-gray-500 ml-1 truncate">ce mois</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">En Attente</p>
                    <p className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.pendingRequests}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1 flex-shrink-0" />
                  <span className="text-yellow-600 font-medium">+5</span>
                  <span className="text-gray-500 ml-1 truncate">aujourd'hui</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Clients Actifs</p>
                    <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.totalRequests > 0 ? new Set(data.recentRequests.map(req => req.email)).size : 0}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 mr-1 flex-shrink-0" />
                  <span className="text-purple-600 font-medium">+15%</span>
                  <span className="text-gray-500 ml-1 truncate">ce mois</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Demandes Récentes</h3>
                  <button className="text-eduka-blue hover:text-blue-700 text-xs sm:text-sm font-medium">
                    Voir tout
                  </button>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {data.recentRequests.slice(0, 5).map((request) => {
                    const StatusIcon = getStatusIcon(request.status);
                    return (
                      <div key={request.id} className="flex items-center gap-3 sm:gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-eduka-blue rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {(request.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{request.name || 'Nom non fourni'}</p>
                          <p className="text-xs text-gray-500 truncate">{request.service || 'Service non spécifié'}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 flex-shrink-0">
                          <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs text-gray-500 hidden sm:inline">
                            {request.createdAt ? formatDate(request.createdAt) : 'Date inconnue'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {data.recentRequests.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Aucune demande récente</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Services Demandés</h3>
                  <button className="text-eduka-blue hover:text-blue-700 text-xs sm:text-sm font-medium">
                    Détails
                  </button>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {data.analytics.requestsByService.length > 0 ? 
                    data.analytics.requestsByService.map((service, index) => {
                      const ServiceIcon = serviceIcons[service.service] || Code;
                      return (
                        <div key={index} className="flex items-center gap-3 sm:gap-4">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-eduka-blue to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ServiceIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs sm:text-sm font-medium text-gray-900 truncate pr-2">{service.service}</span>
                              <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{service.count}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-eduka-blue to-blue-700 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${service.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-center py-8">
                        <BarChart3 className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Aucune donnée de service</p>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-4">
                <div className="w-full relative">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, email ou service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eduka-blue focus:border-transparent"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-eduka-blue focus:border-transparent"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Terminé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                  <button className="w-full sm:w-auto bg-eduka-blue text-white px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtrer
                  </button>
                </div>
              </div>
            </div>

            {/* Requests Table - Desktop */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Client</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Service</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Date</th>
                      <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRequests.map((request) => {
                      const StatusIcon = getStatusIcon(request.status);
                      const ServiceIcon = serviceIcons[request.service] || Code;
                      return (
                        <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-eduka-blue rounded-full flex items-center justify-center text-white font-semibold">
                                {(request.name || 'U').charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{request.name || 'Nom non fourni'}</p>
                                <p className="text-xs text-gray-500">{request.email || 'Email non fourni'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <ServiceIcon className="w-4 h-4 text-eduka-blue" />
                              <span className="text-sm text-gray-900">{request.service || 'Service non spécifié'}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-gray-900">{formatDate(request.createdAt)}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => setSelectedRequest(request)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Voir détails"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteRequest(request.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Requests Cards - Mobile */}
            <div className="lg:hidden space-y-4">
              {filteredRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status);
                const ServiceIcon = serviceIcons[request.service] || Code;
                return (
                  <div key={request.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-eduka-blue rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {(request.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{request.name || 'Nom non fourni'}</h4>
                        <p className="text-xs text-gray-500 truncate">{request.email || 'Email non fourni'}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(request.createdAt)}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <ServiceIcon className="w-4 h-4 text-eduka-blue flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">{request.service || 'Service non spécifié'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => setSelectedRequest(request)}
                        className="text-eduka-blue hover:text-blue-700 text-sm font-medium"
                      >
                        Voir détails
                      </button>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => deleteRequest(request.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
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

            {/* Empty State */}
            {filteredRequests.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucune demande trouvée</p>
                <p className="text-gray-400 text-sm">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Demandes par Service</h3>
                <div className="space-y-3 sm:space-y-4">
                  {data.analytics.requestsByService.length > 0 ? 
                    data.analytics.requestsByService.map((service, index) => {
                      const ServiceIcon = serviceIcons[service.service] || Code;
                      return (
                        <div key={index} className="flex items-center gap-3 sm:gap-4">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-eduka-blue to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ServiceIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs sm:text-sm font-medium text-gray-900 truncate pr-2">{service.service}</span>
                              <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{service.count} ({service.percentage}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                              <div 
                                className="bg-gradient-to-r from-eduka-blue to-blue-700 h-2 sm:h-3 rounded-full transition-all duration-1000"
                                style={{ width: `${service.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-center py-12">
                        <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">Aucune donnée disponible</p>
                        <p className="text-gray-400 text-sm">Les statistiques apparaîtront lorsque vous aurez des demandes de service</p>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Request Detail Modal */}
      <RequestDetailModal 
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
}