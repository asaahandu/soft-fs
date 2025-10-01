'use client';
import { useState, useEffect } from 'react';
import { Search, Phone, Mail, MapPin, X, Menu } from "lucide-react"
import ServiceForm from './ServiceForm';
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
      {/* Top Bar - Now visible on mobile with location and phone only */}
      <div className="bg-eduka-orange text-white py-2 px-4 animate-fadeInDown">
        {/* Mobile Layout - Only location and phone */}
        <div className="container mx-auto sm:hidden">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <MapPin className="w-3 h-3 flex-shrink-0 animate-bounce" />
              <span className="animate-fadeInLeft">Douala</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Phone className="w-3 h-3 flex-shrink-0 hover:rotate-12 transition-transform duration-300" />
              <span className="whitespace-nowrap animate-fadeInRight">+237 671178892</span>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout - All info */}
        <div className="container mx-auto hidden sm:flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 mb-2 sm:mb-0">
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 animate-bounce" />
              <span className="animate-fadeInLeft">Douala</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 hover:rotate-12 transition-transform duration-300" />
              <span className="truncate animate-fadeInLeft animation-delay-200">contact@softfs.com</span>
            </div>
          </div>
          <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 hover:rotate-12 transition-transform duration-300" />
            <span className="whitespace-nowrap animate-fadeInRight">+237 671178892</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`bg-white shadow-sm sticky top-0 z-40 transition-all duration-500 ${
        isScrolled ? 'shadow-lg bg-white/95 backdrop-blur-md' : ''
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/images/background.png" 
                alt="Soft FS Logo" 
                className={`h-8 w-auto sm:h-10 md:h-22 transition-all duration-500 transform group-hover:scale-110 ${
                  isScrolled ? 'h-6 sm:h-8 md:h-10' : ''
                }`}
                width={300}
                height={100}
                quality={100}

              />
              <div>
                <span className="text-black-700 font-black italic text-2xl pl-1 sm:text-3xl md:text-4xl">SOFT FS</span>
                </div>
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-eduka-orange rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a 
                href="/" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-all duration-300 relative group animate-fadeInUp animation-delay-100 hover:scale-105 hover:-translate-y-1"
              >
                Accueil
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-eduka-orange transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="/Services" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-all duration-300 relative group animate-fadeInUp animation-delay-200 hover:scale-105 hover:-translate-y-1"
              >
                Nos Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-eduka-orange transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="/About" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-all duration-300 relative group animate-fadeInUp animation-delay-300 hover:scale-105 hover:-translate-y-1"
              >
                A Propos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-eduka-orange transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="/Contact" 
                className="text-gray-700 hover:text-eduka-orange font-medium transition-all duration-300 relative group animate-fadeInUp animation-delay-400 hover:scale-105 hover:-translate-y-1"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-eduka-orange transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            {/* Right Side - Desktop */}
            <div className="hidden md:flex items-center gap-4 animate-fadeInRight">
              <button
                className="bg-gradient-to-r from-eduka-orange to-orange-500 hover:from-orange-500 hover:to-eduka-orange text-white px-4 lg:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm lg:text-base whitespace-nowrap transform hover:scale-105 hover:shadow-lg hover:shadow-orange-200 active:scale-95 group relative overflow-hidden"
                onClick={openServiceForm}
              >
                <span className="relative z-10 group-hover:animate-pulse">
                  <span className="hidden lg:inline">Postuler pour un Service</span>
                  <span className="lg:hidden">Postuler</span>
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden animate-fadeInRight">
              <button
                className="bg-gradient-to-r from-eduka-orange to-orange-500 hover:from-orange-500 hover:to-eduka-orange text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 transform hover:scale-110 active:scale-95 hover:shadow-md"
                onClick={openServiceForm}
              >
                Service
              </button>
              <button
                onClick={toggleMobileMenu}
                className={`p-2 text-gray-700 hover:text-eduka-orange hover:bg-gray-100 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                  isMobileMenuOpen ? 'rotate-180 bg-gray-100 text-eduka-orange' : ''
                }`}
                aria-label="Toggle mobile menu"
              >
                <Menu className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
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
                  Home
                </a>
                <a 
                  href="/Services" 
                  className="text-gray-700 hover:text-eduka-orange font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 animate-slideInLeft animation-delay-200"
                  onClick={closeMobileMenu}
                >
                  Services
                </a>
                <a 
                  href="/About" 
                  className="text-gray-700 hover:text-eduka-orange font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 animate-slideInLeft animation-delay-300"
                  onClick={closeMobileMenu}
                >
                  A Propos
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
