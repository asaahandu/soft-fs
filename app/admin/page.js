'use client';
import { useState, useEffect } from 'react';
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
  Shield
} from 'lucide-react';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

// Mock data for demonstration
const mockData = {
  stats: {
    totalRequests: 145,
    pendingRequests: 23,
    completedProjects: 89,
    activeClients: 67,
    responseRate: 98.5,
    monthlyRevenue: 2450000
  },
  recentRequests: [
    {
      id: 1,
      name: "Marie Dubois",
      email: "marie.dubois@gmail.com",
      phone: "+237 671 234 567",
      service: "Développement Web",
      message: "Je souhaite créer un site e-commerce pour ma boutique de vêtements...",
      date: "2024-09-29T10:30:00Z",
      status: "pending",
      priority: "high",
      budget: "50000 FCFA"
    },
    {
      id: 2,
      name: "Jean Kamga",
      email: "j.kamga@entreprise.cm",
      phone: "+237 695 876 543",
      service: "Design Graphique",
      message: "Besoin d'une nouvelle identité visuelle pour notre startup...",
      date: "2024-09-29T09:15:00Z",
      status: "in_progress",
      priority: "medium",
      budget: "25000 FCFA"
    },
    {
      id: 3,
      name: "Sarah Tiogouo",
      email: "sarah.t@yahoo.com",
      phone: "+237 677 345 678",
      service: "Développement d'Applications Mobiles",
      message: "Application mobile pour la livraison de repas à Douala...",
      date: "2024-09-28T16:45:00Z",
      status: "completed",
      priority: "high",
      budget: "100000 FCFA"
    },
    {
      id: 4,
      name: "Paul Mvondo",
      email: "paul.mvondo@hotmail.com",
      phone: "+237 682 912 345",
      service: "Photographie & Vidéographie",
      message: "Reportage photo pour événement d'entreprise le mois prochain...",
      date: "2024-09-28T14:20:00Z",
      status: "pending",
      priority: "low",
      budget: "30000 FCFA"
    },
    {
      id: 5,
      name: "Fatima Ndjodo",
      email: "f.ndjodo@gmail.com",
      phone: "+237 673 456 789",
      service: "Réseau informatique & Support utilisateur",
      message: "Configuration réseau pour nouvel bureau, 15 postes de travail...",
      date: "2024-09-28T11:00:00Z",
      status: "in_progress",
      priority: "high",
      budget: "75000 FCFA"
    }
  ],
  projects: [
    {
      id: 1,
      title: "Site E-commerce Boutique Mode",
      client: "Marie Dubois",
      service: "Développement Web",
      status: "in_progress",
      progress: 65,
      startDate: "2024-09-15",
      deadline: "2024-10-15",
      budget: "50000 FCFA"
    },
    {
      id: 2,
      title: "Application Livraison Repas",
      client: "Sarah Tiogouo",
      service: "Développement Mobile",
      status: "completed",
      progress: 100,
      startDate: "2024-08-01",
      deadline: "2024-09-15",
      budget: "100000 FCFA"
    },
    {
      id: 3,
      title: "Identité Visuelle Startup",
      client: "Jean Kamga",
      service: "Design Graphique",
      status: "in_progress",
      progress: 40,
      startDate: "2024-09-20",
      deadline: "2024-10-10",
      budget: "25000 FCFA"
    }
  ],
  analytics: {
    requestsByService: [
      { service: "Développement Web", count: 45, percentage: 31 },
      { service: "Design Graphique", count: 35, percentage: 24 },
      { service: "Développement Mobile", count: 28, percentage: 19 },
      { service: "Photographie", count: 20, percentage: 14 },
      { service: "Support IT", count: 17, percentage: 12 }
    ],
    monthlyTrends: [
      { month: "Jan", requests: 12, completed: 10 },
      { month: "Fév", requests: 15, completed: 12 },
      { month: "Mar", requests: 18, completed: 16 },
      { month: "Avr", requests: 22, completed: 20 },
      { month: "Mai", requests: 25, completed: 22 },
      { month: "Juin", requests: 30, completed: 28 },
      { month: "Juil", requests: 28, completed: 25 },
      { month: "Août", requests: 32, completed: 30 },
      { month: "Sep", requests: 29, completed: 26 }
    ]
  }
};

// Service icons mapping
const serviceIcons = {
  "Développement Web": Code,
  "Design Graphique": Palette,
  "Développement d'Applications Mobiles": Smartphone,
  "Développement Mobile": Smartphone,
  "Photographie & Vidéographie": Camera,
  "Photographie": Camera,
  "Réseau informatique & Support utilisateur": Network,
  "Support IT": Network,
  "Audit des Systèmes d'Information & Fourniture informatiques": Shield
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter requests based on search and status
  const filteredRequests = mockData.recentRequests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase());
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-eduka-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
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
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {mockData.stats.pendingRequests}
                </span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Demandes</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{mockData.stats.totalRequests}</p>
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
                    <p className="text-xl sm:text-2xl font-bold text-yellow-600">{mockData.stats.pendingRequests}</p>
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
                    <p className="text-xl sm:text-2xl font-bold text-purple-600">{mockData.stats.activeClients}</p>
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

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Revenus Mensuels</p>
                    <p className="text-lg sm:text-2xl font-bold text-indigo-600">{mockData.stats.monthlyRevenue.toLocaleString()} FCFA</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 mr-1 flex-shrink-0" />
                  <span className="text-indigo-600 font-medium">+23%</span>
                  <span className="text-gray-500 ml-1 truncate">vs mois dernier</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Taux de Réponse</p>
                    <p className="text-xl sm:text-2xl font-bold text-emerald-600">{mockData.stats.responseRate}%</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 mr-1 flex-shrink-0" />
                  <span className="text-emerald-600 font-medium">+0.5%</span>
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
                  {mockData.recentRequests.slice(0, 5).map((request) => {
                    const StatusIcon = getStatusIcon(request.status);
                    return (
                      <div key={request.id} className="flex items-center gap-3 sm:gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-eduka-blue rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {request.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{request.name}</p>
                          <p className="text-xs text-gray-500 truncate">{request.service}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 flex-shrink-0">
                          <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs text-gray-500 hidden sm:inline">{formatDate(request.date)}</span>
                        </div>
                      </div>
                    );
                  })}
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
                  {mockData.analytics.requestsByService.map((service, index) => {
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
                  })}
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
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Statut</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Priorité</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Budget</th>
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
                                {request.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{request.name}</p>
                                <p className="text-xs text-gray-500">{request.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <ServiceIcon className="w-4 h-4 text-eduka-blue" />
                              <span className="text-sm text-gray-900">{request.service}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-gray-900">{formatDate(request.date)}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                              <StatusIcon className="w-3 h-3" />
                              {request.status === 'pending' ? 'En attente' :
                               request.status === 'in_progress' ? 'En cours' :
                               request.status === 'completed' ? 'Terminé' :
                               request.status === 'cancelled' ? 'Annulé' : request.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                              {request.priority === 'high' ? 'Haute' :
                               request.priority === 'medium' ? 'Moyenne' :
                               request.priority === 'low' ? 'Basse' : request.priority}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm font-medium text-gray-900">{request.budget}</span>
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
                              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Modifier">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
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
                        {request.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{request.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{request.email}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(request.date)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          {request.status === 'pending' ? 'En attente' :
                           request.status === 'in_progress' ? 'En cours' :
                           request.status === 'completed' ? 'Terminé' :
                           request.status === 'cancelled' ? 'Annulé' : request.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <ServiceIcon className="w-4 h-4 text-eduka-blue flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">{request.service}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Priorité:</span>
                          <span className={`font-medium ${getPriorityColor(request.priority)}`}>
                            {request.priority === 'high' ? 'Haute' :
                             request.priority === 'medium' ? 'Moyenne' :
                             request.priority === 'low' ? 'Basse' : request.priority}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{request.budget}</span>
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
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Modifier">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
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
                  {mockData.analytics.requestsByService.map((service, index) => {
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
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}