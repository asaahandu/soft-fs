'use client';
import { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '../../lib/auth';
import { serviceRequestsAPI } from '../../lib/firestore';

// Create context for admin data
const AdminContext = createContext();

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within AdminLayout');
  }
  return context;
};
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  Menu,
  X,
  Home,
  ChevronRight,
  LogOut,
  User,
  Shield,
  Wrench,
  PieChart,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  DollarSign,
  TrendingUp,
  Package
} from 'lucide-react';

const sidebarNavigation = [
  {
    name: 'Tableau de Bord',
    href: '/admin',
    icon: BarChart3,
    description: 'Vue d\'ensemble et statistiques'
  },
  {
    name: 'Demandes',
    href: '/admin/requests',
    icon: FileText,
    description: 'Gestion des demandes clients'
  },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pendingRequests: 0,
    totalRequests: 0,
    completedRequests: 0,
    loading: true,
    error: null,
    lastUpdated: null
  });
  const [notification, setNotification] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Load statistics when user is authenticated
        loadStatistics();
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // Remove router dependency to avoid re-renders

  // Load statistics from database
  const loadStatistics = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true, error: null }));
      
      // Fetch all service requests
      const allRequests = await serviceRequestsAPI.getAll();
      
      // Calculate statistics
      const pendingRequests = allRequests.filter(request => request.status === 'pending').length;
      const completedRequests = allRequests.filter(request => request.status === 'completed').length;
      const inProgressRequests = allRequests.filter(request => request.status === 'in-progress').length;
      const totalRequests = allRequests.length;
      
      setStats({
        pendingRequests,
        totalRequests,
        completedRequests,
        inProgressRequests,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });
      
      // Show success notification
      setNotification({
        type: 'success',
        message: 'Statistiques mises à jour'
      });
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error loading statistics:', error);
      setStats(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Erreur lors du chargement des statistiques' 
      }));
    }
  };

  // Close sidebar and search on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await authService.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const getPageTitle = () => {
    const currentNav = sidebarNavigation.find(item => isActive(item.href));
    return currentNav ? currentNav.name : 'Administration';
  };

  // Close sidebar when clicking outside (for mobile)
  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  // Close sidebar on route change (for mobile)
  const handleNavigation = () => {
    setSidebarOpen(false);
    setSearchOpen(false); // Also close search when navigating
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className={`
            px-4 py-3 rounded-lg shadow-lg border flex items-center gap-2 max-w-sm
            ${notification.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-red-200 text-red-700'
            }
          `}>
            {notification.type === 'success' ? (
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-sm font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 p-1 hover:bg-black/10 rounded transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto overflow-y-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-72 sm:w-80 lg:w-72 xl:w-80
      `}>
        {/* Sidebar Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Admin Panel</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">Soft-FS Solutions</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin User Info */}
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
              {authService.getDisplayName(user).charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{authService.getDisplayName(user)}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-4 overflow-y-auto" role="navigation" aria-label="Navigation principale">
          <div className="space-y-1 sm:space-y-2">
            {sidebarNavigation.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavigation}
                  className={`
                    flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-lg sm:rounded-xl text-sm font-medium transition-all duration-200 group touch-manipulation
                    ${active
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200'
                    }
                  `}
                  aria-current={active ? 'page' : undefined}
                >
                  <div className={`
                    w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-colors flex-shrink-0
                    ${active 
                      ? 'bg-white/20' 
                      : 'bg-gray-100 group-hover:bg-gray-200 group-active:bg-gray-300'
                    }
                  `}>
                    <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${active ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className={`text-xs sm:text-sm truncate ${active ? 'text-blue-100' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </div>
                  {active && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Quick Stats */}
        <div className="p-3 sm:p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900">Statistiques Rapides</h4>
              <div className="flex items-center gap-2">
                {stats.loading && (
                  <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                )}
                <button
                  onClick={loadStatistics}
                  disabled={stats.loading}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors disabled:opacity-50"
                  aria-label="Actualiser les statistiques"
                  title="Actualiser"
                >
                  <svg className={`w-3 h-3 ${stats.loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {stats.error ? (
                <div className="text-red-600 text-center py-2">
                  <p>{stats.error}</p>
                  <button
                    onClick={loadStatistics}
                    className="mt-1 text-blue-600 hover:text-blue-700 underline"
                  >
                    Réessayer
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 truncate">Demandes en attente</span>
                    <span className="font-semibold text-yellow-600 ml-2">
                      {stats.loading ? '...' : stats.pendingRequests}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 truncate">En cours</span>
                    <span className="font-semibold text-orange-600 ml-2">
                      {stats.loading ? '...' : (stats.inProgressRequests || 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 truncate">Demandes traitées</span>
                    <span className="font-semibold text-green-600 ml-2">
                      {stats.loading ? '...' : stats.completedRequests}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 truncate">Total demandes</span>
                    <span className="font-semibold text-blue-600 ml-2">
                      {stats.loading ? '...' : stats.totalRequests}
                    </span>
                  </div>
                </>
              )}
            </div>
            {!stats.loading && stats.lastUpdated && (
              <div className="mt-3 pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Mis à jour: {stats.lastUpdated.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="p-3 sm:p-4 border-t border-gray-100 space-y-1 sm:space-y-2">
          <Link
            href="/"
            onClick={handleNavigation}
            className="flex items-center gap-3 px-3 sm:px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg sm:rounded-xl transition-colors text-sm font-medium group touch-manipulation"
          >
            <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors flex-shrink-0">
              <Home className="w-4 h-4" />
            </div>
            <span className="truncate">Retour au site</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg sm:rounded-xl transition-colors text-sm font-medium group touch-manipulation"
            aria-label="Se déconnecter"
          >
            <div className="w-8 h-8 bg-gray-100 group-hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors flex-shrink-0">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="truncate">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation flex-shrink-0"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{getPageTitle()}</h1>
                <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                  <Home className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Admin</span>
                  <ChevronRight className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                  <span className="truncate">{getPageTitle()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
              {/* User Menu */}
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                  {authService.getDisplayName(user).charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">{authService.getDisplayName(user)}</p>
                  <p className="text-xs text-gray-500">En ligne</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  autoFocus
                />
              </div>
            </div>
          )}
        </header>

        {/* Page Content */}
        <section className="flex-1 overflow-auto bg-gray-50">
          <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
            <div className="w-full">
              <AdminContext.Provider value={{ 
                stats, 
                loadStatistics,
                user,
                isLoading: loading,
                showNotification: (type, message) => {
                  setNotification({ type, message });
                  setTimeout(() => setNotification(null), 3000);
                }
              }}>
                {children}
              </AdminContext.Provider>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}