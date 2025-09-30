'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

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

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
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
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Administrateur</p>
              <p className="text-xs text-gray-500 truncate">admin@soft-fs.com</p>
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
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Statistiques Rapides</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 truncate">Demandes en attente</span>
                <span className="font-semibold text-yellow-600 ml-2">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 truncate">Projets actifs</span>
                <span className="font-semibold text-blue-600 ml-2">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-3 sm:p-4 border-t border-gray-100 space-y-1 sm:space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 sm:px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg sm:rounded-xl transition-colors text-sm font-medium group touch-manipulation"
          >
            <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors flex-shrink-0">
              <Home className="w-4 h-4" />
            </div>
            <button
              onClick={() => { window.location.href = '/'; }}
            className="truncate">Retour au site
            </button>
          </Link>
          <button 
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
                  A
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
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
              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}