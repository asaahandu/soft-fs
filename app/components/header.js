'use client';
import { useState, useEffect } from 'react';
import { Search, Phone, Mail, MapPin, X, Menu } from "lucide-react"
import Image from 'next/image';

export default function Header() {
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Scroll effect for header animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-eduka-orange text-white py-3 px-4 animate-fadeInDown">
        <div className="container mx-auto">
          {/* Mobile Layout - Compact contact info */}
          <div className="flex justify-between items-center text-xs sm:hidden">
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span>Douala</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span>+237 657765185</span>
            </div>
          </div>
          
          {/* Desktop Layout - Full contact info */}
          <div className="hidden sm:flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Douala</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@softfsgroup.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+237 657765185</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`bg-white shadow-sm sticky top-0 z-40 transition-all duration-500 ${
        isScrolled ? 'shadow-lg bg-white/95 backdrop-blur-md' : ''
      }`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'py-2' : 'py-4'
          }`}>
            {/* Logo Section */}
            <div className="flex items-center">
              <img 
                src="/images/logo1.png" 
                alt="Soft FS Logo" 
                className={`w-auto transition-all duration-500 transform hover:scale-105 ${
                  isScrolled 
                    ? 'h-10 sm:h-12' 
                    : 'h-12 sm:h-16 md:h-20'
                }`}
                width={300}
                height={100}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center mr-20 gap-8">
              <a 
                href="/" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-all duration-300 py-2 px-3 rounded-lg hover:bg-orange-50"
              >
                Accueil
              </a>
              <a 
                href="/Services" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-all duration-300 py-2 px-3 rounded-lg hover:bg-orange-50"
              >
                Nos Services
              </a>
              <a 
                href="/About" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-all duration-300 py-2 px-3 rounded-lg hover:bg-orange-50"
              >
                A Propos
              </a>
              <a 
                href="/Contact" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-all duration-300 py-2 px-3 rounded-lg hover:bg-orange-50"
              >
                Contact
              </a>
            </nav>

            {/* Right Section - Auth & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Auth Status - Hidden on mobile, shown on larger screens */}
              <div className="hidden md:block">
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className={`lg:hidden p-2 text-gray-700 hover:text-eduka-orange hover:bg-gray-100 rounded-lg transition-all duration-300 ${
                  isMobileMenuOpen ? 'bg-gray-100 text-eduka-orange' : ''
                }`}
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3 pt-4">
                <a 
                  href="/" 
                  className="text-gray-700 hover:text-eduka-orange font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 animate-slideInLeft animation-delay-100"
                  onClick={closeMobileMenu}
                >
                  Accueil
                </a>
                <a 
                  href="/Services" 
                  className="text-gray-700 hover:text-eduka-orange font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 animate-slideInLeft animation-delay-200"
                  onClick={closeMobileMenu}
                >
                  Nos services
                </a>
                <a 
                  href="/About" 
                  className="text-gray-700 hover:text-eduka-orange font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 animate-slideInLeft animation-delay-300"
                  onClick={closeMobileMenu}
                >
                  À Propos
                </a>
                <a 
                  href="/Contact" 
                  className="text-gray-700 hover:text-eduka-orange font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 animate-slideInLeft animation-delay-400"
                  onClick={closeMobileMenu}
                >
                  Contact
                </a>
                {/* Mobile Service Button - Full Width */}
                <button
                  className="bg-blue-700 hover:from-blue-700 hover:to-blue-500 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 w-full mt-4 transform hover:scale-105 active:scale-95 hover:shadow-lg animate-slideInUp animation-delay-500"
                  onClick={() => {
                    openServiceForm();
                    closeMobileMenu();
                  }}
                >
                  Postuler pour un Service
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Service Form Modal */}
      {isServiceFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative animate-modalSlideIn transform">
            <button
              onClick={closeServiceForm}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:rotate-90 active:scale-95"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <div className="p-4 sm:p-6 animate-fadeInUp animation-delay-200">
              <ServiceForm onClose={closeServiceForm} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden animate-fadeIn" 
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}
