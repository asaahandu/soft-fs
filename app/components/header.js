'use client';
import { useState } from 'react';
import { Search, Phone, Mail, MapPin, X, Menu } from "lucide-react"
import ServiceForm from './ServiceForm';

export default function Header() {
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openServiceForm = () => {
    setIsServiceFormOpen(true);
  };

  const closeServiceForm = () => {
    setIsServiceFormOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      {/* Top Bar - Hidden on mobile, visible on tablet and up */}
      <div className="bg-eduka-orange text-white py-2 px-4 hidden sm:block">
        <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 mb-2 sm:mb-0">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Douala</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">contact@softfs.com</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">+237 671178892</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/images/soft-fs.png" 
                alt="Soft FS Logo" 
                className="h-8 w-auto sm:h-10 md:h-12"
                quality={100}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a 
                href="/" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-colors duration-200"
              >
                Home
              </a>
              <a 
                href="/Services" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-colors duration-200"
              >
                Services
              </a>
              <a 
                href="/About" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-colors duration-200"
              >
                A Propos
              </a>
              <a 
                href="/Contact" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-colors duration-200"
              >
                Contact
              </a>
            </nav>

            {/* Right Side - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <button
                className="bg-eduka-orange hover:bg-orange-600 text-white px-4 lg:px-6 py-2 rounded-full font-medium transition-colors duration-200 text-sm lg:text-base whitespace-nowrap"
                onClick={openServiceForm}
              >
                <span className="hidden lg:inline">Postuler pour un Service</span>
                <span className="lg:hidden">Postuler</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                className="bg-eduka-orange hover:bg-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200"
                onClick={openServiceForm}
              >
                Service
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-700 hover:text-eduka-orange hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3 pt-4">
                <a 
                  href="/" 
                  className="text-gray-700 hover:text-eduka-orange font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Home
                </a>
                <a 
                  href="/Services" 
                  className="text-gray-700 hover:text-eduka-orange font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Services
                </a>
                <a 
                  href="/About" 
                  className="text-gray-700 hover:text-eduka-orange font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  A Propos
                </a>
                <a 
                  href="/Contact" 
                  className="text-gray-700 hover:text-eduka-orange font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Contact
                </a>
                {/* Mobile Service Button - Full Width */}
                <button
                  className="bg-eduka-orange hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 w-full mt-4"
                  onClick={() => {
                    openServiceForm();
                    closeMobileMenu();
                  }}
                >
                  Postuler pour un Service
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Service Form Modal */}
      {isServiceFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeServiceForm}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <div className="p-4 sm:p-6">
              <ServiceForm onClose={closeServiceForm} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden" 
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}
